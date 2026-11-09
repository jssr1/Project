const { MongoClient } = require('mongodb');

let client;
let database;
let connecting = null;

// Keep the connection attempt short so a bad URI or a blocked IP fails fast
// instead of leaving `npm run dev` hanging for 30 seconds.
const CLIENT_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
};

const TRANSIENT_ERROR = /querySrv|ESERVFAIL|EREFUSED|ENOTFOUND|ETIMEDOUT|ECONNRESET|ECONNREFUSED|ENETUNREACH|SSL|TLS|Server selection timed out|connection (?:closed|reset)/i;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isDatabaseConnected() {
  return Boolean(database);
}

function describeConnectionError(error, uri) {
  const message = String(error && error.message ? error.message : error);
  const host = (() => {
    try {
      return new URL(uri.replace('mongodb+srv://', 'https://').replace('mongodb://', 'http://')).hostname;
    } catch (_) {
      return 'the configured host';
    }
  })();

  if (/querySrv|ESERVFAIL|EREFUSED|ENOTFOUND/i.test(message)) {
    return [
      `Cannot resolve the MongoDB host (${host}).`,
      'Your network/DNS is blocking SRV lookups used by mongodb+srv:// URIs.',
      'Fixes: switch network or DNS (8.8.8.8), or replace MONGODB_URI with the',
      'standard "mongodb://" connection string from Atlas (Connect > Drivers > Node.js,',
      'the non-SRV option).'
    ].join('\n');
  }

  if (/Authentication failed|bad auth|SCRAM/i.test(message)) {
    return [
      `MongoDB authentication failed for ${host}.`,
      'Check MONGODB_USERNAME / MONGODB_PASSWORD in backend/.env.',
      'Special characters in the password must be percent-encoded in MONGODB_URI.'
    ].join('\n');
  }

  if (/SSL|TLS/i.test(message)) {
    return [
      `The TLS connection to MongoDB (${host}) was interrupted.`,
      'This is usually temporary: a firewall, VPN or proxy can break the Atlas TLS handshake.',
      'Retry in a few seconds. If it keeps failing: disable the VPN, try another network,',
      'or use a standard "mongodb://" connection string from Atlas.'
    ].join('\n');
  }

  if (/Server selection timed out|ETIMEDOUT|ECONNREFUSED|ENETUNREACH/i.test(message)) {
    return [
      `Could not reach MongoDB at ${host}.`,
      'Most common cause: your public IP is not allowed in Atlas.',
      'Atlas > Network Access > Add IP Address > Add Current IP Address (or 0.0.0.0/0 for local testing).'
    ].join('\n');
  }

  return `MongoDB connection failed: ${message}`;
}

async function openConnection(uri) {
  client = new MongoClient(uri, CLIENT_OPTIONS);
  await client.connect();

  database = client.db(process.env.MONGODB_DB_NAME || 'inside_the_computer');

  // Verify the credentials actually work, not just that a socket opened.
  await database.command({ ping: 1 });

  // Indexes keep event and quiz-result lookups efficient.
  await Promise.all([
    database.collection('learning_events').createIndex({ sessionId: 1, createdAt: -1 }),
    database.collection('quiz_results').createIndex({ sessionId: 1, createdAt: -1 }),
    database.collection('learning_events').createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 })
  ]);
}

async function connectDatabase({ attempts = 3, delayMs = 800 } = {}) {
  if (database) return database;
  if (connecting) return connecting;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Copy backend/.env.example to backend/.env and configure it.');
  }

  connecting = (async () => {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        await openConnection(uri);
        console.log(`MongoDB connected: ${database.databaseName}`);
        return database;
      } catch (error) {
        lastError = error;

        // Do not keep a half-open client around: it blocks a clean restart.
        const failedClient = client;
        client = undefined;
        database = undefined;
        if (failedClient) await failedClient.close().catch(() => {});

        const transient = TRANSIENT_ERROR.test(String(error && error.message ? error.message : error));
        if (attempt < attempts && transient) {
          await sleep(delayMs * attempt);
          continue;
        }
        break;
      }
    }

    throw new Error(describeConnectionError(lastError, uri));
  })().finally(() => { connecting = null; });

  return connecting;
}

// Used by the server: reconnects in the background without blocking startup.
async function ensureDatabase() {
  if (database) return database;
  return connectDatabase({ attempts: 1 });
}

function getDatabase() {
  if (!database) throw new Error('Database is not connected.');
  return database;
}

async function closeDatabase() {
  const current = client;
  client = undefined;
  database = undefined;
  if (current) await current.close().catch(() => {});
}

module.exports = {
  connectDatabase,
  ensureDatabase,
  isDatabaseConnected,
  getDatabase,
  closeDatabase
};
