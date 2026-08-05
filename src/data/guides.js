// Source of truth for the downloadable SVA industry guides (lead magnets).
// Each guide is a PDF served from the site root at /guides/<slug>.pdf.
// (No em/en-dashes in user-facing copy per the site style rule.)

export const GUIDES = {
    'real-estate': {
        slug: 'real-estate',
        industry: 'Real Estate',
        title: 'The Speed-to-Lead Playbook for Real Estate',
        blurb: 'How the fastest-responding agents win more listings and buyers, and how to answer every enquiry in under 60 seconds.',
        pdf: '/guides/real-estate.pdf'
    },
    'healthcare': {
        slug: 'healthcare',
        industry: 'Healthcare',
        title: 'The Healthcare Practice Guide to AI Voice Agents',
        blurb: 'Fill more appointment slots and stop losing patients to voicemail and the after-hours gap.',
        pdf: '/guides/healthcare.pdf'
    },
    'finance': {
        slug: 'finance',
        industry: 'Financial Services',
        title: 'Speed Wins in Finance',
        blurb: 'Why the first advisor to call back wins the client, and how to make sure that is always you.',
        pdf: '/guides/finance.pdf'
    },
    'home-services': {
        slug: 'home-services',
        industry: 'Home Services',
        title: 'Never Miss Another Call',
        blurb: 'For trades, solar, and home services: turn every missed call into a booked job, day or night.',
        pdf: '/guides/home-services.pdf'
    },
    'marketing-agencies': {
        slug: 'marketing-agencies',
        industry: 'Marketing Agencies',
        title: 'The Agency Revenue Gap',
        blurb: 'Close the gap between the leads you deliver and the revenue your clients actually capture.',
        pdf: '/guides/marketing-agencies.pdf'
    },
    'hospitality': {
        slug: 'hospitality',
        industry: 'Hospitality',
        title: 'The Hospitality Phone Gap',
        blurb: 'Capture every booking and enquiry, even when every line is busy and the front desk is slammed.',
        pdf: '/guides/hospitality.pdf'
    }
};

// The industry picker shown to visitors. Each entry maps to a guide slug.
// Solar folds into the Home Services guide (per David: select Solar, get Home).
// Insurance and Legal are retired (no guide).
export const GUIDE_INDUSTRIES = [
    { id: 'real-estate', label: 'Real Estate', icon: '🏠', guide: 'real-estate' },
    // Hotels folds into the Hospitality guide (front desk, bookings, busy lines).
    { id: 'hotels', label: 'Hotels', icon: '🏨', guide: 'hospitality' },
    { id: 'solar', label: 'Solar', icon: '☀️', guide: 'home-services' },
    { id: 'home-services', label: 'Home Services & Trades', icon: '🔧', guide: 'home-services' },
    { id: 'healthcare', label: 'Healthcare', icon: '🩺', guide: 'healthcare' },
    { id: 'finance', label: 'Finance', icon: '📈', guide: 'finance' },
    { id: 'marketing-agencies', label: 'Marketing Agency', icon: '📣', guide: 'marketing-agencies' },
    { id: 'hospitality', label: 'Hospitality', icon: '🍽️', guide: 'hospitality' }
];

// Map a quiz `industry` answer (questions.js option id) to a guide slug, so the
// post-quiz CTA can pre-select the right guide. null = let the visitor pick.
export const QUIZ_INDUSTRY_TO_GUIDE = {
    realEstate: 'real-estate',
    hotels: 'hospitality',
    health: 'healthcare',
    finance: 'finance',
    trades: 'home-services',
    auto: 'home-services',
    professional: 'marketing-agencies',
    other: null
};

export function getGuide(slug) {
    return GUIDES[slug] ?? null;
}

export function guideForIndustryId(industryId) {
    const entry = GUIDE_INDUSTRIES.find((i) => i.id === industryId);
    return entry ? GUIDES[entry.guide] : null;
}
