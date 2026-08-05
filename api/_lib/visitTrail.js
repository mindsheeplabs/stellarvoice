// Visit-trail buffer for returning leads. The landing middleware (server.js)
// and the /api/visit/track beacon both record pages here; after IDLE_MS of
// silence one digest email is sent listing the pages the lead browsed.
//
// Deliberately in-memory: the site runs as one long-lived Express container on
// Dokploy, and losing a trail on redeploy is acceptable. (On Vercel serverless
// this would no-op harmlessly: functions die before the timer fires.)
import { Resend } from 'resend';

const IDLE_MS = 10 * 60 * 1000;  // digest sends 10 min after the last pageview
const MAX_PAGES = 25;
const MAX_SESSIONS = 500;        // runaway guard

const sessions = new Map();      // email -> { lead, pages: [{p, at}], timer }

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sendDigest(entry) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const from = process.env.FROM_EMAIL;
    if (!apiKey || !from || to.length === 0) return;
    const { lead, pages } = entry;
    if (!pages.length) return;
    const who = lead.n || lead.e;
    const rows = pages.map(({ p, at }) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;font-size:13px;white-space:nowrap">${esc(at)}</td><td style="padding:4px 0;font-size:13px"><strong>${esc(p)}</strong></td></tr>`
    ).join('');
    const { error } = await new Resend(apiKey).emails.send({
        from,
        to,
        subject: `[SVA] Visit trail — ${who} browsed ${pages.length} page${pages.length === 1 ? '' : 's'}`,
        html: `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:22px 24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">Visit trail</p>
      <p style="margin:0;font-size:20px;font-weight:900">${esc(who)}</p>
      <p style="margin:6px 0 0;font-size:12px;opacity:0.85">${esc(lead.e)}</p>
    </div>
    <div style="padding:22px 24px">
      <table style="width:100%;border-collapse:collapse"><tbody>${rows}</tbody></table>
      <p style="margin:16px 0 0;font-size:12px;color:#888">Times are Pacific. Digest sent after 10 minutes of inactivity.</p>
    </div>
  </div>
</body></html>`
    });
    if (error) console.error('[visit-trail] Resend error:', JSON.stringify(error));
}

export function recordVisit(lead, path) {
    if (!lead?.e || typeof path !== 'string') return;
    if (sessions.size > MAX_SESSIONS) sessions.clear();
    const key = lead.e;
    let entry = sessions.get(key);
    if (!entry) {
        entry = { lead, pages: [], timer: null };
        sessions.set(key, entry);
    }
    const at = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' });
    const last = entry.pages[entry.pages.length - 1];
    if ((!last || last.p !== path) && entry.pages.length < MAX_PAGES) {
        entry.pages.push({ p: path.slice(0, 200), at });
    }
    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {
        sessions.delete(key);
        sendDigest(entry).catch((e) => console.error('[visit-trail]', e));
    }, IDLE_MS);
    entry.timer.unref?.();
}
