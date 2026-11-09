const express = require('express');
const { getDatabase } = require('../db');

const router = express.Router();
const ALLOWED_SECTIONS = new Set([
  'home', 'decouvrir', 'circulation', 'binaire', 'images', 'video', 'synthese'
]);
const ALLOWED_EVENTS = new Set([
  'section_view', 'quiz_completed', 'activity_completed'
]);

function validSessionId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(value);
}

router.post('/events', async (req, res, next) => {
  try {
    const { sessionId, eventType, section, metadata = {} } = req.body || {};

    if (!validSessionId(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId.' });
    }
    if (!ALLOWED_EVENTS.has(eventType)) {
      return res.status(400).json({ error: 'Unsupported eventType.' });
    }
    if (section && !ALLOWED_SECTIONS.has(section)) {
      return res.status(400).json({ error: 'Unsupported section.' });
    }

    // Store only a small allowlist of non-identifying learning metrics.
    const safeMetadata = {};
    if (Number.isFinite(metadata.durationSeconds)) {
      safeMetadata.durationSeconds = Math.max(0, Math.min(86400, Math.round(metadata.durationSeconds)));
    }
    if (typeof metadata.activity === 'string') {
      safeMetadata.activity = metadata.activity.slice(0, 60);
    }

    const result = await getDatabase().collection('learning_events').insertOne({
      sessionId,
      eventType,
      section: section || null,
      metadata: safeMetadata,
      createdAt: new Date()
    });

    res.status(201).json({ ok: true, id: result.insertedId });
  } catch (error) {
    next(error);
  }
});

router.post('/quiz-results', async (req, res, next) => {
  try {
    const { sessionId, score, total, percentage } = req.body || {};

    if (!validSessionId(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId.' });
    }
    if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || score < 0 || score > total) {
      return res.status(400).json({ error: 'Invalid quiz score.' });
    }

    const calculatedPercentage = Math.round((score / total) * 100);
    const result = await getDatabase().collection('quiz_results').insertOne({
      sessionId,
      quizId: 'general-knowledge',
      score,
      total,
      percentage: calculatedPercentage,
      createdAt: new Date()
    });

    res.status(201).json({
      ok: true,
      id: result.insertedId,
      percentage: calculatedPercentage
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
