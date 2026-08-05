// Small teaser sections used on the lean homepage. Each links into a
// dedicated page (/how-it-works, /about, /industries-as-section, /case-studies)
// where the full content lives.

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Hotel, Sun, Stethoscope, DollarSign, Play, Pause } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { track } from '../lib/analytics';
import './HomepageTeasers.css';

// FEATURED DEMO — single real-client audio player + link to all demos.
export function FeaturedDemo() {
    const ref = useScrollReveal();
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) { a.pause(); setPlaying(false); }
        else {
            a.play();
            setPlaying(true);
            track('demo_audio_played', { industry: 'Real Estate', name: 'Easy Start Homes', source: 'homepage_featured' });
        }
    };

    return (
        <section id="demos" className="hpt-featured-demo">
            <div className="container">
                <div ref={ref} className="reveal hpt-fd-inner">
                    <span className="hpt-fd-badge">Real Client Call</span>
                    <h2>Hear a genuine call placed by our AI.</h2>
                    <p className="hpt-fd-sub">
                        This is an outbound call our system made on behalf of EasyStart Homes.
                        Edited for length and privacy. Not a script. Not a demo. A real call.
                    </p>
                    <div className="hpt-fd-card">
                        <button
                            className={`hpt-fd-play ${playing ? 'is-playing' : ''}`}
                            onClick={toggle}
                            aria-label={playing ? 'Pause' : 'Play'}
                        >
                            {playing ? <Pause size={32} strokeWidth={2.25} /> : <Play size={32} strokeWidth={2.25} fill="currentColor" />}
                        </button>
                        <div className="hpt-fd-waveform" aria-hidden="true">
                            {[...Array(28)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`hpt-fd-bar ${playing ? 'is-playing' : ''}`}
                                    style={{
                                        height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%`,
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>
                        <audio ref={audioRef} src="/audio/agent-realestate.mp3" onEnded={() => setPlaying(false)} preload="none" />
                    </div>
                    <Link to="/how-it-works#demos" className="hpt-fd-link">
                        Hear all 6 demos &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}

// APPOINTMENT ENGINE TEASER — flagship done-for-you upsell, links to the
// dedicated /appointment-engine page.
export function AppointmentEngineTeaser() {
    const ref = useScrollReveal();
    return (
        <section className="hpt-ae">
            <div className="container">
                <div ref={ref} className="reveal hpt-ae-card">
                    <p className="hpt-ae-eyebrow">Done-for-you</p>
                    <h2 className="hpt-ae-h">Want the whole funnel handled?</h2>
                    <p className="hpt-ae-sub">
                        The Appointment Engine runs your ads, calls every lead within 30 seconds, and books qualified
                        appointments straight into your calendar. Your team just closes. 2-week pilots from $2,500.
                    </p>
                    <Link to="/appointment-engine" className="hpt-ae-btn" onClick={() => track('homepage_ae_cta')}>
                        Explore the Appointment Engine &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}

// INDUSTRIES STRIP — the high-value verticals we lead with. Insurance + Legal
// retired (no guide); the broader guide library lives at /guides.
const industryItems = [
    { name: 'Real Estate', Icon: Home },
    { name: 'Hotels', Icon: Hotel },
    { name: 'Solar Energy', Icon: Sun },
    { name: 'Healthcare', Icon: Stethoscope },
    { name: 'Finance', Icon: DollarSign }
];

export function IndustriesStrip() {
    const ref = useScrollReveal();
    return (
        <section id="industries" className="hpt-industries">
            <div className="container">
                <div ref={ref} className="reveal hpt-ind-inner">
                    <h2 className="section-title">Built for professional verticals.</h2>
                    <p className="hpt-ind-sub">
                        We focus on industries where one qualified booking is worth thousands.
                    </p>
                    <div className="hpt-ind-grid">
                        {industryItems.map((ind, i) => (
                            <div key={i} className="hpt-ind-item">
                                <ind.Icon size={22} strokeWidth={2} aria-hidden="true" />
                                <span>{ind.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// TEAM TEASER — 2 photos + names + tagline + link to /about.
const team = [
    { name: 'Gary Sarco', role: 'CEO & Founder', image: '/garysarco.jpg' },
    { name: 'David Taylor', role: 'Co-Founder & CTO', image: '/davidtaylor.jpg' }
];

export function TeamTeaser() {
    const ref = useScrollReveal();
    return (
        <section id="team-teaser" className="hpt-team-teaser">
            <div className="container">
                <div ref={ref} className="reveal hpt-tt-inner">
                    <h2 className="section-title text-gradient">Built by people who understand sales.</h2>
                    <div className="hpt-tt-row">
                        {team.map((m, i) => (
                            <div key={i} className="hpt-tt-card">
                                <img src={m.image} alt={m.name} />
                                <div>
                                    <p className="hpt-tt-name">{m.name}</p>
                                    <p className="hpt-tt-role">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/about" className="hpt-tt-link">
                        Read our full story &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}

// FAQ TEASER — 5 most common Qs + link to /about#faq or /faq.
const faqTeaserItems = [
    {
        question: 'Do the AI agents sound robotic?',
        answer: 'No. Our agents respond in under two seconds with natural-sounding voices and real conversational tone. Most callers do not realise they are talking to AI.'
    },
    {
        question: 'What does it cost?',
        answer: 'Our pricing is performance based: a low monthly retainer plus a fee per qualified booking, so the majority of what you pay only kicks in when we deliver. Book a demo and we will scope it for your lead volume.'
    },
    {
        question: 'Which channels do you support?',
        answer: 'Voice is the flagship. The same agent also runs over SMS, WhatsApp and website chat, so a lead who does not answer the phone still gets followed up until they are booked.'
    },
    {
        question: 'How do you choose text vs WhatsApp?',
        answer: 'Automatically, by the lead\'s country. Markets that live on WhatsApp get WhatsApp; everyone else gets SMS. Same agent, same conversation, either way.'
    },
    {
        question: 'How fast can you deploy an agent?',
        answer: 'Standard deployment takes 5 to 7 business days, including training, scripting, and CRM integration.'
    },
    {
        question: 'Does it integrate with my CRM?',
        answer: 'Yes. We integrate with most major CRMs, Google Ads, Meta Ads, and connect via webhooks or Zapier.'
    },
    {
        question: 'What if the AI cannot handle a question?',
        answer: 'Our agents gracefully escalate to a human. You control the handoff rules; the lead never feels abandoned.'
    }
];

export function FAQTeaser() {
    const ref = useScrollReveal();
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <section id="faq" className="hpt-faq-teaser">
            <div className="container">
                <div ref={ref} className="reveal hpt-faq-inner">
                    <h2 className="section-title text-gradient">Questions, answered.</h2>
                    <div className="hpt-faq-list">
                        {faqTeaserItems.map((faq, index) => (
                            <div
                                key={index}
                                className={`hpt-faq-item ${openIndex === index ? 'open' : ''}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <div className="hpt-faq-q">
                                    <h3>{faq.question}</h3>
                                    <span className="hpt-faq-toggle">+</span>
                                </div>
                                <div className="hpt-faq-a"><p>{faq.answer}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
