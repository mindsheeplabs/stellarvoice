import React from 'react';
import './Products.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';
import { Bot, Zap, PhoneOutgoing } from 'lucide-react';
import { openCalendly } from '../lib/calendly';

// Order: outbound products first (Outbound Sales Qualifier, Dead Lead
// Reactivation), then the inbound Inbound Sales Qualifier. The outbound
// products are the ones with current pricing tiers on /pricing; the inbound
// product's tier structure is being scoped separately.
const products = [
    {
        name: 'Outbound Sales Qualifier',
        tagline: 'Instant lead response. Seconds, not hours.',
        Icon: Zap,
        features: [
            'The moment someone responds to your ad, we call them',
            'No answer? The same AI follows up by text or WhatsApp',
            'Qualifies them on the call against your criteria',
            'Books them into your calendar before they shop around'
        ],
        color: '#7868F8'
    },
    {
        name: 'Dead Lead Reactivation',
        tagline: 'Your old database, worth real money again.',
        Icon: PhoneOutgoing,
        features: [
            'We call your aged-lead database on your behalf',
            'Identifies who\'s ready to move, now',
            'Works the list by call, text and WhatsApp until they respond',
            'Puts re-activated prospects back on your calendar'
        ],
        color: '#473D92'
    },
    {
        name: 'Inbound Sales Qualifier',
        tagline: 'Inbound calls answered, qualified, and booked. 24/7.',
        Icon: Bot,
        features: [
            'Answers every inbound call instantly, day or night',
            'Qualifies each caller against your custom script',
            'Books qualified prospects directly into your calendar',
            'Every call recorded, transcribed, and scored'
        ],
        color: '#25005D'
    }
];

const Products = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="products" className="products-section bg-alt bg-glow">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title">Our Products</h2>
                    <p className="section-subtitle">Three AI products, voice first with text and WhatsApp follow-up built in. One goal: make sure you never lose a lead to slow response time again.</p>
                </div>
                <div className="products-grid" ref={gridRef}>
                    {products.map((product, index) => (
                        <div key={index} className="product-card glass-card reveal-card" style={{'--card-accent': product.color}}>
                            <div className="product-icon-wrap" style={{background: `${product.color}15`}}>
                                <product.Icon size={28} strokeWidth={1.75} color={product.color} />
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-pricing-signal">Low monthly retainer + you pay per qualified booking</p>
                            <p className="product-tagline">{product.tagline}</p>
                            <ul className="product-features">
                                {product.features.map((feature, i) => (
                                    <li key={i}><span className="check">✓</span> {feature}</li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => openCalendly(undefined, `products-${product.name}`)} className="product-cta">Learn More →</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
