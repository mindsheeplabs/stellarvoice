import React from 'react';
import './CTABanner.css';
import useScrollReveal from '../hooks/useScrollReveal';
import { openCalendly } from '../lib/calendly';

// Brief Sec 3.18: trust signal line between headline and buttons.
const CTABanner = () => {
    const ref = useScrollReveal();
    return (
        <section className="cta-banner-section">
            <div className="container cta-banner-content reveal" ref={ref}>
                <h2>Never lose another lead.</h2>
                <p>
                    Book a 30-minute demo with our AI voice specialist and hear exactly how AI voice agents
                    can engage, qualify, and book appointments for your team. 24/7.
                </p>
                <p className="cta-banner-trust">
                    AI receptionist plans from $297 a month. No charge per minute.
                </p>
                <div className="cta-banner-buttons">
                    <button type="button" onClick={() => openCalendly(undefined, 'cta-banner')} className="btn-primary">Book a Demo</button>
                    <a href="#demos" className="btn-secondary">Hear a Live Call</a>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
