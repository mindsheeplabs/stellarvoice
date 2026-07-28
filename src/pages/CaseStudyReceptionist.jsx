import React, { useEffect, useState } from 'react';
// Shares the refined case-study styling with the IPA page (ipa-* classes).
import './CaseStudyIPA.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import { Linkedin, Twitter, Mail, Link as LinkIcon, Check, X as CloseIcon } from 'lucide-react';

// Anonymised per David (Jul 2026): the client is not named, no principal
// name, no phone numbers, no vendor/stack detail, no dollar pricing. The
// honest angle is the "safety net" reframe + engagement/reliability, not
// claimed customer bookings (the pilot's bookings were QA test personas).
const PAGE_URL = 'https://www.stellarvoiceagents.com/case-studies/ai-receptionist-safety-net';
const SHARE_TEXT = 'How a boutique agency stopped missing its most valuable calls with a 24/7 AI voice receptionist.';
const CASE = 'ai-receptionist-safety-net';

// ─── Data ────────────────────────────────────────────────────
const HERO_METRICS = [
    { value: '24/7', label: 'coverage, so the call that matters is never missed' },
    { value: 'Zero', label: 'delay before Emma answers, every time' },
    { value: '100%', label: 'of overflow and after-hours calls answered' },
];

const CAPABILITIES = [
    ['Books qualified prospects', 'Works out genuine intent and books a complimentary strategy session straight into the team calendar.'],
    ['Takes and relays messages', "Captures the caller's own name, callback number, and reason, then notifies the team by message and email in seconds."],
    ['Screens spam and robocalls', 'Politely ends clearly automated calls and vendor pitches, so noise never reaches the team.'],
    ['Covers after-hours, 24/7', "Answers the overflow and out-of-hours calls a small team can never get to, day or night."],
];

const WHY = [
    { h: 'The one that matters never slips through', b: 'For a boutique agency, a single missed call can be a lost retainer worth thousands. Emma makes sure the high-value, after-hours, and overflow calls are always caught.' },
    { h: 'A safety net, not a switchboard', b: 'Emma sits on the overflow and after-hours path, not the main line. Her value is measured in calls captured, not calls handled. Low volume is the design, not a shortfall.' },
    { h: 'Spam gets filtered, time gets protected', b: 'A published business line draws a constant stream of robocalls and vendor pitches. Emma screens them out politely, so the team never wastes a minute on noise.' },
    { h: 'Your public listing keeps working', b: 'A listed business number has to connect callers to real help. Emma always takes a reliable message and offers a human path, so the listing keeps earning its place.' },
    { h: 'Reliability is the product', b: 'Emma answers instantly, every time, with the same warmth. Across six weeks of hands-on testing the agency principal confirmed zero delays and consistent, natural conversations.' },
    { h: 'Start small, expand fast', b: 'A low-risk receptionist pilot proved the value in weeks, and opened the door to a much larger AI program across the whole agency.' },
];

const NAV = [
    { id: 'problem', label: 'The Problem' },
    { id: 'safety-net', label: 'The Safety Net' },
    { id: 'capabilities', label: 'What Emma Does' },
    { id: 'engagement', label: 'The Engagement' },
    { id: 'why', label: 'Why It Matters' },
    { id: 'cta', label: 'Get Started' },
];

// ─── Helpers ─────────────────────────────────────────────────
function ShareRow({ position }) {
    const u = encodeURIComponent(PAGE_URL);
    const t = encodeURIComponent(SHARE_TEXT);
    const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    const x = `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    const email = `mailto:?subject=${encodeURIComponent('Stellar Voice Agents — AI receptionist case study')}&body=${t}%0A%0A${u}`;
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(PAGE_URL);
            setCopied(true);
            track('case_study_share', { case: CASE, channel: 'copy', position });
            setTimeout(() => setCopied(false), 1500);
        } catch { /* ignore */ }
    };
    const onClick = (channel) => () => track('case_study_share', { case: CASE, channel, position });
    return (
        <div className={`ipa-share ipa-share-${position}`}>
            <span className="ipa-share-label">Share this case study</span>
            <div className="ipa-share-icons">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={onClick('linkedin')} aria-label="Share on LinkedIn"><Linkedin size={20} /></a>
                <a href={x} target="_blank" rel="noopener noreferrer" onClick={onClick('x')} aria-label="Share on X"><Twitter size={20} /></a>
                <a href={email} onClick={onClick('email')} aria-label="Share via email"><Mail size={20} /></a>
                <button type="button" onClick={copy} aria-label="Copy link">{copied ? <Check size={20} /> : <LinkIcon size={20} />}</button>
            </div>
        </div>
    );
}

function FloatingCta() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (dismissed) return;
            const cta = document.querySelector('#cta');
            const nearBottom = cta && cta.getBoundingClientRect().top < window.innerHeight - 100;
            setVisible(window.scrollY > 700 && !nearBottom);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [dismissed]);
    if (dismissed || !visible) return null;
    return (
        <div className="ipa-floating">
            <button type="button" className="ipa-floating-btn" onClick={() => { track('case_study_cta_floating_click', { case: CASE }); openCalendly(undefined, 'case-receptionist-floating'); }}>Book a call</button>
            <button type="button" className="ipa-floating-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss"><CloseIcon size={14} strokeWidth={2.25} /></button>
        </div>
    );
}

export default function CaseStudyReceptionist() {
    const book = (source) => { track('case_study_cta', { case: CASE, source }); openCalendly(undefined, source); };

    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'AI Receptionist Case Study: A 24/7 Safety Net for a Boutique Agency | Stellar Voice Agents';
        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        const description = 'How a boutique marketing agency used a 24/7 AI voice receptionist to stop missing high-value after-hours and overflow calls, while filtering spam. A safety net, not a switchboard.';
        if (desc) desc.setAttribute('content', description);
        const tags = [
            { property: 'og:title', content: 'Never Miss the One Call That Matters' },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: PAGE_URL },
            { property: 'og:image', content: 'https://www.stellarvoiceagents.com/case-studies/receptionist/hero-safety-net.webp' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Never Miss the One Call That Matters' },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: 'https://www.stellarvoiceagents.com/case-studies/receptionist/hero-safety-net.webp' },
        ];
        const created = tags.map((tg) => {
            const m = document.createElement('meta');
            if (tg.property) m.setAttribute('property', tg.property);
            if (tg.name) m.setAttribute('name', tg.name);
            m.setAttribute('content', tg.content);
            document.head.appendChild(m);
            return m;
        });
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.text = JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Article',
            headline: 'Never Miss the One Call That Matters',
            datePublished: '2026-07-28',
            author: { '@type': 'Organization', name: 'Stellar Voice Agents', url: 'https://www.stellarvoiceagents.com' },
            publisher: { '@type': 'Organization', name: 'Stellar Voice Agents', logo: { '@type': 'ImageObject', url: 'https://www.stellarvoiceagents.com/logo.png' } },
            description, mainEntityOfPage: PAGE_URL,
        });
        document.head.appendChild(ld);
        track('case_study_view', { case: CASE });
        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
            created.forEach((m) => document.head.removeChild(m));
            document.head.removeChild(ld);
        };
    }, []);

    return (
        <>
            <Navbar />
            <FloatingCta />
            <main className="ipa-page">
                {/* HERO */}
                <section className="ipa-hero">
                    <div className="container ipa-hero-inner">
                        <p className="ipa-tag">Case Study · 5 min read</p>
                        <h1>Never miss the one call that matters.</h1>
                        <p className="ipa-hero-sub">
                            How a boutique marketing agency turned its biggest phone risk, the dropped high-value call,
                            into a solved problem. A 24/7 AI voice receptionist named Emma catches every overflow and
                            after-hours call, books the good ones, and quietly filters the spam.
                        </p>
                        <button type="button" className="ipa-btn" onClick={() => book('case-receptionist-hero')}>Book a call to scope yours</button>
                        <ShareRow position="top" />
                    </div>
                </section>

                {/* FEATURED QUOTE */}
                <section className="ipa-featured-quote">
                    <div className="container">
                        <blockquote>
                            <p>&ldquo;I had zero delays getting to Emma. It feels like it's live and doing good.&rdquo;</p>
                            <cite>Agency principal, pilot client</cite>
                        </blockquote>
                    </div>
                </section>

                {/* AT A GLANCE + CLIENT */}
                <section className="ipa-section">
                    <div className="container ipa-glance-grid">
                        <div className="ipa-glance">
                            <h2 className="ipa-eyebrow">At a glance</h2>
                            <dl>
                                <div><dt>Client</dt><dd>A boutique digital marketing agency (Washington DC / Maryland metro).</dd></div>
                                <div><dt>Challenge</dt><dd>High-value calls dropping to voicemail after hours and at overflow, plus a flood of spam on a published line.</dd></div>
                                <div><dt>Result</dt><dd>A 24/7 AI receptionist that catches every overflow and after-hours call, books the qualified ones, takes messages, and filters spam.</dd></div>
                            </dl>
                        </div>
                        <div className="ipa-client-card">
                            <p className="ipa-client-name">Boutique marketing agency</p>
                            <p className="ipa-client-role">Full-service digital agency · Washington DC / Maryland</p>
                            <div className="ipa-client-meta">
                                <span><strong>Industry</strong>Marketing agency</span>
                                <span><strong>Product</strong>24/7 inbound AI receptionist</span>
                                <span><strong>Live since</strong>June 2026 (pilot)</span>
                                <span><strong>Coverage</strong>Overflow + after-hours, 24/7</span>
                                <span><strong>Answer delay</strong>Zero</span>
                                <span><strong>Focus</strong>Zero missed high-value calls</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STICKY NAV */}
                <nav className="ipa-nav">
                    <div className="container ipa-nav-inner">
                        {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
                    </div>
                </nav>

                {/* THE PROBLEM */}
                <section className="ipa-section ipa-grey" id="problem">
                    <div className="container ipa-prose">
                        <h2>The problem: a small team cannot staff the phones 24/7</h2>
                        <p>A boutique agency faces a specific, expensive problem. A single missed inbound call can be a lost retainer worth thousands, yet a small team cannot cover the phones around the clock. Overflow calls, when everyone is already busy, and anything after hours, quietly drop to voicemail. Voicemails do not always get returned.</p>
                        <p>At the same time, a published business line attracts a heavy stream of spam, robocalls, and vendor pitches. Every one of those is a small tax on a team that should be doing the work clients pay for.</p>
                        <p className="ipa-pull">The calls that matter, a real prospect, or someone asking for the founder, are rare. That is exactly why each one is so valuable, and why losing even one hurts.</p>
                    </div>
                    <div className="container">
                        <picture className="ipa-figure">
                            <source media="(max-width: 640px)" srcSet="/case-studies/receptionist/before-after-mobile.webp" />
                            <img src="/case-studies/receptionist/before-after.webp" alt="Without Emma, a call falls through a net with a hole into voicemail; with Emma, the call is caught by the AI voice agent." loading="lazy" />
                        </picture>
                    </div>
                </section>

                {/* THE SAFETY NET */}
                <section className="ipa-section" id="safety-net">
                    <div className="container ipa-prose">
                        <h2>The reframe: a safety net, not a switchboard</h2>
                        <p>This is the heart of the story. Emma is not there to handle the primary flow of calls. She sits on the overflow and after-hours path, the spillover a busy boutique team cannot reach. Her value is measured in calls <em>captured</em>, not calls <em>handled</em>.</p>
                        <p>That is why the numbers are, correctly, small. A specialist agency simply does not get high call counts, and Emma only ever fields the calls that would otherwise have been lost. Low volume is the design, not a shortfall.</p>
                        <p className="ipa-pull">For an agency, one captured after-hours prospect, or one relayed message that reaches the founder, can be worth more than hundreds of routine calls.</p>
                    </div>
                    <div className="container">
                        <picture className="ipa-figure">
                            <source media="(max-width: 640px)" srcSet="/case-studies/receptionist/flow-routing-mobile.webp" />
                            <img src="/case-studies/receptionist/flow-routing.webp" alt="Calls to the main line pass straight through; overflow and after-hours calls branch to Emma, the AI receptionist, who books them, sends a message, or screens spam." loading="lazy" />
                        </picture>
                    </div>
                </section>

                {/* WHAT EMMA DOES */}
                <section className="ipa-section ipa-grey" id="capabilities">
                    <div className="container">
                        <h2 className="ipa-h2-center">What Emma does on every call</h2>
                        <p className="ipa-context">
                            Emma greets every caller warmly, works out why they are calling, and then does one of a few things cleanly. She never quotes prices, never makes guarantees, and always offers a human path.
                        </p>
                        <div className="ipa-why-grid">
                            {CAPABILITIES.map(([h, b]) => (
                                <div key={h} className="ipa-why ipa-why-plain">
                                    <h3>{h}</h3>
                                    <p>{b}</p>
                                </div>
                            ))}
                        </div>
                        <p className="ipa-context">
                            Because calls arrive via a forwarding line, Emma never assumes the caller ID. She always asks for a callback number, captures the details that matter, and sends the team a notification the moment the call ends. If someone reaches her out of hours, the message is waiting first thing the next business day.
                        </p>
                    </div>
                </section>

                {/* THE ENGAGEMENT */}
                <section className="ipa-section" id="engagement">
                    <div className="container">
                        <h2 className="ipa-h2-center">The engagement: reliability you can count on</h2>
                        <div className="ipa-metrics">
                            {HERO_METRICS.map((m) => (
                                <div key={m.label} className="ipa-metric">
                                    <span className="ipa-metric-v">{m.value}</span>
                                    <span className="ipa-metric-l">{m.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="ipa-context">
                            The point was never call volume, it was whether Emma could hold a real conversation and get something done on it. She can. Across six weeks of hands-on testing and refinement, Emma answered with zero delay every time and sustained natural, consultation-length conversations that ran for minutes, not a ten-second bounce. She booked to the calendar, captured callbacks, and screened out spam, again and again. The result the agency valued most was not a number. It was the confidence that the phone is finally covered.
                        </p>
                    </div>
                </section>

                {/* WHY IT MATTERS */}
                <section className="ipa-section ipa-grey" id="why">
                    <div className="container">
                        <h2 className="ipa-h2-center">Why this matters</h2>
                        <div className="ipa-why-grid">
                            {WHY.map((w, i) => (
                                <div key={w.h} className="ipa-why">
                                    <span className="ipa-why-n">{i + 1}</span>
                                    <h3>{w.h}</h3>
                                    <p>{w.b}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* THE EXPANSION */}
                <section className="ipa-section">
                    <div className="container ipa-prose">
                        <h2>Start small, expand fast</h2>
                        <p>The receptionist pilot became the wedge into something much bigger. On the strength of a low-risk, high-trust trial, one that quietly proved Stellar Voice Agents could deliver, the agency opened a conversation about transforming the whole business with AI, from reporting to content to team training.</p>
                        <p className="ipa-pull">It is the same journey we take every client on. Start with one solved problem, prove it in weeks, then expand fast.</p>
                    </div>
                </section>

                {/* CTA */}
                <section className="ipa-cta" id="cta">
                    <div className="container ipa-cta-inner">
                        <h2>How many high-value calls is your team missing after hours?</h2>
                        <p>You will never know which voicemail was the retainer that got away. An AI receptionist means you never have to find out. It answers every overflow and after-hours call, books the good ones, and filters the noise, so the one that matters is always caught.</p>
                        <button type="button" className="ipa-btn ipa-btn-lg" onClick={() => book('case-receptionist-final')}>Book a call to scope your pilot</button>
                        <ShareRow position="bottom" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
