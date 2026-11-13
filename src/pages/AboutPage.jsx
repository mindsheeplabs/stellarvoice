import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/Team';
import WhyDifferent from '../components/WhyDifferent';
import CTABanner from '../components/CTABanner';
import './AboutPage.css';

// /about — "Our Story"
// Per the May 31 Developer Brief Sec 3.23. Brings together the founder
// origin story, the team bios, and the WhyDifferent values that were
// previously scattered or only on the homepage.
export default function AboutPage() {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = 'About Us: The Team Behind the Agents | Stellar Voice Agents';
        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc?.getAttribute('content');
        if (desc) desc.setAttribute('content', 'Meet the founders behind Stellar Voice Agents: a sales veteran and a systems builder shipping AI voice agents that book real meetings every day.');
        return () => {
            document.title = prevTitle;
            if (desc && prevDesc) desc.setAttribute('content', prevDesc);
        };
    }, []);
    return (
        <>
            <Navbar />
            <main className="about-page">
                {/* HERO */}
                <section className="ap-hero">
                    <div className="container ap-hero-inner">
                        <p className="ap-hero-eyebrow">Our Story</p>
                        <h1>Built by people who understand sales. Not just AI.</h1>
                        <p className="ap-hero-sub">
                            Two founders, one prototype, one Virginia conference, and a six-month
                            production system that books real meetings every day.
                        </p>
                    </div>
                </section>

                {/* HOW WE MET */}
                <section className="ap-section">
                    <div className="container ap-prose">
                        <h2>How we met</h2>
                        <p>
                            Gary and David met at a cafe. Over the course of that conversation, they kept
                            returning to the same observation: businesses were losing real revenue every day
                            because nobody could respond to inbound leads fast enough. Most of the AI voice
                            tools on the market either sounded robotic, charged regardless of outcome, or
                            could not actually qualify a lead before handing it off.
                        </p>
                        <p>
                            They saw the gap clearly, and they saw a way to fill it. They decided to focus
                            their combined effort on one problem: building voice AI that qualifies leads
                            and books appointments as naturally as a top sales representative does.
                        </p>
                        <p>
                            An initial prototype proved the concept worked. Months of platform development
                            followed. Today, Stellar Voice Agents works with clients across professional
                            verticals to deliver qualified bookings on their calendars every week. The
                            longest-running engagement has been live for six months and counting, with
                            consistent results from the day it went live.
                        </p>
                    </div>
                </section>

                {/* WHY PERFORMANCE PRICING */}
                <section className="ap-section">
                    <div className="container ap-prose">
                        <h2>Why performance pricing on our outbound work</h2>
                        <p>
                            After seeing how other companies in the space priced their services, David and
                            Gary made a decision. If the system works as well as they believe it does, they
                            should be willing to put their revenue on the line.
                        </p>
                        <p>
                            That is why SVA&apos;s outbound and lead reactivation work is paid largely per booking.
                            If SVA does not book qualified meetings, SVA does not get paid. That is how confident
                            they are.
                        </p>
                        <p>
                            The AI receptionist for trades companies is priced differently: one flat monthly
                            price, from $297 a month, with no charge per minute. <a href="/pricing">See pricing</a>.
                        </p>
                        <h2>Where we are</h2>
                        <p>
                            Stellar Voice Agents LLC is a United States company, registered in Wyoming. Our address is
                            30 N Gould St, Ste R, Sheridan, WY 82801. We work with businesses across the United States.
                        </p>
                        <p className="ap-prose-quote">
                            &quot;Any time someone needs to call someone, the AI should be calling them
                            first.&quot;
                            <cite>David Taylor, Co-Founder &amp; CTO</cite>
                        </p>
                    </div>
                </section>

                {/* THE TEAM (existing component) */}
                <Team />

                {/* WHAT WE STAND FOR (WhyDifferent) */}
                <WhyDifferent />

                {/* CTA */}
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
