import React from 'react';
import { Link } from 'react-router-dom';
import './MultiChannel.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Phone, MessageSquare, MessageCircle, Globe } from 'lucide-react';

// "One brain. Every channel." — the multi-channel repositioning section
// (Aug 2026 blueprint). Voice stays the flagship; text and WhatsApp are the
// follow-up channels (picked per lead by country); the website chat widget is
// deliberately a quiet single line, not a headline feature. Shown on the
// homepage and on /how-it-works. House style: no em/en dashes, numerals.
const CHANNELS = [
    {
        Icon: Phone,
        name: 'AI Voice',
        tag: 'The flagship',
        body: 'Calls new leads in seconds, sounds genuinely human, qualifies against your criteria and books the meeting on the call.',
        featured: true
    },
    {
        Icon: MessageSquare,
        name: 'AI Text',
        tag: 'The follow-up',
        body: 'When a call goes unanswered, the same agent follows up by SMS and holds a real two-way conversation until the lead is qualified and booked.'
    },
    {
        Icon: MessageCircle,
        name: 'AI WhatsApp',
        tag: 'The global channel',
        body: 'For markets that live on WhatsApp. The system automatically chooses text or WhatsApp based on the lead\'s country.'
    }
];

const FLOW = [
    { label: 'New lead', sub: 'Ad response, form fill or aged list' },
    { label: 'Voice call in seconds', sub: 'Answered? Qualified and booked', hub: true },
    { label: 'Text or WhatsApp follow-up', sub: 'Chosen by the lead\'s country' },
    { label: 'Qualified and booked', sub: 'On your calendar, with the full record' }
];

export default function MultiChannel() {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="multichannel" className="mc-section">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">One brain. Every channel.</h2>
                    <p className="section-subtitle">
                        We build one AI agent, one prompt and one strategy for your goal, then run it everywhere.
                        Whether your lead talks to it, texts it or messages it on WhatsApp, it is the same intelligence
                        driving the same conversation toward the same booking.
                    </p>
                </div>

                <div className="mc-channels" ref={gridRef}>
                    {CHANNELS.map((c) => (
                        <div key={c.name} className={`mc-channel reveal-card${c.featured ? ' mc-featured' : ''}`}>
                            <div className="mc-channel-icon"><c.Icon size={c.featured ? 30 : 24} strokeWidth={1.75} /></div>
                            <span className="mc-channel-tag">{c.tag}</span>
                            <h3>{c.name}</h3>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </div>
                <p className="mc-chat-note">
                    <Globe size={15} strokeWidth={2} aria-hidden="true" />
                    The same agent can also run as a chat widget on your website, feeding the exact same qualify and book flow.
                </p>

                <div className="mc-flow" aria-label="How the cadence works">
                    {FLOW.map((s, i) => (
                        <React.Fragment key={s.label}>
                            {i > 0 && <span className="mc-flow-arrow" aria-hidden="true" />}
                            <div className={`mc-flow-step${s.hub ? ' mc-flow-hub' : ''}`}>
                                <span className="mc-flow-label">{s.label}</span>
                                <span className="mc-flow-sub">{s.sub}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <p className="mc-flow-caption">
                    Voice stays the closer. When a lead re-engages by message, the agent loops back to a call.
                    No disconnected chatbot that forgets what the caller already said. No separate SMS tool with its
                    own clunky script. Consistent tone, consistent qualifying logic, consistent outcome.
                </p>

                <div className="mc-proof">
                    <Link to="/case-studies/ipa-lead-reactivation" className="mc-proof-card">
                        <span className="mc-proof-tag">Voice + AI text, live</span>
                        <p>International Property Alerts started on voice. The same intelligence runs AI text for them today.</p>
                        <span className="mc-proof-cta">Read the case study &rarr;</span>
                    </Link>
                    <Link to="/case-studies/ai-receptionist-safety-net" className="mc-proof-card">
                        <span className="mc-proof-tag">24/7 inbound, live</span>
                        <p>Emma answers a boutique agency's overflow and after-hours calls so the one that matters is never missed.</p>
                        <span className="mc-proof-cta">Read the case study &rarr;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
