// Minimal server for a Vite SPA + Vercel-style api/ serverless functions on Dokploy.
// Serves the built ./dist (SPA fallback) and auto-mounts every handler in ./api at /api/<name>.
// Vercel handlers (`export default (req,res)=>...` using res.status().json()) run unchanged on Express.
import express from 'express'
import compression from 'compression'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, relative, sep } from 'node:path'

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
