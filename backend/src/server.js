const path = require('path');

// Always load backend/.env, even when the server is started from another folder.
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDatabase, ensureDatabase, isDatabaseConnected, closeDatabase } = require('./db');
const { isAiConfigured, readProvider } = require('./ai/config');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Required for correct client IP detection (rate limiting) behind a reverse proxy.
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);

const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5501')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isProduction = process.env.NODE_ENV === 'production';
const LOCAL_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    // Requests without Origin are allowed for health checks and local tools.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);

    // In development, accept Live Server / local static servers on any port.
    // In production, only the explicit FRONTEND_ORIGIN list is allowed.
    if (!isProduction && LOCAL_ORIGIN.test(origin)) return callback(null, true);

    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  }
}));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'inside-the-computer-api',
    database: isDatabaseConnected() ? 'connected' : 'unavailable',
    ai: isAiConfigured() ? 'configured' : 'not_configured',
    aiProvider: readProvider()
  });
});

app.use('/api', analyticsRoutes);
app.use('/api/ai', aiRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, code: 'NOT_FOUND', error: 'Route API inconnue.' });
});

app.use((error, _req, res, _next) => {
  console.error(error.message);

  if (/Database is not connected/i.test(error.message)) {
    return res.status(503).json({
      ok: false,
      code: 'DB_UNAVAILABLE',
      error: 'La base MongoDB est momentanément indisponible. Réessayez dans quelques instants.'
    });
  }

  const status = error.message.includes('CORS') ? 403 : 500;
  res.status(status).json({
    error: status === 403 ? 'Origin not allowed.' : 'Internal server error.'
  });
});

let server;
let dbRetryTimer = null;
const dbRetryMs = Number(process.env.DB_RETRY_MS) > 0 ? Number(process.env.DB_RETRY_MS) : 30000;

function scheduleDatabaseRetry() {
  if (dbRetryTimer) return;
  dbRetryTimer = setInterval(async () => {
    try {
      await ensureDatabase();
      console.log('MongoDB connected (background retry).');
      clearInterval(dbRetryTimer);
      dbRetryTimer = null;
    } catch (_) {
      // Keep the API available and retry silently.
    }
  }, dbRetryMs);
  dbRetryTimer.unref?.();
}

function listen() {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      server.removeListener('error', reject);
      resolve();
    });
    server.once('error', reject);
  });
}

function portInUseHelp(error) {
  if (error && error.code === 'EADDRINUSE') {
    return [
      `Port ${port} is already in use.`,
      'Another copy of this API (or another app) is still running.',
      'Stop it with:  powershell -Command "Get-NetTCPConnection -LocalPort ' + port + ' -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }"',
      'Or run this API on another port:  set PORT=3001 && npm run dev'
    ].join('\n');
  }
  return null;
}

async function start() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('\nMongoDB unavailable — the API starts in degraded mode.');
    console.error(error.message);
    console.error('Analytics routes will answer 503 until MongoDB reconnects.\n');
    scheduleDatabaseRetry();
  }

  try {
    await listen();
  } catch (error) {
    const help = portInUseHelp(error);
    if (help) throw new Error(help);
    throw error;
  }

  console.log(`Inside the Computer API listening on http://localhost:${port}`);
}

let shuttingDown = false;

async function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (dbRetryTimer) clearInterval(dbRetryTimer);

  // Do not let a stuck socket block Ctrl+C forever.
  const forceExit = setTimeout(() => process.exit(code), 3000);
  forceExit.unref();

  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await closeDatabase();
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start().catch((error) => {
  console.error('\nStartup failed:\n' + error.message + '\n');
  closeDatabase().finally(() => process.exit(1));
});
