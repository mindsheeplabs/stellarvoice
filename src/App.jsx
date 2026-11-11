import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import HowItWorksPage from './pages/HowItWorksPage'
import PricingPage from './pages/PricingPage'
import CaseStudiesHub from './pages/CaseStudiesHub'
import CaseStudyEasyStart from './pages/CaseStudyEasyStart'
import CaseStudyIPA from './pages/CaseStudyIPA'
import CaseStudyReceptionist from './pages/CaseStudyReceptionist'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import GuidesPage from './pages/GuidesPage'
import AppointmentEnginePage from './pages/AppointmentEnginePage'

// Known leads (sva_known marker, set server-side with the signed lead cookie)
// beacon SPA route changes so the visit-trail digest email can show which
// pages they browsed. Identity stays in the HttpOnly cookie; this only sends
// the path. Consecutive duplicates are deduped server-side.
function VisitBeacon() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!document.cookie.split('; ').includes('sva_known=1')) return;
    try {
      navigator.sendBeacon(
        '/api/visit/track',
        new Blob([JSON.stringify({ p: pathname })], { type: 'application/json' })
      );
    } catch { /* fire-and-forget */ }
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Defer to allow target to render
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <VisitBeacon />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* The earlier home page. "/" itself is now served by the trades home page (see server.js). */}
          <Route path="/classic" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/case-studies" element={<CaseStudiesHub />} />
          <Route path="/case-studies/denes-aldott" element={<CaseStudyEasyStart />} />
          <Route path="/case-studies/ipa-lead-reactivation" element={<CaseStudyIPA />} />
          <Route path="/case-studies/ai-receptionist-safety-net" element={<CaseStudyReceptionist />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/appointment-engine" element={<AppointmentEnginePage />} />
          {/* Legacy slug — preserved as a client-side fallback for anyone with
              the old link cached. Vercel also 308-redirects at the edge. */}
          <Route path="/case-studies/easystart-homes" element={<CaseStudyEasyStart />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
