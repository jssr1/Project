/**
 * Fournisseur d'IA : OpenAI ou Gemini.
 *
 * Gemini est utilisé via son endpoint compatible OpenAI, ce qui permet de
 * garder le même SDK et le même code d'appel. La clé reste côté serveur.
 */

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/';
const GEMINI_DEFAULT_MODEL = 'gemini-2.5-flash';
const OPENAI_DEFAULT_MODEL = 'gpt-4o-mini';

function readProvider() {
  const explicit = (process.env.AI_PROVIDER || '').trim().toLowerCase();
  if (explicit === 'gemini' || explicit === 'openai') return explicit;

  if ((process.env.AI_BASE_URL || '').includes('generativelanguage')) return 'gemini';

  const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
  const genericKey = (process.env.AI_API_KEY || '').trim();
  if (geminiKey && !genericKey) return 'gemini';
  if (genericKey.startsWith('AIza')) return 'gemini';

  return 'openai';
}

function getApiKey() {
  const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
  const genericKey = (process.env.AI_API_KEY || '').trim();
  return readProvider() === 'gemini' ? (geminiKey || genericKey) : (genericKey || geminiKey);
}

function getModel() {
  const configured = (process.env.AI_MODEL || '').trim();
  if (configured) return configured;
  return readProvider() === 'gemini' ? GEMINI_DEFAULT_MODEL : OPENAI_DEFAULT_MODEL;
}

function getBaseURL() {
  const configured = (process.env.AI_BASE_URL || '').trim();
  if (configured) return configured;
  return readProvider() === 'gemini' ? GEMINI_BASE_URL : '';
}

function isAiConfigured() {
  return Boolean(getApiKey());
}

module.exports = {
  GEMINI_BASE_URL,
  GEMINI_DEFAULT_MODEL,
  OPENAI_DEFAULT_MODEL,
  readProvider,
  getApiKey,
  getModel,
  getBaseURL,
  isAiConfigured
};
