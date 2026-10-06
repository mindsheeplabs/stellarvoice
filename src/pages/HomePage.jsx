import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuoteBar from '../components/QuoteBar';
import SoundsReal from '../components/SoundsReal';
import { FeaturedDemo, IndustriesStrip, TeamTeaser, FAQTeaser, AppointmentEngineTeaser } from '../components/HomepageTeasers';
import MultiChannel from '../components/MultiChannel';
import Reliability from '../components/Reliability';
import CalculatorCTA from '../components/Calculator/CalculatorCTA';
import Calculator from '../components/Calculator/Calculator';
import LeadMagnet from '../components/Guide/LeadMagnet';
import Products from '../components/Products';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

// Lean homepage (Jun 2026 restructure). Long-form sections moved to
// dedicated pages:
//   - Capabilities, HowItWorks, Features, Demos (full grid) -> /how-it-works
//   - WhyDifferent, Team (full bios), origin story -> /about
//   - Case study cards -> /case-studies
//   - 8-card Industries grid -> compressed to a 6-vertical strip here only
//
// Homepage flow now (Aug 2026 multi-channel repositioning):
//   Hero (voice-first, multi-channel) -> IPA case-study quote (+ read link)
//   -> SoundsReal (voice stays the emotional centre) -> MultiChannel
//   ("one brain, every channel" + cadence) -> FeaturedDemo
//   -> Free guides (lead magnet) -> Revenue quiz CTA -> Products
//   -> Reliability (models + in-house testing) -> Appointment Engine teaser
//   -> Industries strip -> Plan Finder CTA -> Team -> FAQ -> CTABanner
export default function HomePage() {
    const [calcOpen, setCalcOpen] = useState(false);

    // Links can open the quiz straight away: /#quiz (blog CTAs), or the older /?openCalc=1.
    useEffect(() => {
        if (window.location.hash === '#quiz' || new URLSearchParams(window.location.search).has('openCalc')) {
            setCalcOpen(true);
        }
    }, []);

    return (
        <>
            <Navbar onOpenCalculator={() => setCalcOpen(true)} />
            <main>
                <Hero onOpenCalculator={() => setCalcOpen(true)} />
                <QuoteBar />
                <SoundsReal />
                <MultiChannel />
                <FeaturedDemo />
                <LeadMagnet />
                <CalculatorCTA onOpen={() => setCalcOpen(true)} />
                <Products />
                <Reliability />
                <AppointmentEngineTeaser />
                <IndustriesStrip />
                {/* Plan-finder CTA in the former pricing slot.
                    Anchored at #pricing so existing nav links still land here. */}
                <CalculatorCTA
                    id="pricing"
                    onOpen={() => setCalcOpen(true)}
                    eyebrow="Plan Finder"
                    headline="Find the best plan for your business."
                    sub="Answer four quick questions and we will match you to the right plan. Every plan includes performance-based pricing. You pay a low retainer plus a fee per qualified booking."
                    buttonText="Find My Plan →"
                />
                <TeamTeaser />
                <FAQTeaser />
                <CTABanner />
            </main>
            <Footer />
            {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
        </>
    );
}
