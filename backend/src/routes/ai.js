const express = require('express');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const { buildSystemPrompt, detectLanguage } = require('../ai/knowledge');
const {
  readProvider,
  getApiKey,
  getModel,
  getBaseURL,
  isAiConfigured
} = require('../ai/config');

const router = express.Router();

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1500;
const MAX_TOTAL_CHARS = 8000;
const ALLOWED_ROLES = new Set(['user', 'assistant']);

const DEFAULT_MAX_REQUESTS = 10;

function errorJson(res, status, code, message) {
  return res.status(status).json({ ok: false, code, error: message });
}

function readPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/* ------------------------------------------------------------------ */
/* Rate limiting (per IP)                                              */
/* ------------------------------------------------------------------ */

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: readPositiveInt(process.env.AI_MAX_REQUESTS_PER_MINUTE, DEFAULT_MAX_REQUESTS),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => errorJson(
    res,
    429,
    'AI_RATE_LIMITED',
    'Trop de questions envoyées. Patientez une minute avant de réessayer. / طلبات كثيرة جدًا. انتظر دقيقة ثم أعد المحاولة.'
  )
});

/* ------------------------------------------------------------------ */
/* Client IA (chargé à la demande, une clé absente ne plante pas)       */
/* ------------------------------------------------------------------ */

let client;
let clientSignature = '';

function getClient() {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const baseURL = getBaseURL();
  const provider = readProvider();
  const timeout = readPositiveInt(process.env.AI_TIMEOUT_MS, 30000);
  const signature = `${provider}|${apiKey.slice(-6)}|${baseURL}|${timeout}`;

  if (!client || clientSignature !== signature) {
    client = new OpenAI({
      apiKey,
      ...(baseURL ? { baseURL } : {}),
      timeout,
      maxRetries: 1
    });
    clientSignature = signature;
  }

  return client;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

function normalizeMessages(input) {
  if (!Array.isArray(input) || input.length === 0) {
    return { error: 'Le champ « messages » doit être un tableau non vide.' };
  }
  if (input.length > MAX_MESSAGES) {
    return { error: `Trop de messages dans l'historique (maximum ${MAX_MESSAGES}).` };
  }

  const messages = [];
  let totalChars = 0;

  for (const raw of input) {
    if (!raw || typeof raw !== 'object') {
      return { error: 'Chaque message doit être un objet { role, content }.' };
    }
    const role = String(raw.role || '').trim();
    if (!ALLOWED_ROLES.has(role)) {
      return { error: 'Le rôle d\'un message doit être « user » ou « assistant ».' };
    }
    if (typeof raw.content !== 'string') {
      return { error: 'Le contenu d\'un message doit être du texte.' };
    }
    const content = raw.content.trim();
    if (!content) {
      return { error: 'Un message ne peut pas être vide.' };
    }
    if (content.length > MAX_MESSAGE_CHARS) {
      return { error: `Chaque message est limité à ${MAX_MESSAGE_CHARS} caractères.` };
    }
    totalChars += content.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      return { error: `La conversation est trop longue (maximum ${MAX_TOTAL_CHARS} caractères).` };
    }
    messages.push({ role, content });
  }

  if (messages[messages.length - 1].role !== 'user') {
    return { error: 'Le dernier message doit venir de l\'étudiant.' };
  }

  return { messages };
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

router.get('/status', (_req, res) => {
  res.json({
    ok: true,
    configured: isAiConfigured(),
    provider: readProvider(),
    model: getModel()
  });
});

router.post('/chat', aiLimiter, async (req, res) => {
  const body = req.body || {};

  const validation = normalizeMessages(body.messages);
  if (validation.error) {
    return errorJson(res, 400, 'AI_INVALID_REQUEST', validation.error);
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return errorJson(
      res,
      503,
      'AI_NOT_CONFIGURED',
      'L\'assistant IA n\'est pas encore configuré : ajoutez AI_API_KEY (OpenAI) ou GEMINI_API_KEY (Gemini) dans backend/.env puis redémarrez le serveur. / المساعد غير مُهيَّأ بعد.'
    );
  }

  const messages = validation.messages;
  const language = body.language === 'ar' || body.language === 'fr'
    ? body.language
    : detectLanguage(messages);
  const model = getModel();

  try {
    const openai = getClient();
    const completion = await openai.chat.completions.create({
      model,
      temperature: 0.4,
      max_tokens: 900,
      messages: [
        { role: 'system', content: buildSystemPrompt(language) },
        ...messages
      ]
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return errorJson(res, 502, 'AI_EMPTY_RESPONSE', 'L\'assistant n\'a renvoyé aucune réponse. Réessayez.');
    }

    return res.json({
      ok: true,
      reply,
      language,
      model: completion.model || model
    });
  } catch (error) {
    console.error('[AI] erreur:', error && error.name, '-', error && error.message);

    const errorName = error && error.name;
    const errorMessage = String(error && error.message ? error.message : '');

    // Connection-level failures are subclasses of APIError: check them first.
    if (errorName === 'APIConnectionTimeoutError' || errorName === 'AbortError' || /timed out/i.test(errorMessage)) {
      return errorJson(res, 504, 'AI_TIMEOUT', 'L\'assistant met trop de temps à répondre. Réessayez.');
    }

    if (errorName === 'APIConnectionError') {
      return errorJson(res, 502, 'AI_UNREACHABLE', 'Impossible de joindre le service IA. Vérifiez la connexion Internet du serveur.');
    }

    // Gemini renvoie parfois un 400 sans corps JSON exploitable par le SDK.
    // Comme la requête est déjà validée, la cause la plus probable est la clé.
    if (error && error.status === 400 && readProvider() === 'gemini') {
      return errorJson(res, 502, 'AI_AUTH_ERROR', 'Gemini a refusé la requête (clé API invalide ou requête non prise en charge). Vérifiez GEMINI_API_KEY dans backend/.env.');
    }

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401 || error.status === 403) {
        return errorJson(res, 502, 'AI_AUTH_ERROR', 'La clé API de l\'assistant est invalide ou expirée. Vérifiez AI_API_KEY ou GEMINI_API_KEY dans backend/.env.');
      }
      if (error.status === 429) {
        return errorJson(res, 429, 'AI_UPSTREAM_RATE_LIMIT', 'Le service IA est momentanément surchargé. Réessayez dans quelques instants.');
      }
      if (error.status === 404) {
        return errorJson(res, 502, 'AI_MODEL_ERROR', `Le modèle « ${model} » est introuvable. Vérifiez AI_MODEL dans backend/.env.`);
      }
      return errorJson(res, 502, 'AI_UPSTREAM_ERROR', 'Le service IA a renvoyé une erreur. Réessayez dans un instant.');
    }

    return errorJson(res, 500, 'AI_ERROR', 'Erreur inattendue de l\'assistant. Réessayez.');
  }
});

module.exports = router;
