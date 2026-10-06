// Build step: turn every page in public/sitemap.xml into real HTML (dist/<path>/index.html),
// so search engines and AI crawlers get the full content without running JavaScript.
// Also writes dist/404.html and dist/routes.json (the list server.js answers 200 for).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { blogPosts } = await import(pathToFileURL(join(root, 'src', 'data', 'blogPosts.js')).href)
const meta = JSON.parse(readFileSync(join(root, 'src', 'seo-meta.json'), 'utf8'))
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8')
// Pages the app serves that are deliberately left out of the sitemap.
const EXTRA = ['/pricing']
const fromSitemap = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1].replace(/\/$/, '') || '/')
const routes = [...new Set([...fromSitemap, ...EXTRA])]

const SITE = 'https://www.stellarvoiceagents.com'
const attr = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const clip = (t, n = 158) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n - 1)) + '…')

// Title, description and canonical for one page: src/seo-meta.json (each page's own wording),
// blog posts from their title and dek. Falls back to the template's defaults.
function metaFor(route) {
  if (meta[route]) return meta[route]
  const post = route.startsWith('/blog/') && blogPosts[route.slice(6)]
  if (post) return { title: `${post.title} | Stellar Voice Agents`, description: clip(post.dek) }
  console.warn('no seo-meta for', route)
  return null
}

const page = (route, html) => {
  // email_off: stops Cloudflare's email obfuscation rewriting addresses into /cdn-cgi/l/email-protection
  // links (crawlers see those as broken). The markers sit outside #root so hydration is unaffected.
  let out = template.replace('<div id="root"></div>', `<!--email_off--><div id="root">${html}</div><!--/email_off-->`)
  const m = metaFor(route)
  const url = SITE + (route === '/' ? '/' : route)
  out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
           .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  if (m) {
    out = out.replace(/<title>[^<]*<\/title>/, `<title>${attr(m.title)}</title>`)
             .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${attr(m.description)}" />`)
    if (route !== '/') {
      out = out.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${attr(m.title)}" />`)
               .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${attr(m.description)}" />`)
    }
  }
  return out
}

for (const route of routes) {
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page(route, render(route)))
  console.log('prerendered', route)
}

// 404: the shell with a plain message; the app takes over in the browser.
writeFileSync(join(dist, '404.html'), template.replace('<div id="root"></div>',
  '<div id="root"><main style="padding:4rem 1.5rem;text-align:center"><h1>Page not found</h1>' +
  '<p><a href="/">Back to Stellar Voice Agents</a></p></main></div>')
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Stellar Voice Agents</title>'))
writeFileSync(join(dist, 'routes.json'), JSON.stringify(routes))
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${routes.length} pages + 404.html`)
