import React from 'react';
import './Features.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { TrendingUp, Target, MessageSquare, Eye, Mic, Rocket } from 'lucide-react';

// Brief Sec 3.13: tile 1 renamed to Performance-Based Pricing (lead),
// tile 2 renamed to Focused on Sales Qualification, rest unchanged.
const features = [
    {
        title: 'Performance-Based Pricing',
        description: 'You pay a low monthly retainer plus a fee per qualified booking. The bulk of what you pay only kicks in when we deliver results. Clear, predictable pricing tied to results.',
        Icon: TrendingUp
    },
    {
        title: 'Sales Qualification Experts',
        description: 'We have built voice agents for sales qualification across real estate, solar, insurance, healthcare, and more. We know which questions qualify a real buyer and which book the meeting. That expertise is why we outperform generalist platforms.',
        Icon: Target
    },
    { title: 'Real Objection Handling', description: "Our agents don't just read scripts. They pivot, handle pushback, and keep the conversation moving toward a booking.", Icon: MessageSquare },
    { title: 'Full Transparency', description: 'Every call recorded, transcribed, and scored. We use it to keep improving your agent over time.', Icon: Eye },
    { title: 'Human-Sounding Voice', description: 'Natural voices that adapt tone and intent. Most callers cannot tell they are talking to an AI.', Icon: Mic },
    { title: 'Live in 5-7 Days', description: 'Most agencies take weeks. We go from kickoff to live calls in under a week.', Icon: Rocket }
];

const Features = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">What Makes Stellar Different</h2>
                </div>
                <div className="features-grid" ref={gridRef}>
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card reveal-card">
                            <div className="feature-icon-wrap">
                                <feature.Icon size={24} strokeWidth={1.75} color="var(--electric-violet)" />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
