import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { openCalendly } from '../lib/calendly';

const Navbar = ({ onOpenCalculator }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const close = () => setMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="/" className="logo" onClick={close}>
                    <img src="/logo.webp" alt="Stellar Voice Agents" className="logo-img" />
                </a>
                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><a href="/#how" onClick={close}>How It Works</a></li>
                    <li><a href="/pricing" onClick={close}>Pricing</a></li>
                    <li><Link to="/case-studies" onClick={close}>Case Studies</Link></li>
                    <li><a href="/resources" onClick={close}>Guides</a></li>
                    <li><Link to="/blog" onClick={close}>Insights</Link></li>
                    <li><Link to="/about" onClick={close}>About</Link></li>
                </ul>
                <div className="nav-cta">
                    {onOpenCalculator ? (
                        <button type="button" onClick={onOpenCalculator} className="btn-primary small">Take the Test</button>
                    ) : (
                        <button type="button" onClick={() => openCalendly(undefined, 'navbar-case-study')} className="btn-primary small">Book a Demo</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
