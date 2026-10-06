import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Pages are pre-rendered to real HTML at build time (scripts/prerender.mjs) so search
// engines and AI crawlers read the full content; the browser then takes over (hydrates).
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
