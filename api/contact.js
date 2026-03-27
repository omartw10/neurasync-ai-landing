// ==========================================
// Vercel Serverless Proxy for Contact Form
// ==========================================
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Dev-only: load .env.local if env vars are missing (vercel dev doesn't auto-load them for serverless functions)
if (!process.env.N8N_WEBHOOK_URL) {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    if (existsSync(envPath)) {
      readFileSync(envPath, 'utf8').split('\n').forEach(line => {
        const trimmed = line.trim().replace(/\r$/, '');
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIndex = trimmed.indexOf('=');
          if (eqIndex > 0) {
            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed.slice(eqIndex + 1).trim();
            if (!process.env[key]) process.env[key] = value;
          }
        }
      });
    }
  } catch (_) { /* silently skip in production */ }
}

// Simple in-memory rate limiting (resets on cold start)
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count++;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Max payload size: 10KB
const MAX_BODY_SIZE = 10000;

export default async function handler(req, res) {
  console.log('[api/contact] Incoming request:', req.method);

  // ── Method check ──
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ── Rate limiting ──
  const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',').pop()?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // ── Payload size check ──
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  // ── Server config check ──
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.error('[api/contact] Missing env vars: N8N_WEBHOOK_URL or N8N_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Server configuration is missing webhook details' });
  }

  // ── Input validation ──
  const { name, email, inquiryType, productName, message, subject } = req.body || {};

  if (!name || !email || !inquiryType || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (typeof name !== 'string' || name.length > 200) {
    return res.status(400).json({ error: 'Invalid name' });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return res.status(400).json({ error: 'Message exceeds maximum length' });
  }
  if (typeof inquiryType !== 'string' || inquiryType.length > 100) {
    return res.status(400).json({ error: 'Invalid inquiry type' });
  }

  // ── Construct sanitized payload (never forward raw req.body) ──
  const sanitizedPayload = {
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 254),
    inquiryType: inquiryType.trim().slice(0, 100),
    productName: typeof productName === 'string' ? productName.trim().slice(0, 100) : '',
    message: message.trim().slice(0, 5000),
    subject: typeof subject === 'string' ? subject.trim().slice(0, 200) : 'New Inquiry',
  };

  try {
    // Fix Node.js IPv6 resolution issue: localhost may resolve to ::1
    // but n8n typically binds to 127.0.0.1 (IPv4 only)
    const resolvedUrl = webhookUrl.replace('://localhost', '://127.0.0.1');
    console.log(`[api/contact] Forwarding to: ${resolvedUrl}`);

    // 10-second timeout to prevent hanging if n8n is unreachable
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(resolvedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': webhookSecret,
      },
      body: JSON.stringify(sanitizedPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`[api/contact] n8n responded with ${response.status}: ${response.statusText}`);
      return res.status(response.status).json({ error: 'Failed to process request' });
    }

    console.log('[api/contact] Message sent successfully');
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    // Detailed error logging for terminal debugging
    if (error.name === 'AbortError') {
      console.error('[api/contact] Request to n8n timed out after 10s');
      return res.status(504).json({ error: 'Webhook service is not responding' });
    }
    console.error(`[api/contact] Fetch failed — ${error.code || error.name}: ${error.message}`);
    console.error(`[api/contact] Target URL: ${webhookUrl}`);
    return res.status(502).json({ error: 'Unable to reach webhook service' });
  }
}
