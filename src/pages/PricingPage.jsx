import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calculator from '../components/Calculator/Calculator';
import {
    TIERS,
    TIER_ORDER,
    FEATURE_MATRIX,
    PERFORMANCE_GUARANTEE,
    setupFeeLine
} from '../lib/pricingConfig';
import { getRecommendation, getTierFromUrl } from '../lib/recommendationCookie';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import './PricingPage.css';

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

function CellValue({ value }) {
    if (value === '✓') return <span className="cell-tick" aria-label="Included">✓</span>;
    if (value === '✗') return <span className="cell-cross" aria-label="Not included">✗</span>;
    return <span className="cell-text">{value}</span>;
}

function TierCard({ tier, isRecommended, recommendedKnown }) {
    const handleCta = () => {
        track('tier_card_click', { tier: tier.id, was_recommended: isRecommended, cta: 'demo' });
        openCalendly(undefined, `pricing-${tier.id}`);
    };
    const handlePilot = () => {
        track('tier_card_click', { tier: tier.id, was_recommended: isRecommended, cta: 'pilot' });
        openCalendly(undefined, `pricing-${tier.id}-pilot`);
    };
    const mutedClass = recommendedKnown && !isRecommended ? 'is-muted' : '';
    const recommendedClass = isRecommended ? 'is-recommended' : '';

    return (
        <div
            id={`tier-${tier.id}`}
            className={`tier-card ${mutedClass} ${recommendedClass}`}
            style={{ '--tier-accent': tier.accent }}
        >
            {isRecommended && <span className="tier-badge">Recommended for You</span>}
            <h3 className="tier-name">{tier.name}</h3>

            <div className="tier-price">
                <span className="tier-price-value">{fmt(tier.baseRetainer)}</span>
                <span className="tier-price-unit">/mo base</span>
            </div>
            {/* Brief CR-2: one-line summary directly under the price so the
             * level of service is immediately obvious. */}
            {tier.tierSummary && <p className="tier-summary">{tier.tierSummary}</p>}
            <p className="tier-perappt">+ {fmt(tier.perBooking)} per qualified booking</p>

            {/* (Static revenue-lift range removed Jun 2026: prospects who came
             * from the quiz with a smaller calculated leak were seeing the
             * hardcoded range and getting confused by the contradiction. The
             * recommended badge alone signals which tier matches their inputs.) */}

            <ul className="tier-features">
                {tier.headlineFeatures.map((f, i) => (
                    <li key={i}>
                        <span className="check">✓</span> {f}
                    </li>
                ))}
            </ul>

            {/* Setup fee + performance guarantee. Brief Sec 1.2-1.4. */}
            <p className="tier-setup">{setupFeeLine(tier.id)}</p>
            <p className="tier-guarantee">{PERFORMANCE_GUARANTEE}</p>

            <button type="button" onClick={handleCta} className="tier-cta">
                Book a Demo
            </button>
            <button type="button" onClick={handlePilot} className="tier-cta tier-cta-secondary">
                Start 30-Day Pilot
            </button>
        </div>
    );
}

export default function PricingPage() {
    const [calcOpen, setCalcOpen] = useState(false);
    const tierGridRef = useRef(null);
    const location = useLocation();

    // Resolve the recommendation synchronously from URL and cookie. URL wins.
    const { recommendedTier, recommendation, source } = useMemo(() => {
        const fromUrl = getTierFromUrl(location.search);
        const cookie = getRecommendation();
        const tier = fromUrl || cookie?.tier || null;
        return {
            recommendedTier: tier,
            recommendation: cookie,
            source: fromUrl ? 'quiz_redirect' : cookie ? 'cookie' : 'direct'
        };
    }, [location.search]);

    useEffect(() => {
        track('pricing_page_view', {
            has_recommendation: !!recommendedTier,
            recommended_tier: recommendedTier ?? 'none',
            source
        });
        if (source === 'quiz_redirect' && recommendedTier && recommendedTier !== 'enterprise') {
            requestAnimationFrame(() => {
                const card = document.getElementById(`tier-${recommendedTier}`);
                if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }, [recommendedTier, source]);

    const isEnterprise = recommendedTier === 'enterprise';

    const matrixSections = useMemo(() => {
        const sections = [];
        let current = null;
        for (const row of FEATURE_MATRIX) {
            if (row.category) {
                current = { title: row.category, rows: [] };
                sections.push(current);
            } else if (current) {
                current.rows.push(row);
            }
        }
        return sections;
    }, []);

    return (
        <>
            <Navbar onOpenCalculator={() => setCalcOpen(true)} />
            <main className="pricing-page">
                {/* HERO */}
                <section className="pp-hero">
                    <div className="container pp-hero-inner">
                        <h1>We get paid when you do.</h1>
                        <p className="pp-hero-sub">
                            Your growth is our growth. We make money when we put a qualified meeting on your calendar, full stop.
                            More revenue for you means more revenue for us.
                        </p>
                        <button type="button" className="btn-primary pp-hero-cta" onClick={() => setCalcOpen(true)}>
                            See Your Recommended Plan
                        </button>
                        {recommendation && recommendation.revenue_leak > 0 && (
                            <p className="pp-hero-recap">
                                Your quiz showed <strong>{fmt(recommendation.revenue_leak)}/mo</strong> of hidden revenue.
                                Here is the plan we recommended.
                            </p>
                        )}
                    </div>
                </section>

                {/* ENTERPRISE BANNER */}
                {isEnterprise && (
                    <section className="pp-enterprise-banner">
                        <div className="container">
                            <h2>Based on your quiz, we recommend a custom Enterprise partnership.</h2>
                            <p>
                                At your volume and deal size, a standard plan doesn&apos;t do justice to the opportunity.
                                Book a call with our AI voice specialist to design your custom solution.
                            </p>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => {
                                    track('enterprise_redirect', { source: 'pricing_page', clicked_book_call: true });
                                    openCalendly(undefined, 'pricing-enterprise');
                                }}
                            >
                                Book a call with our AI voice specialist
                            </button>
                        </div>
                    </section>
                )}

                {/* TIER CARDS */}
                <section className="pp-tiers" ref={tierGridRef}>
                    <div className="container">
                        <div className="pp-tier-grid">
                            {TIER_ORDER.map((id) => (
                                <TierCard
                                    key={id}
                                    tier={TIERS[id]}
                                    isRecommended={recommendedTier === id}
                                    recommendedKnown={!!recommendedTier && !isEnterprise}
                                />
                            ))}
                        </div>
                        <p className="pp-enterprise-line">
                            Processing 500+ leads per month?{' '}
                            <button
                                type="button"
                                className="pp-text-link"
                                onClick={() => {
                                    track('enterprise_redirect', { source: 'pricing_inline', clicked_book_call: true });
                                    openCalendly(undefined, 'pricing-enterprise-inline');
                                }}
                            >
                                We build custom partnerships. Book a call with our AI voice specialist.
                            </button>
                        </p>
                    </div>
                </section>

                {/* COMMIT CALLOUT — Brief Sec 1.6 */}
                <section className="pp-commit-callout">
                    <div className="container">
                        <div className="pp-commit-inner">
                            <h2>The more you commit, the less you pay per booking.</h2>
                            <p>
                                Starter clients pay $35 per qualified booking. Growth clients pay $25. Scale clients pay $20.
                                We reward commitment because it lets us plan capacity and deliver better results. Every tier
                                includes a performance guarantee: if we deliver zero qualified bookings in your first month,
                                you get a full refund.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FEATURE MATRIX */}
                <section className="pp-matrix">
                    <div className="container">
                        <h2 className="section-title">Compare every feature</h2>
                        <div className="pp-matrix-wrap">
                            <table className="pp-matrix-table">
                                <thead>
                                    <tr>
                                        <th className="col-feature">Feature</th>
                                        <th className={recommendedTier === 'starter' ? 'is-recommended' : ''}>Starter</th>
                                        <th className={recommendedTier === 'growth' ? 'is-recommended' : ''}>Growth</th>
                                        <th className={recommendedTier === 'scale' ? 'is-recommended' : ''}>Scale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matrixSections.map((section) => (
                                        <React.Fragment key={section.title}>
                                            <tr className="section-header">
                                                <td colSpan={4}>{section.title}</td>
                                            </tr>
                                            {section.rows.map((row) => (
                                                <tr key={row.feature}>
                                                    <td className="col-feature">{row.feature}</td>
                                                    <td><CellValue value={row.starter} /></td>
                                                    <td><CellValue value={row.growth} /></td>
                                                    <td><CellValue value={row.scale} /></td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* WHY WE TIE OUR PRICING TO YOUR RESULTS — Brief Sec 1.8 */}
                <section className="pp-why-tie">
                    <div className="container pp-why-tie-inner">
                        <h2>Why we tie our pricing to your results.</h2>
                        <p>
                            Our pricing has two parts. A monthly retainer covers the AI infrastructure, your dedicated voice
                            agents, integrations, and ongoing support. A per-booking fee is collected each time we place a
                            qualified meeting on your calendar.
                        </p>
                        <p>
                            This structure means the majority of what you pay is tied directly to measurable outcomes. If we
                            deliver more qualified bookings, we both earn more. If we book fewer, you pay less.
                        </p>
                        <p>
                            We built it this way because we believe in the system we have built. Our booking rates on cold
                            leads run 17 to 25%. Our agents respond to new enquiries in under 5 seconds. We have been running
                            in production for over 6 months with consistent results.
                        </p>
                        <p className="pp-why-tie-close">
                            Performance-based pricing is our commitment to earning your business every single month.
                        </p>
                    </div>
                </section>

                {/* PILOT CALLOUT */}
                <section className="pp-pilot">
                    <div className="container">
                        <div className="pp-pilot-box">
                            <h2>Not sure? Start with a 30-Day Pilot.</h2>
                            <p>Talk to our AI voice specialist about a pilot. Full features, performance-based pricing from day one. Cancel anytime.</p>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => {
                                    track('tier_card_click', { cta: 'pilot', source: 'pilot_section' });
                                    openCalendly(undefined, 'pricing-pilot-section');
                                }}
                            >
                                Book a Pilot Call
                            </button>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="pp-final-cta">
                    <div className="container pp-final-inner">
                        <h2>See your recommended plan in 30 seconds.</h2>
                        <button type="button" className="btn-primary" onClick={() => setCalcOpen(true)}>
                            See Your Recommended Plan
                        </button>
                        <p className="pp-final-or">
                            Or{' '}
                            <button
                                type="button"
                                className="pp-text-link"
                                onClick={() => openCalendly(undefined, 'pricing-final-cta')}
                            >
                                book a demo directly with our AI voice specialist
                            </button>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
            {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
        </>
    );
}
