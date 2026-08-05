// Beacon endpoint for SPA route changes from known leads (sva_known marker).
// Validates the signed sva_lead cookie server-side, then appends the page to
// the in-memory visit trail (digest email after 10 min idle). Returns 204
// always: this is fire-and-forget from navigator.sendBeacon.
//
// NOTE: relative imports carry .js extensions (native Node ESM).
import { verifyLead, parseCookies, LEAD_COOKIE } from '../_lib/leadCookie.js';
import { recordVisit } from '../_lib/visitTrail.js';

const MAX_BODY = 300;

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        const lead = verifyLead(parseCookies(req.headers.cookie)[LEAD_COOKIE]);
        if (lead) {
            let body = req.body;
            if (typeof body === 'string' && body.length <= MAX_BODY) {
                try { body = JSON.parse(body); } catch { body = null; }
            }
            const path = typeof body?.p === 'string' ? body.p : null;
            if (path && path.startsWith('/') && path.length <= 200) recordVisit(lead, path);
        }
    } catch (e) {
        console.error('[visit/track]', e);
    }
    return res.status(204).end();
}
