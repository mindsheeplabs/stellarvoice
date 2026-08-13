// The quiz result rendered as a printable, shareable value snapshot.
// Per David (June 2026): the quiz shows ONLY the value / lost revenue.
// Our pricing (tiers, retainer, per-booking fees, ROI-vs-cost) is no longer
// shown here — pricing is discussed on the call.

import React, { useState } from 'react';
import { Printer, Share2 } from 'lucide-react';
import { openCalendly } from '../../lib/calendly';
import { track } from '../../lib/analytics';
import GuideRequestModal from '../Guide/GuideRequestModal';
import { QUIZ_INDUSTRY_TO_GUIDE } from '../../data/guides';
import './QuoteScreen.css';

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

const today = () =>
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

function handlePrintOrShare() {
    track('quote_printed', { source: 'quote_screen' });
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
    if (isMobile && typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
            title: 'My SVA Revenue Snapshot',
            text: 'My personalised revenue snapshot from Stellar Voice Agents.',
            url: typeof window !== 'undefined' ? window.location.href : 'https://www.stellarvoiceagents.com/'
        }).catch(() => {
            if (typeof window !== 'undefined') window.print();
        });
    } else if (typeof window !== 'undefined') {
        window.print();
    }
}

// Generic capability list — no tiers, no prices. What every client gets.
const WHAT_YOU_GET = [
    'Speed-to-lead callback in under 60 seconds, every time',
    'AI voice agents that call, qualify, and book around the clock',
    'SMS, WhatsApp, and email follow-up until the lead responds',
    'Every call recorded, transcribed, and scored',
    'Qualified bookings sent straight to your calendar'
];

export default function QuoteScreen({ result, businessName, industry }) {
    const [guideOpen, setGuideOpen] = useState(false);
    const guidePreselect = QUIZ_INDUSTRY_TO_GUIDE[industry] ?? '';
    const monthlyRevenue = result.monthlyRevenue;
    const annualRevenue = result.annualRevenue;
    const threeYearRevenue = annualRevenue * 3;

    const handleBookDemo = () => {
        track('book_demo_clicked', { source: 'quote_screen', monthly_revenue: monthlyRevenue });
        openCalendly(undefined, 'quote-value');
    };

    return (
        <div className="quote-screen">
            {/* HEADER */}
            <header className="quote-header">
                <img src="/logo.webp" alt="Stellar Voice Agents" className="quote-logo" />
                <p className="quote-title">Your Revenue Recovery Snapshot</p>
                <p className="quote-date">{today()}</p>
            </header>

            <button type="button" className="quote-print-btn no-print" onClick={handlePrintOrShare}>
                <Printer size={16} aria-hidden="true" />
                <span className="desktop-only">Print This Snapshot</span>
                <span className="mobile-only"><Share2 size={16} aria-hidden="true" /> Share</span>
            </button>

            {/* REVENUE LEAK */}
            <section className="quote-leak">
                <p className="quote-leak-label">{businessName ? `${businessName}, you're` : 'You are'} currently losing</p>
                <p className="quote-leak-number">{fmt(monthlyRevenue)}<span>/mo</span></p>
                <p className="quote-leak-annual">
                    That is <strong>{fmt(annualRevenue)} per year</strong> walking out the door.
                </p>
            </section>

            {/* THE OPPORTUNITY — value only */}
            <section className="quote-numbers">
                <h3>The revenue you could recover</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Per month</td>
                            <td className="num profit">{fmt(monthlyRevenue)}</td>
                        </tr>
                        <tr>
                            <td>Per year</td>
                            <td className="num profit">{fmt(annualRevenue)}</td>
                        </tr>
                        <tr>
                            <td>Over three years</td>
                            <td className="num profit">{fmt(threeYearRevenue)}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* WHAT YOU GET */}
            <section className="quote-features">
                <h3>What you get</h3>
                <ul>
                    {WHAT_YOU_GET.map((f, i) => (
                        <li key={i}><span className="check">✓</span> {f}</li>
                    ))}
                </ul>
            </section>

            {/* PERFORMANCE GUARANTEE NOTE */}
            <section className="quote-pilot">
                <p>
                    <strong>Performance guarantee:</strong> we are measured on the qualified bookings we put on
                    your calendar. If we do not deliver, you do not pay. That is how confident we are.
                </p>
            </section>

            {/* NEXT STEP */}
            <section className="quote-cta no-print-borders">
                <p className="quote-cta-label">Ready to stop losing {fmt(monthlyRevenue)} every month?</p>
                <button type="button" className="quote-cta-primary" onClick={handleBookDemo}>
                    Book a 30-min demo with our AI voice specialist
                </button>
                <p className="quote-cta-secondary">
                    We will map exactly how to recover it on the call.
                </p>
                <p className="quote-print-url">
                    Calendar: calendly.com/garysarco1/30min
                </p>
            </section>

            {/* FREE GUIDE CTA — post-quiz lead magnet */}
            <section className="quote-guide no-print">
                <p className="quote-guide-eyebrow">Free industry guide</p>
                <p className="quote-guide-text">
                    Want the AI voice playbook for your industry? We will email you a practical guide on
                    where the revenue leaks and what to fix first.
                </p>
                <button
                    type="button"
                    className="quote-guide-btn"
                    onClick={() => { track('quote_guide_clicked', { industry }); setGuideOpen(true); }}
                >
                    Email me the guide &rarr;
                </button>
            </section>

            <button type="button" className="quote-print-btn quote-print-btn-bottom no-print" onClick={handlePrintOrShare}>
                <Printer size={16} aria-hidden="true" /> Print This Snapshot
            </button>

            <footer className="quote-footer">
                This snapshot was generated based on your quiz answers on {today()}.
                Figures are estimates based on the information you provided.
                Stellar Voice Agents · stellarvoiceagents.com
            </footer>

            {guideOpen && (
                <GuideRequestModal initialIndustryId={guidePreselect} onClose={() => setGuideOpen(false)} />
            )}
        </div>
    );
}

export function EnterpriseQuoteScreen({ result, businessName }) {
    const monthlyRevenue = result.monthlyRevenue;
    const annualRevenue = result.annualRevenue;

    const handleBookCall = () => {
        track('enterprise_redirect', { source: 'quote_screen', clicked_book_call: true, monthly_revenue: monthlyRevenue });
        openCalendly(undefined, 'quote-enterprise');
    };

    return (
        <div className="quote-screen quote-enterprise">
            <header className="quote-header">
                <img src="/logo.webp" alt="Stellar Voice Agents" className="quote-logo" />
                <p className="quote-title">Your Revenue Recovery Snapshot</p>
                <p className="quote-date">{today()}</p>
            </header>

            <section className="quote-leak">
                <p className="quote-leak-label">{businessName ? `${businessName}, you're` : 'You are'} currently losing</p>
                <p className="quote-leak-number">{fmt(monthlyRevenue)}<span>/mo</span></p>
                <p className="quote-leak-annual">
                    Estimated annual revenue at risk: <strong>{fmt(annualRevenue)}</strong>.
                </p>
            </section>

            <section className="quote-enterprise-card">
                <h3>Enterprise Partnership</h3>
                <p>
                    At your volume and deal size, a standard plan doesn&apos;t do justice to the opportunity.
                    We build custom Enterprise partnerships with dedicated account management,
                    unlimited agents, and SLA guarantees.
                </p>
                <ul>
                    <li>Dedicated account manager and onboarding team</li>
                    <li>Unlimited AI agents and CRM integrations</li>
                    <li>Custom workflows, custom personas, custom KPIs</li>
                    <li>SLA-backed uptime and response guarantees</li>
                    <li>Weekly strategy reviews with Gary</li>
                </ul>
                <button type="button" className="quote-cta-primary" onClick={handleBookCall}>
                    Book a call with our AI voice specialist
                </button>
                <p className="quote-print-url">
                    Calendar: calendly.com/garysarco1/30min
                </p>
            </section>

            <footer className="quote-footer">
                This snapshot was generated based on your quiz answers on {today()}.
                Figures are estimates based on the information you provided.
                Stellar Voice Agents · stellarvoiceagents.com
            </footer>
        </div>
    );
}
