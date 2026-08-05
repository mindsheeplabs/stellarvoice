// Brand-aligned question tree for the SVA Smart Quiz.
// Source of truth: never hard-code questions inside components.
// (No em-dashes or en-dashes in any user-facing label per the May 2026
// Developer Brief style rule.)

export const QUESTIONS = {
    pain: {
        id: 'pain',
        kind: 'choice',
        prompt: "What's costing you the most right now?",
        helper: 'Pick the one that hurts most.',
        options: [
            { id: 'missed', label: "I'm missing calls and losing potential customers", icon: '📞' },
            { id: 'speed', label: 'Leads are going cold before I can get back to them', icon: '⚡' },
            { id: 'afterHours', label: 'After-hours enquiries are slipping through the cracks', icon: '🌙' },
            { id: 'timeDrain', label: "I'm spending too much time on calls instead of growing", icon: '⏳' }
        ]
    },

    // Branch: MISSED CALLS
    missedVolume: {
        id: 'missedVolume',
        kind: 'choice',
        prompt: 'Roughly how many calls do you miss in an average week?',
        options: [
            { id: 'few', label: '1 to 5 a week', icon: '🙂', meta: { weekly: 3 } },
            { id: 'some', label: '5 to 15 a week', icon: '😐', meta: { weekly: 10 } },
            { id: 'lots', label: '15 to 30 a week', icon: '😬', meta: { weekly: 22 } },
            { id: 'tons', label: '30+ a week', icon: '😱', meta: { weekly: 40 } }
        ]
    },

    // Branch: SPEED-TO-LEAD
    responseTime: {
        id: 'responseTime',
        kind: 'choice',
        prompt: 'How long does it take to call a new lead back?',
        options: [
            { id: 'under5', label: 'Under 5 minutes', icon: '🏎️', meta: { lift: 1.0 } },
            { id: 'under1h', label: 'Within an hour', icon: '🏃', meta: { lift: 1.3 } },
            { id: 'sameDay', label: 'Same day', icon: '🚶', meta: { lift: 1.8 } },
            { id: 'nextDay', label: 'Next day or later', icon: '🐢', meta: { lift: 2.2 } },
            { id: 'patchy', label: "Honestly, it's patchy", icon: '🤷', meta: { lift: 2.0 } }
        ]
    },
    leadVolume: {
        id: 'leadVolume',
        kind: 'choice',
        prompt: 'How many web or form leads come in each month?',
        options: [
            { id: 'xs', label: 'Under 20', meta: { monthly: 10 } },
            { id: 's', label: '20 to 50', meta: { monthly: 35 } },
            { id: 'm', label: '50 to 100', meta: { monthly: 75 } },
            { id: 'l', label: '100+', meta: { monthly: 150 } }
        ]
    },

    // Branch: AFTER-HOURS
    afterHoursChannel: {
        id: 'afterHoursChannel',
        kind: 'choice',
        prompt: 'What kind of after-hours enquiries are you missing?',
        options: [
            { id: 'calls', label: 'Phone calls', icon: '📞' },
            { id: 'forms', label: 'Website forms', icon: '💻' },
            { id: 'both', label: 'Both, honestly', icon: '🤯' }
        ]
    },
    afterHoursConversion: {
        id: 'afterHoursConversion',
        kind: 'choice',
        prompt: 'If you got through first thing the next day, do they still buy?',
        options: [
            { id: 'yes', label: 'Yes, most of them', meta: { retention: 0.7 } },
            { id: 'half', label: 'About half', meta: { retention: 0.45 } },
            { id: 'few', label: 'Only a few, they shop around', meta: { retention: 0.2 } },
            { id: 'unsure', label: 'Not sure', meta: { retention: 0.4 } }
        ]
    },

    // Branch: TIME DRAIN
    callsHandledBy: {
        id: 'callsHandledBy',
        kind: 'choice',
        prompt: 'Who handles the phones today?',
        options: [
            { id: 'me', label: 'Mostly me', icon: '🙋' },
            { id: 'receptionist', label: 'A receptionist or admin', icon: '👩‍💼' },
            { id: 'shared', label: 'Whoever is free', icon: '🤝' },
            { id: 'voicemail', label: 'Voicemail, mostly', icon: '📭' }
        ]
    },
    hoursOnPhone: {
        id: 'hoursOnPhone',
        kind: 'choice',
        prompt: 'How many hours a week does your team burn on the phone?',
        options: [
            { id: 'light', label: 'Under 5 hrs', meta: { hours: 3 } },
            { id: 'medium', label: '5 to 15 hrs', meta: { hours: 10 } },
            { id: 'heavy', label: '15 to 30 hrs', meta: { hours: 22 } },
            { id: 'buried', label: '30+ hrs', meta: { hours: 40 } }
        ]
    },

    // SHARED TAIL
    customerValue: {
        id: 'customerValue',
        kind: 'choice',
        prompt: "What's one customer worth to you on average?",
        helper: 'First-year revenue is fine. We can ballpark from this.',
        options: [
            { id: 'xs', label: 'Under $500', meta: { value: 350 } },
            { id: 's', label: '$500 to $1,500', meta: { value: 1000 } },
            { id: 'm', label: '$1,500 to $5,000', meta: { value: 3000 } },
            { id: 'l', label: '$5,000 to $15,000', meta: { value: 9000 } },
            { id: 'xl', label: '$15,000+', meta: { value: 25000 } }
        ]
    },
    industry: {
        id: 'industry',
        kind: 'choice',
        prompt: "What's your industry?",
        helper: "We'll tune the numbers to your world.",
        options: [
            { id: 'realEstate', label: 'Real Estate', icon: '🏠' },
            { id: 'hotels', label: 'Hotels / accommodation', icon: '🏨' },
            { id: 'health', label: 'Health / clinic', icon: '🩺' },
            { id: 'finance', label: 'Finance / advisory', icon: '📐' },
            { id: 'trades', label: 'Trades / home services', icon: '🔧' },
            { id: 'auto', label: 'Auto / retail', icon: '🚗' },
            { id: 'professional', label: 'Professional services', icon: '💼' },
            { id: 'other', label: 'Something else', icon: '✨' }
        ]
    },
    businessName: {
        id: 'businessName',
        kind: 'text',
        prompt: 'Last two questions. What should we call your business?',
        placeholder: 'Acme Co.',
        inputType: 'text'
    },
    contact: {
        id: 'contact',
        kind: 'text',
        prompt: 'Where should we send your results?',
        helper: 'Email or mobile, whichever you check more.',
        placeholder: 'you@company.com or 555-0123',
        inputType: 'text',
        validateAs: 'emailOrPhone'
    }
};
