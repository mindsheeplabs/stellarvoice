// Lead capture for the trades pages: "Get your own receptionist to try" and
// "Tell us what you want automated". Emails the team; reply goes to the lead.

import { Resend } from 'resend';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').trim().slice(0, max);

const LABELS = {
    'try-receptionist': 'Wants their own receptionist to try',
    automation: 'Automation enquiry',
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const internalEmails = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const fromEmail = process.env.FROM_EMAIL;
    if (!apiKey || !fromEmail || internalEmails.length === 0) {
        console.error('[lead/submit] missing env vars');
        return res.status(500).json({ ok: false, error: 'Server email not configured' });
    }

    let body;
    try {
        body = req.body;
        if (typeof body === 'string') body = JSON.parse(body);
    } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }

    // Honeypot: real people never fill this hidden field.
    if (clean(body?.website2, 200)) return res.status(200).json({ ok: true });

    const name = clean(body?.name, 120);
    const email = clean(body?.email, 200);
    const company = clean(body?.company, 160);
    const job = clean(body?.job, 2000);
    const source = LABELS[body?.source] ? body.source : 'try-receptionist';
    const page = clean(body?.page, 200);

    if (!name) return res.status(400).json({ ok: false, error: 'Name is required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ ok: false, error: 'Invalid email' });
    }

    const rows = [
        ['Name', name],
        ['Email', email],
        ['Company', company || 'Not given'],
        ...(job ? [['What takes up their time', job]] : []),
        ['Page', page || 'Unknown'],
    ];

    try {
        const { error } = await new Resend(apiKey).emails.send({
            from: fromEmail,
            to: internalEmails,
            replyTo: email,
            subject: `[SVA] ${LABELS[source]}: ${name}${company ? ` (${company})` : ''}`,
            html: `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:22px 24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">${esc(LABELS[source])}</p>
      <p style="margin:0;font-size:22px;font-weight:900">${esc(name)}</p>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join('')}
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#777;line-height:1.5">The site told them we would be in touch within one business day. Hit reply and it goes straight to them.</p>
    </div>
  </div>
</body></html>`,
        });
        if (error) {
            console.error('[lead/submit] Resend error:', JSON.stringify(error));
            return res.status(500).json({ ok: false });
        }
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('[lead/submit] send failed', err);
        return res.status(500).json({ ok: false });
    }
}
