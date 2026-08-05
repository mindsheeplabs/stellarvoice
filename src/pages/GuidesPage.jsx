import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import GuideRequestModal from '../components/Guide/GuideRequestModal';
import { GUIDES } from '../data/guides';
import { track } from '../lib/analytics';
import './GuidesPage.css';

const ORDER = ['real-estate', 'home-services', 'healthcare', 'finance', 'hospitality', 'marketing-agencies'];

// /guides — dedicated page. Each guide card opens the request modal. Guide
// slugs match a GUIDE_INDUSTRIES id, so we pass the slug as the industry.
export default function GuidesPage() {
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'Free AI Voice Guides by Industry | Stellar Voice Agents';
        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        if (desc) desc.setAttribute('content', 'Free practical playbooks for Real Estate, Hotels, Home Services, Healthcare, Finance, Marketing Agencies and Hospitality: where the revenue leaks and how AI voice fixes it.');
        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
        };
    }, []);

    const openFor = (slug) => {
        track('guide_card_clicked', { guide: slug });
        setOpenId(slug);
    };

    return (
        <>
            <Navbar />
            <main className="gp-page">
                <section className="gp-hero">
                    <div className="container gp-hero-inner">
                        <p className="gp-eyebrow">Free industry guides</p>
                        <h1>Practical AI-voice playbooks for your industry</h1>
                        <p className="gp-hero-sub">
                            No fluff. Each guide shows where the revenue leaks in your industry, what to fix first, and what
                            good looks like. Pick yours and we will email it over.
                        </p>
                    </div>
                </section>

                <section className="gp-grid-wrap">
                    <div className="container">
                        <div className="gp-grid">
                            {ORDER.map((slug) => {
                                const g = GUIDES[slug];
                                if (!g) return null;
                                return (
                                    <article key={slug} className="gp-card">
                                        <span className="gp-card-tag">{g.industry}</span>
                                        <h2 className="gp-card-title">{g.title}</h2>
                                        <p className="gp-card-blurb">{g.blurb}</p>
                                        <button className="gp-card-btn" onClick={() => openFor(slug)}>
                                            Email me this guide &rarr;
                                        </button>
                                    </article>
                                );
                            })}
                        </div>
                        <p className="gp-note">In solar? The <strong>Home Services</strong> guide is built for you. Something else? Pick the closest fit and we will point you the right way on a call.</p>
                    </div>
                </section>

                <CTABanner />
            </main>
            <Footer />

            {openId !== null && (
                <GuideRequestModal initialIndustryId={openId} onClose={() => setOpenId(null)} />
            )}
        </>
    );
}
