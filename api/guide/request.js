// Vercel Serverless Function — emails a requested industry guide (lead magnet).
// Sends the requester a link to the guide PDF plus a Calendly CTA, and drops an
// internal lead alert. Uses Resend (same env + verified domain as the
// calculator function).
//
// Required env: RESEND_API_KEY, INTERNAL_EMAILS, FROM_EMAIL
// Optional env: REPLY_TO_EMAIL, ALLOWED_ORIGINS, SITE_URL
//
// NOTE: relative imports MUST carry the .js extension — Vercel runs this as
// native Node ESM (Vite-style extensionless imports throw ERR_MODULE_NOT_FOUND).
import { Resend } from 'resend';
import { GUIDES } from '../../src/data/guides.js';
import { leadSetCookies } from '../_lib/leadCookie.js';

const SITE_URL = process.env.SITE_URL || 'https://www.stellarvoiceagents.com';
const CALENDLY_URL = 'https://calendly.com/garysarco1/30min';

const DEFAULT_ALLOWED_ORIGINS = [
    'https://stellarvoiceagents.com',
    'https://www.stellarvoiceagents.com'
];
const MAX_FIELD_LEN = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 4;
const RATE_LIMIT_MAP_CAP = 5_000;
const rateMap = new Map();

function rateLimit(ip) {
    const now = Date.now();
    const entry = rateMap.get(ip);
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        if (rateMap.size > RATE_LIMIT_MAP_CAP) rateMap.clear();
        rateMap.set(ip, { count: 1, windowStart: now });
        return { allowed: true };
    }
    entry.count += 1;
    if (entry.count > RATE_LIMIT_MAX) {
        return { allowed: false, retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000) };
    }
    return { allowed: true };
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
}

function isEmail(s) {
    return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function getClientIp(req) {
    const fwd = req.headers['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
    return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function getAllowedOrigins() {
    const fromEnv = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    return fromEnv.length ? fromEnv : DEFAULT_ALLOWED_ORIGINS;
}

function guideEmailHtml(guide, name) {
    const safeName = escapeHtml(name || 'there');
    const pdfUrl = `${SITE_URL}${guide.pdf}`;
    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:30px 24px;text-align:center">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9">Your ${escapeHtml(guide.industry)} guide</p>
      <p style="margin:0;font-size:24px;font-weight:900;line-height:1.2">${escapeHtml(guide.title)}</p>
    </div>
    <div style="padding:28px 24px">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55">Hi ${safeName}, thanks for requesting the guide. Here is your copy, ready to read now:</p>
      <div style="text-align:center;margin:24px 0">
        <a href="${pdfUrl}" style="display:inline-block;background:#7868F8;color:#fff;padding:16px 36px;border-radius:999px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:14px;text-decoration:none">Read the guide &rarr;</a>
      </div>
      <p style="margin:0 0 20px;font-size:13px;color:#777;line-height:1.55;text-align:center">Or paste this link into your browser:<br><a href="${pdfUrl}" style="color:#7868F8;word-break:break-all">${pdfUrl}</a></p>

      <div style="margin:24px 0;padding:20px;background:#F5F2FF;border-radius:12px">
        <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:#25005D"><strong>Want this set up for your business?</strong> If you would like one of our team to walk you through exactly what an AI voice agent would do for your ${escapeHtml(guide.industry.toLowerCase())} business, book a quick 30-minute call.</p>
        <div style="text-align:center">
          <a href="${CALENDLY_URL}" style="display:inline-block;background:#25005D;color:#fff;padding:14px 32px;border-radius:999px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:13px;text-decoration:none">Book a call with Gary &rarr;</a>
        </div>
      </div>
    </div>
    <div style="padding:18px 24px;background:#F3F3F3;text-align:center;font-size:12px;color:#888">
      Stellar Voice Agents &middot; stellarvoiceagents.com
    </div>
  </div>
</body></html>`;
}

function internalHtml(guide, name, email, phone) {
    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:22px 24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">New guide download</p>
      <p style="margin:0;font-size:20px;font-weight:900">${escapeHtml(guide.industry)} &middot; ${escapeHtml(guide.title)}</p>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#555">Name</td><td style="padding:6px 0"><strong>${escapeHtml(name || '(none)')}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#555">Email</td><td style="padding:6px 0"><a href="mailto:${encodeURIComponent(email)}" style="color:#7868F8;text-decoration:none">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#555">Phone</td><td style="padding:6px 0">${phone ? `<a href="tel:${encodeURIComponent(phone)}" style="color:#7868F8;text-decoration:none">${escapeHtml(phone)}</a>` : '<span style="color:#999">not provided</span>'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#555">Guide</td><td style="padding:6px 0"><strong>${escapeHtml(guide.title)}</strong></td></tr>
      </table>
    </div>
  </div>
  <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#888">Requested ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
</body></html>`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const origin = req.headers.origin;
    if (origin && !getAllowedOrigins().includes(origin)) {
        return res.status(403).json({ ok: false, error: 'Forbidden origin' });
    }

    const ip = getClientIp(req);
    const limit = rateLimit(ip);
    if (!limit.allowed) {
        res.setHeader('Retry-After', String(limit.retryAfter));
        return res.status(429).json({ ok: false, error: 'Too many requests' });
    }

    let body;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
    if (body && body._hp) return res.status(200).json({ ok: true, accepted: false }); // honeypot

    const name = (body?.name ?? '').toString().trim();
    const email = (body?.email ?? '').toString().trim();
    const phone = (body?.phone ?? '').toString().trim();
    const guideSlug = (body?.guide ?? '').toString().trim();

    if (!isEmail(email)) return res.status(400).json({ ok: false, error: 'A valid email is required' });
    if ([name, email, phone, guideSlug].some((v) => v.length > MAX_FIELD_LEN)) {
        return res.status(400).json({ ok: false, error: 'A field is too long' });
    }
    const guide = GUIDES[guideSlug];
    if (!guide) return res.status(400).json({ ok: false, error: 'Unknown guide' });

    const apiKey = process.env.RESEND_API_KEY;
    const internalEmails = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const fromEmail = process.env.FROM_EMAIL;
    const replyTo = process.env.REPLY_TO_EMAIL || internalEmails[0];
    if (!apiKey || !fromEmail || internalEmails.length === 0) {
        console.error('[guide/request] missing env vars', { hasApiKey: !!apiKey, hasFromEmail: !!fromEmail, internalCount: internalEmails.length });
        return res.status(500).json({ ok: false, error: 'Server email not configured' });
    }

    const resend = new Resend(apiKey);

    const guideSend = resend.emails.send({
        from: fromEmail,
        to: [email],
        replyTo,
        subject: `Your guide: ${guide.title}`,
        html: guideEmailHtml(guide, name)
    });
    const internalSend = resend.emails.send({
        from: fromEmail,
        to: internalEmails,
        replyTo: email,
        subject: `[SVA] Guide download — ${guide.industry} · ${name || email}`,
        html: internalHtml(guide, name, email, phone)
    });

    const [guideRes, internalRes] = await Promise.allSettled([guideSend, internalSend]);

    // Resend resolves with { data, error } instead of throwing — inspect both.
    const outcome = (settled, label) => {
        if (settled.status === 'rejected') {
            console.error(`[guide/request] ${label} threw:`, String(settled.reason));
            return false;
        }
        const error = settled.value?.error;
        if (error) {
            console.error(`[guide/request] ${label} Resend error:`, JSON.stringify(error));
            return false;
        }
        return true;
    };

    const guideEmailSent = outcome(guideRes, 'guide');
    outcome(internalRes, 'internal');

    if (!guideEmailSent) {
        return res.status(502).json({ ok: false, error: 'We could not send the email. Please try again.' });
    }

    // Identify this browser as a known lead (server-set = survives Safari ITP).
    // server.js watches for the cookie and alerts us when they come back.
    const cookies = leadSetCookies(
        { e: email, n: name, s: `guide:${guideSlug}`, t: new Date().toISOString().slice(0, 10) },
        req.headers.host
    );
    if (cookies.length) res.setHeader('Set-Cookie', cookies);

    return res.status(200).json({ ok: true, guideEmailSent: true });
}
