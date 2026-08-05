// Minimal server for a Vite SPA + Vercel-style api/ serverless functions on Dokploy.
// Serves the built ./dist (SPA fallback) and auto-mounts every handler in ./api at /api/<name>.
// Vercel handlers (`export default (req,res)=>...` using res.status().json()) run unchanged on Express.
import express from 'express'
import compression from 'compression'
import { Resend } from 'resend'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, relative, sep } from 'node:path'
import { verifyLead, parseCookies, returnSetCookies, LEAD_COOKIE, SEEN_COOKIE } from './api/_lib/leadCookie.js'
import { recordVisit } from './api/_lib/visitTrail.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.set('trust proxy', true)          // behind Traefik — honour x-forwarded-for
// gzip text assets. Vercel did this for free; Express does not. Without it the
// JS bundle ships ~455KB raw instead of ~135KB, which is most of a slow mobile load.
app.use(compression())
app.use(express.json({ limit: '1mb' }))

// ---- auto-mount api/ handlers (flat file api/x.js -> /api/x ; dir api/x/y.js -> /api/x/y) ----
function findHandlers(dir, base = '/api') {
  const out = []
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...findHandlers(full, `${base}/${name}`))
    else if (name.endsWith('.js')) out.push({ route: name === 'index.js' ? base : `${base}/${name.replace(/\.js$/, '')}`, file: full })
  }
  return out
}
for (const { route, file } of findHandlers(join(__dirname, 'api'))) {
  try {
    const handler = (await import(pathToFileURL(file).href)).default
    if (typeof handler !== 'function') { console.warn('skip (no default fn):', route); continue }
    app.all(route, (req, res) => Promise.resolve(handler(req, res)).catch((e) => {
      console.error(`[api] ${route}`, e)
      if (!res.headersSent) res.status(500).json({ ok: false, error: 'Internal error' })
    }))
    console.log('mounted', route, '->', relative(__dirname, file))
  } catch (e) { console.error('failed to mount', route, e) }
}

// ---- return-visit alerts ----------------------------------------------------
// The quiz/guide endpoints set a signed, HttpOnly sva_lead cookie when a lead
// is captured (server-set, so Safari ITP's 7-day JS-cookie cap does not apply).
// Every page HTML request comes through here, so when that cookie shows up
// WITHOUT the short-lived sva_seen session cookie, a known lead has come back:
// re-arm the 4h seen-window and email the team. Fire-and-forget — an email
// failure must never slow down or break page serving.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

async function sendReturnAlert(lead, req) {
  const apiKey = process.env.RESEND_API_KEY
  const to = (process.env.INTERNAL_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const from = process.env.FROM_EMAIL
  if (!apiKey || !from || to.length === 0) return
  const who = lead.n ? `${lead.n}` : lead.e
  const source = lead.s === 'quiz' ? 'Revenue quiz' : String(lead.s ?? '').replace(/^guide:/, 'Guide: ')
  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject: `[SVA] Returning lead — ${who} is back on the site`,
    html: `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#F5F2FF;padding:24px;color:#1A1A1A">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(37,0,93,0.08)">
    <div style="background:linear-gradient(180deg,#473D92 0%,#7868F8 100%);color:#fff;padding:22px 24px;text-align:center">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85">Returning lead on the site now</p>
      <p style="margin:0;font-size:22px;font-weight:900">${esc(who)}</p>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#555">Contact</td><td style="padding:6px 0"><strong>${esc(lead.e)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#555">Captured via</td><td style="padding:6px 0">${esc(source)}${lead.t ? ` on ${esc(lead.t)}` : ''}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#555">Landed on</td><td style="padding:6px 0">${esc(req.path)}</td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#777;line-height:1.5">They are browsing right now — a good moment for a follow-up call or email.</p>
    </div>
  </div>
  <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#888">${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
</body></html>`
  })
  if (error) console.error('[return-alert] Resend error:', JSON.stringify(error))
}

app.use((req, res, next) => {
  try {
    if (req.method !== 'GET') return next()
    if (req.path.startsWith('/api/')) return next()
    if (/\.[a-z0-9]+$/i.test(req.path)) return next()                       // real files, not pages
    if (!String(req.headers.accept ?? '').includes('text/html')) return next()
    const cookies = parseCookies(req.headers.cookie)
    if (!cookies[LEAD_COOKIE]) return next()
    const lead = verifyLead(cookies[LEAD_COOKIE])
    if (!lead) return next()
    recordVisit(lead, req.path)                                             // seed the visit-trail digest
    if (cookies[SEEN_COOKIE]) return next()
    res.setHeader('Set-Cookie', returnSetCookies(lead, req.headers.host))   // throttle + rolling renewal
    sendReturnAlert(lead, req).catch((e) => console.error('[return-alert]', e))
  } catch (e) { console.error('[return-alert]', e) }
  next()
})

// ---- static frontend + SPA fallback ----
const distDir = join(__dirname, 'dist')
// Cache policy (express.static defaults to max-age=0, i.e. re-download everything
// on every visit). Vite fingerprints /assets/* by content hash, so those are safe to
// cache forever; everything else gets a short cache and index.html must never stick.
app.use(express.static(distDir, {
  index: false,
  setHeaders(res, path) {
    if (path.includes(`${sep}assets${sep}`)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (path.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache')
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400')  // images, pdfs, audio
    }
  },
}))
app.use((req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache')   // SPA shell: always revalidate
    return res.sendFile(join(distDir, 'index.html'))
  }
  res.status(404).json({ ok: false, error: 'Not found' })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`vite-api-server listening on :${port}`))
