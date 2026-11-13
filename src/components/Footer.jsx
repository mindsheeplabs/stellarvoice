import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { openCalendly } from '../lib/calendly';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src="/footer-logo.png" alt="Stellar Voice Agents" style={{ height: '36px', marginBottom: '12px' }} />
                        <p>AI voice agents that call, qualify, and book appointments 24/7 for lead-driven businesses.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/how-it-works">How It Works</Link></li>
                            <li><Link to="/appointment-engine">Appointment Engine</Link></li>
                            <li><Link to="/case-studies">Case Studies</Link></li>
                            <li><Link to="/blog">Insights</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                    <div className="footer-products">
                        <h4>Products</h4>
                        <ul>
                            <li><Link to="/how-it-works">Outbound Sales Qualifier</Link></li>
                            <li><Link to="/how-it-works">Dead Lead Reactivation</Link></li>
                            <li><Link to="/how-it-works">Inbound Sales Qualifier</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Get In Touch</h4>
                        <p>Email: <a href="mailto:gary@stellarvoiceagents.com" style={{ color: 'inherit' }}>gary@stellarvoiceagents.com</a></p>
                        <button type="button" onClick={() => openCalendly(undefined, 'footer')} className="btn-primary small" style={{ marginTop: '12px' }}>Book a Call</button>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Stellar Voice Agents LLC, a United States company. 30 N Gould St, Ste R, Sheridan, WY 82801. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
