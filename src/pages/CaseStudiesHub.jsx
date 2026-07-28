import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import './CaseStudiesHub.css';

// /case-studies — case study index.
// Per the May 31 Brief Sec 3.20 + Blueprint Sec 5.5. Designed to scale:
// drop new case studies in as they land. EasyStart is live, two are
// flagged as in production / publishing soon.
const cards = [
    {
        slug: 'ipa-lead-reactivation',
        industry: 'International Real Estate / Lead Reactivation',
        title: 'From a dead database to a $500K property buyer.',
        client: 'International Property Alerts (Chris White, Founder)',
        headline: '6%',
        headlineLabel: 'reactivation rate on 11-month-old leads',
        status: 'live'
    },
    {
        slug: 'denes-aldott',
        industry: 'Real Estate / New Home Builder',
        title: 'From a 60-lead pilot to a 6-month outbound engine.',
        client: 'EasyStart Homes (Denes Aldott, Sales Consultant)',
        headline: '17 to 25%',
        headlineLabel: 'booking rate on cold leads',
        status: 'live'
    },
    {
        slug: 'ai-receptionist-safety-net',
        industry: 'Marketing Agency / Inbound Reception',
        title: 'The 24/7 safety net for a boutique agency\'s busiest phone risk.',
        client: 'Boutique marketing agency (Washington DC / Maryland)',
        headline: '24/7',
        headlineLabel: 'zero-miss coverage on overflow and after-hours calls',
        status: 'live'
    },
    {
        slug: null,
        industry: 'Solar Energy',
        title: 'Case study coming soon',
        client: 'Solar engagement in production',
        headline: 'In progress',
        headlineLabel: 'Publishing when data is verified',
        status: 'coming-soon'
    }
];

export default function CaseStudiesHub() {
    return (
        <>
            <Navbar />
            <main className="cs-hub-page">
                {/* HERO */}
                <section className="csh-hero">
                    <div className="container csh-hero-inner">
                        <p className="csh-hero-eyebrow">Case Studies</p>
                        <h1>Real results from real businesses.</h1>
                        <p className="csh-hero-sub">
                            Every number on this page is verified. Every quote is from a real person.
                            We do not inflate and we do not fabricate.
                        </p>
                    </div>
                </section>

                {/* GRID */}
                <section className="csh-grid-section">
                    <div className="container">
                        <div className="csh-grid">
                            {cards.map((c, i) => {
                                const inner = (
                                    <>
                                        <span className="csh-card-industry">{c.industry}</span>
                                        <h2>{c.title}</h2>
                                        <p className="csh-card-client">{c.client}</p>
                                        <div className="csh-card-headline">
                                            <span className="csh-card-headline-value">{c.headline}</span>
                                            <span className="csh-card-headline-label">{c.headlineLabel}</span>
                                        </div>
                                        {c.status === 'live' ? (
                                            <span className="csh-card-cta">Read the engagement &rarr;</span>
                                        ) : (
                                            <span className="csh-card-status">Coming soon</span>
                                        )}
                                    </>
                                );
                                return c.status === 'live' ? (
                                    <Link key={i} to={`/case-studies/${c.slug}`} className="csh-card csh-card-live">
                                        {inner}
                                    </Link>
                                ) : (
                                    <div key={i} className="csh-card csh-card-placeholder">
                                        {inner}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
