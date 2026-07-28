import React from 'react';
import './HowItWorks.css';

const steps = [
    { number: '01', title: 'Connect', description: 'We integrate with your existing systems: website forms, CRM, Google and Meta Ads, and phone lines. Setup takes just 5-7 business days.' },
    { number: '02', title: 'Configure', description: 'We train your AI voice agent on your business, scripts, qualification questions, and objection handling. You choose the voice persona.' },
    { number: '03', title: 'Convert', description: 'Your AI agent goes live: calling, qualifying, and booking appointments 24/7. You get real-time analytics and recorded calls.' }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-section">
            <div className="container">
                <h2 className="section-title text-gradient">How It Works</h2>
                <p className="section-subtitle">Go from zero to fully automated lead engagement in three simple steps.</p>
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
                {/* Brief Sec 3.12: pricing tagline below the three steps. */}
                <p className="how-results-tagline">
                    <strong>You only pay for results.</strong> Every qualified booking lands on your calendar.
                    Every call is recorded, transcribed, and scored, and used to keep improving your agent.
                </p>
            </div>
        </section>
    );
};

export default HowItWorks;
