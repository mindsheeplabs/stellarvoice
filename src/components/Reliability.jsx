import React from 'react';
import './Reliability.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Cpu, FlaskConical, LineChart, Wrench } from 'lucide-react';

// "Reliability is the product." — the differentiator section (Aug 2026).
// Names the foundation-model brands deliberately (ingredient-brand trust
// signal per David); the operational wiring (telephony, CRM, infra) stays
// off the site as always. Claims are first-person and defensible: we built
// our own testing/simulation platform because nothing off the shelf met our
// bar. House style: no em/en dashes.
const PILLARS = [
    {
        Icon: Cpu,
        title: 'Best-in-class AI, orchestrated in-house',
        body: 'We build on the strongest AI available today: Google Gemini, OpenAI\'s ChatGPT models and ElevenLabs voices. Our own platform orchestrates them into one dependable agent, and when a better model ships, your agent gets it.'
    },
    {
        Icon: FlaskConical,
        title: 'A testing and simulation system like no other',
        body: 'We built our own state-of-the-art testing and simulation platform because nothing off the shelf met our bar for reliability. Every agent runs hundreds of simulated conversations, objections, edge cases and guardrail probes before it ever speaks to a real lead.'
    },
    {
        Icon: LineChart,
        title: 'Every call makes it better',
        body: 'Every conversation is recorded, transcribed and scored, and we use it to keep improving your agent over time. Reliability is not a launch-day feature. It compounds.'
    },
    {
        Icon: Wrench,
        title: 'Built end to end, in-house',
        body: 'Our platform is our own. When something needs to be better, we change it that day, not when a vendor\'s roadmap allows. That is how the agents stay fast, accurate and dependable at scale.'
    }
];

export default function Reliability() {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="reliability" className="rel-section">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <p className="rel-eyebrow">What sets us apart</p>
                    <h2 className="rel-title">Reliability is the product.</h2>
                    <p className="rel-sub">
                        Anyone can demo an AI agent. Making one dependable enough to represent your business on
                        every call is the hard part, and it is exactly where we have invested.
                    </p>
                </div>
                <div className="rel-grid" ref={gridRef}>
                    {PILLARS.map((p) => (
                        <div key={p.title} className="rel-card reveal-card">
                            <div className="rel-icon"><p.Icon size={24} strokeWidth={1.75} /></div>
                            <h3>{p.title}</h3>
                            <p>{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
