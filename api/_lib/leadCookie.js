// Shared lead-identity cookie helpers, used by the quiz + guide endpoints (to
// SET the cookie at capture) and by server.js (to DETECT a returning lead and
// fire the internal alert).
//
// Why server-set: Safari ITP caps document.cookie (JS-set) cookies at 7 days,
// but first-party cookies set via a Set-Cookie response header from our own
// origin keep their full Max-Age. Setting them from the API response is what
// makes this survive on iPhones/Safari.
//
// Token format: v1.<base64url payload>.<base64url HMAC-SHA256>
// There is no database in this stack, so the identity lives IN the cookie,
// HMAC-signed so it cannot be forged, and HttpOnly so page JS never sees it.
// If LEAD_COOKIE_SECRET is unset the whole feature quietly no-ops.
//
// The leading underscore in _lib matters: Vercel skips underscore-prefixed
// paths in api/, and server.js's auto-mounter skips it too (no default fn).
import { createHmac, timingSafeEqual } from 'node:crypto';

const VERSION = 'v1';
export const LEAD_COOKIE = 'sva_lead';
export const SEEN_COOKIE = 'sva_seen';
// Non-HttpOnly marker (no PII, literal "1") so page JS knows this browser is a
// known lead and can beacon SPA route changes for the visit-trail digest.
export const KNOWN_COOKIE = 'sva_known';
const LEAD_MAX_AGE = 365 * 24 * 60 * 60; // 1 year, refreshed on every return
const SEEN_MAX_AGE = 4 * 60 * 60;        // one return-alert per 4h "session"

const FLAGS = '; Path=/; Secure; HttpOnly; SameSite=Lax';

const b64u = (buf) => Buffer.from(buf).toString('base64url');
const secret = () => process.env.LEAD_COOKIE_SECRET || '';
const hmac = (data) => createHmac('sha256', secret()).update(data).digest();

export function signLead(payload) {
    if (!secret()) return null;
    const body = b64u(JSON.stringify(payload));
    return `${VERSION}.${body}.${b64u(hmac(`${VERSION}.${body}`))}`;
}

export function verifyLead(token) {
    if (!secret() || typeof token !== 'string') return null;
    const [v, body, sig] = token.split('.');
    if (v !== VERSION || !body || !sig) return null;
    const expected = hmac(`${v}.${body}`);
    let given;
    try { given = Buffer.from(sig, 'base64url'); } catch { return null; }
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
    try { return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); } catch { return null; }
}

export function parseCookies(header) {
    const out = {};
    if (typeof header !== 'string') return out;
    for (const part of header.split(';')) {
        const i = part.indexOf('=');
        if (i < 0) continue;
        try { out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim()); }
        catch { out[part.slice(0, i).trim()] = part.slice(i + 1).trim(); }
    }
    return out;
}

// Share the cookie between apex and www in production; host-only anywhere
// else (Vercel previews, localhost) so we never set an invalid Domain.
function cookieDomain(host) {
    return /(^|\.)stellarvoiceagents\.com$/i.test(String(host || '').split(':')[0])
        ? '; Domain=.stellarvoiceagents.com'
        : '';
}

// Cookies to set when a lead is captured. Also marks the current session as
// "seen" so the visit where they submitted the form does not itself alert.
export function leadSetCookies(payload, host) {
    const token = signLead(payload);
    if (!token) return [];
    const d = cookieDomain(host);
    return [
        `${LEAD_COOKIE}=${token}; Max-Age=${LEAD_MAX_AGE}${FLAGS}${d}`,
        `${SEEN_COOKIE}=1; Max-Age=${SEEN_MAX_AGE}${FLAGS}${d}`,
        `${KNOWN_COOKIE}=1; Max-Age=${LEAD_MAX_AGE}; Path=/; Secure; SameSite=Lax${d}`
    ];
}

// Cookies to set when a known lead RETURNS: refresh the identity (rolling
// 1-year expiry) and start a new 4h seen-window so we alert once per visit.
export function returnSetCookies(payload, host) {
    const token = signLead(payload);
    const d = cookieDomain(host);
    const out = [
        `${SEEN_COOKIE}=1; Max-Age=${SEEN_MAX_AGE}${FLAGS}${d}`,
        `${KNOWN_COOKIE}=1; Max-Age=${LEAD_MAX_AGE}; Path=/; Secure; SameSite=Lax${d}`
    ];
    if (token) out.unshift(`${LEAD_COOKIE}=${token}; Max-Age=${LEAD_MAX_AGE}${FLAGS}${d}`);
    return out;
}
