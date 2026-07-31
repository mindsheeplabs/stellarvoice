// Vercel Serverless Function — receives quiz submissions and sends two emails
// via Resend: one internal alert, one client confirmation.
//
// Required env vars (set in Vercel dashboard → Project → Settings → Env Vars):
//   RESEND_API_KEY        — your Resend API key (server-only)
//   INTERNAL_EMAILS       — comma-separated, e.g. "gary@svca.com,david@mindsheep.com.au"
//   FROM_EMAIL            — verified Resend sender, e.g. "Stellar Voice Agents <hello@stellarvoiceagents.com>"
//   REPLY_TO_EMAIL        — optional, where client replies should land (default = first internal email)
//   ALLOWED_ORIGINS       — optional, comma-separated. Defaults to the production domain.

import { Resend } from 'resend';
import { QUESTIONS } from '../../src/calculator/questions.js';
import { calculate } from '../../src/calculator/calc.js';
import { leadSetCookies } from '../_lib/leadCookie.js';

const DEFAULT_ALLOWED_ORIGINS = [
    'https://stellarvoiceagents.com',
    'https://www.stellarvoiceagents.com'
];

const MAX_FIELD_LEN = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_MAP_CAP = 5_000;

// Per-instance sliding window. Best-effort across cold starts / concurrent
// instances; combined with origin + honeypot it stops casual abuse without
// adding infra.
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

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

function answerLabel(qid, answerId) {
    const q = QUESTIONS[qid];
    if (!q) return answerId;
    if (q.kind === 'text') return answerId;
    return q.options?.find((o) => o.id === answerId)?.label ?? answerId;
}

function isProbablyEmail(s) {
    return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isProbablyPhone(s) {
    if (typeof s !== 'string') return false;
    const digits = s.replace(/\D/g, '');
    return digits.length >= 6 && digits.length <= 15;
}

function buildInternalHtml(answers, result, contactKind) {
    const breakdownRows = Object.entries(result.breakdown)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `<li><strong>${escapeHtml(k)}:</strong> ${fmt(v)}/mo</li>`)
        .join('');

    const answerRows = Object.entries(answers)
        .filter(([k]) => k !== 'contact' && !k.startsWith('_'))
        .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#555;font-size:13px">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:13px"><strong>${escapeHtml(answerLabel(k, v))}</strong></td></tr>`)
        .join('');

    const safeContact = escapeHtml(answers.contact);
    const contactHref = contactKind === 'email'
        ? `mailto:${encodeURIComponent(answers.contact)}`
        : `tel:${encodeURIComponent(answers.contact)}`;

    const tierName = (result.plan?.name ?? result.tier ?? 'Starter').toUpperCase();
    const tierBadgeColor = result.enterprise ? '#25005D' : '#7868F8';
    const tierLabel = result.enterprise ? 'ENTERPRISE (custom partnership)' : tierName;

    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">New lead from quiz</p>
      <p style="margin:0;font-size:34px;font-weight:900">${fmt(result.monthlyRevenue)}<span style="font-size:14px;font-weight:600;opacity:0.85">/mo · ${fmt(result.annualRevenue)}/yr</span></p>
      <p style="margin:14px 0 0">
        <span style="display:inline-block;background:${tierBadgeColor};color:#fff;padding:5px 14px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.08em">RECOMMENDED: ${escapeHtml(tierLabel)}</span>
      </p>
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">Contact</p>
      <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#25005D">${escapeHtml(answers.businessName ?? '(no name)')}</p>
      <p style="margin:0 0 20px;font-size:15px"><a href="${contactHref}" style="color:#7868F8;text-decoration:none">${safeContact}</a> <span style="color:#888;font-size:12px">(${escapeHtml(contactKind)})</span></p>

      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">Where the revenue is coming from</p>
      <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#1A1A1A">${breakdownRows || '<li>No primary driver — answers were minimal.</li>'}</ul>

      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#473D92;font-weight:800">All answers</p>
      <table style="width:100%;border-collapse:collapse"><tbody>${answerRows}</tbody></table>
    </div>
  </div>
  <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#888">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
</body></html>`;
}

function buildClientHtml(answers, result) {
    const annual = fmt(result.annualRevenue);
    const monthly = fmt(result.monthlyRevenue);
    const businessName = escapeHtml(answers.businessName ?? 'your business');

    return `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:32px 24px;text-align:center">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9">Your hidden revenue, monthly</p>
      <p style="margin:0;font-size:48px;font-weight:900;line-height:1">${monthly}</p>
      <p style="margin:8px 0 0;font-size:15px;opacity:0.9">or <strong>${annual}</strong> a year</p>
    </div>
    <div style="padding:28px 24px">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55">Thanks for taking the test. Based on your answers, that's roughly what slow follow-up, missed calls, and after-hours enquiries are quietly costing ${businessName} every month.</p>

      <p style="margin:0 0 16px;font-size:16px;line-height:1.55">Here's the next step: a 30-minute call with Gary. He'll walk you through exactly how a Stellar voice agent would engage, qualify, and book that revenue back — using your real numbers, not estimates.</p>

      <div style="text-align:center;margin:28px 0">
        <a href="https://calendly.com/garysarco1/30min" style="display:inline-block;background:#25005D;color:#fff;padding:16px 36px;border-radius:999px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:14px;text-decoration:none">Book a Demo with Gary →</a>
      </div>

      <p style="margin:0;font-size:13px;color:#777;line-height:1.55">Estimates use the SVA pillar metrics: 3× speed-to-lead, +120% qualified leads, +45% coverage uplift. We'll tune them to your actual data on the call.</p>
    </div>
    <div style="padding:18px 24px;background:#F3F3F3;text-align:center;font-size:12px;color:#888">
      Stellar Voice Agents · stellarvoiceagents.com
    </div>
  </div>
</body></html>`;
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

function validateAnswers(answers) {
    if (!answers || typeof answers !== 'object') return 'Invalid payload';
    if (!answers.contact || !answers.businessName) return 'Missing contact or businessName';

    for (const [k, v] of Object.entries(answers)) {
        if (typeof v !== 'string') return `Invalid value for ${k}`;
        if (v.length > MAX_FIELD_LEN) return `Field ${k} too long`;
    }

    const isEmail = isProbablyEmail(answers.contact);
    const isPhone = isProbablyPhone(answers.contact);
    if (!isEmail && !isPhone) return 'Contact must be an email or phone number';

    return null;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    // Origin check (skip if header missing — some same-origin clients omit it).
    const origin = req.headers.origin;
    if (origin) {
        const allowed = getAllowedOrigins();
        if (!allowed.includes(origin)) {
            return res.status(403).json({ ok: false, error: 'Forbidden origin' });
        }
    }

    // Rate limit per IP, best-effort across this instance.
    const ip = getClientIp(req);
    const limit = rateLimit(ip);
    if (!limit.allowed) {
        res.setHeader('Retry-After', String(limit.retryAfter));
        return res.status(429).json({ ok: false, error: 'Too many requests' });
    }

    let answers;
    try {
        answers = req.body;
        if (typeof answers === 'string') answers = JSON.parse(answers);
    } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }

    // Honeypot — silently accept so bots don't learn the field is filtered.
    if (answers && typeof answers === 'object' && answers._hp) {
        return res.status(200).json({ ok: true, accepted: false });
    }

    const validationError = validateAnswers(answers);
    if (validationError) {
        return res.status(400).json({ ok: false, error: validationError });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const internalEmails = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const fromEmail = process.env.FROM_EMAIL;
    const replyTo = process.env.REPLY_TO_EMAIL || internalEmails[0];

    if (!apiKey || !fromEmail || internalEmails.length === 0) {
        console.error('[calculator/submit] missing env vars', {
            hasApiKey: !!apiKey,
            hasFromEmail: !!fromEmail,
            internalCount: internalEmails.length
        });
        return res.status(500).json({ ok: false, error: 'Server email not configured' });
    }

    const result = calculate(answers);
    const contactKind = isProbablyEmail(answers.contact) ? 'email' : 'phone';

    const resend = new Resend(apiKey);
    const subject = `[SVA] New lead — ${fmt(result.monthlyRevenue)}/mo · ${answers.businessName}`;

    const internalSend = resend.emails.send({
        from: fromEmail,
        to: internalEmails,
        replyTo: contactKind === 'email' ? answers.contact : replyTo,
        subject,
        html: buildInternalHtml(answers, result, contactKind)
    });

    const clientSend = contactKind === 'email'
        ? resend.emails.send({
            from: fromEmail,
            to: [answers.contact],
            replyTo,
            subject: `Your hidden revenue: ${fmt(result.monthlyRevenue)}/mo`,
            html: buildClientHtml(answers, result)
        })
        : Promise.resolve({ skipped: 'phone-only contact' });

    const [internalRes, clientRes] = await Promise.allSettled([internalSend, clientSend]);

    // The Resend SDK RESOLVES with { data, error } rather than throwing on API
    // errors (invalid key, unverified domain/sender, etc.), so a fulfilled
    // promise can still be a FAILED send. Inspect both the rejection and the
    // resolved error, and surface the real reason in the logs.
    const outcome = (settled, label) => {
        if (settled.status === 'rejected') {
            console.error(`[calculator/submit] ${label} threw:`, String(settled.reason));
            return false;
        }
        const error = settled.value?.error;
        if (error) {
            console.error(`[calculator/submit] ${label} Resend error:`, JSON.stringify(error));
            return false;
        }
        console.log(`[calculator/submit] ${label} sent id=${settled.value?.data?.id ?? 'n/a'}`);
        return true;
    };

    const internalEmailSent = outcome(internalRes, 'internal');
    const clientEmailSent = contactKind === 'email' ? outcome(clientRes, 'client') : false;

    // Identify this browser as a known lead (server-set = survives Safari ITP).
    // server.js watches for the cookie and alerts us when they come back.
    const cookies = leadSetCookies(
        { e: answers.contact, n: answers.businessName, s: 'quiz', t: new Date().toISOString().slice(0, 10) },
        req.headers.host
    );
    if (cookies.length) res.setHeader('Set-Cookie', cookies);

    return res.status(200).json({
        ok: true,
        internalEmailSent,
        clientEmailSent,
        contactKind
    });
}
