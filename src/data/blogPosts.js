// Blog post data. Each post is structured as typed sections so the
// BlogPost page can render consistently. Sections:
//   { type: 'p', text }
//   { type: 'h2', text }
//   { type: 'pullquote', text }
//   { type: 'visual', label, description }   // placeholder until gpt-image-2 art lands
//   { type: 'statStrip', items: [{ value, label }, ...] }
//   { type: 'table', headers: [...], rows: [[...], ...] }
//   { type: 'takeaway', text }
//   { type: 'ctaInline', text, href }

export const blogPosts = {
    '5-minute-window-speed-to-lead': {
        slug: '5-minute-window-speed-to-lead',
        category: 'Speed-to-Lead',
        vertical: 'All industries',
        title: 'The 5-Minute Window: Why Speed-to-Lead Decides Who Wins the Sale',
        dek: 'Responding to a lead in 5 minutes makes you 21x more likely to qualify them. The average business takes 47 hours. Here is what the research says, and how to close the gap.',
        metaDescription: 'Responding to a lead in 5 minutes makes you 21x more likely to qualify them. The average business takes 47 hours.',
        author: 'Gary Sarco',
        authorRole: 'CEO',
        date: '2026-05-19',
        readTime: '6 min',
        heroImage: '/blog/blog-1-5-minute-window-visual-1.webp',
        heroMobileImage: '/blog/blog-1-hero-mobile.webp',
        heroImageAlt: 'Line chart showing the likelihood of qualifying a lead drops sharply within the first five minutes and flattens after an hour. 21x more likely to qualify at five minutes versus the 47-hour industry average.',
        heroVisual: {
            label: 'The first 5 minutes decide everything',
            description: 'A line chart showing the likelihood of qualifying a lead drops sharply within the first five minutes and flattens after an hour. 21x vs 47 hrs.'
        },
        sections: [
            { type: 'p', text: 'NEVER LOSE ANOTHER LEAD, because the lead you lose is usually the one you simply answered too late.' },
            { type: 'p', text: 'Here is the most uncomfortable fact in sales: the difference between winning and losing a deal often has nothing to do with your price, your product, or your pitch. It comes down to how fast you pick up the phone.' },
            { type: 'p', text: 'The research on this is not new, not thin, and not ambiguous. It has been studied for nearly two decades, across millions of leads, and it always points the same direction. Faster wins. Dramatically.' },
            { type: 'h2', text: 'The number that should change how you sell' },
            { type: 'p', text: 'A landmark study published in Harvard Business Review examined more than 2,200 US companies and over 100,000 web-generated leads. The finding: firms that responded within five minutes were 100x more likely to connect with a lead and 21x more likely to qualify them, compared to firms that waited just 30 minutes.' },
            { type: 'p', text: 'Not 21 percent more likely. Twenty-one times.' },
            { type: 'p', text: 'The underlying academic work, led by Dr James Oldroyd at MIT, tracked 15,000+ leads over three years and added another number that matters even more: leads contacted within five minutes were 9x more likely to actually convert into customers.' },
            { type: 'statStrip', image: '/blog/blog-1-stats.webp', mobileImage: '/blog/blog-1-stats-mobile.webp', imageAlt: '21x more likely to qualify with a 5-minute response, 9x more likely to convert, 100x more likely to connect.', items: [
                { value: '21x', label: 'more likely to qualify (5-min response)' },
                { value: '9x', label: 'more likely to convert' },
                { value: '100x', label: 'more likely to connect' }
            ] },
            { type: 'h2', text: 'So how fast is everyone actually responding? 47 hours.' },
            { type: 'p', text: 'Here is where the opportunity lives. Despite all this evidence, almost nobody acts on it.' },
            { type: 'p', text: 'Drift submitted real enquiry forms to 433 B2B companies and measured how long each took to respond. Only 7% responded within five minutes. More than half took over five business days. 27% never responded at all. The average response time was 47 hours.' },
            { type: 'p', text: 'Read that again. The research says respond in 5 minutes. The average business takes 47 hours. That is a gap of more than 500x between what works and what actually happens.' },
            { type: 'p', text: 'This is not a small inefficiency. It is the single largest, cheapest, most ignored lever in the entire sales process.' },
            { type: 'pullquote', text: "When every competitor is taking two days to call back, answering in 60 seconds isn't an improvement. It's a different category." },
            { type: 'h2', text: 'Why the first responder almost always wins' },
            { type: 'p', text: 'When a buyer submits an enquiry, they rarely submit just one. They fill in three or four forms and wait to see who responds.' },
            { type: 'p', text: 'The data on what happens next is stark: 78% of buyers purchase from the business that responds first. Not the cheapest. Not the most credentialed. The first. Speed gets read as competence, reliability, and care. Slowness gets read as disinterest, regardless of how good you actually are.' },
            { type: 'visual', image: '/blog/blog-1-multi-vendor-race.webp', mobileImage: '/blog/blog-1-multi-vendor-race-mobile.webp', imageAlt: 'Diagram of one buyer fanning out to four businesses. The company that responds first wins the booking; the slower three are marked too slow. 78% of buyers purchase from whoever responds first.', label: 'The multi-vendor race', description: 'A diagram showing a buyer contacting four businesses; the one that responds first wins the booking while the slower three lose out. 78% of buyers purchase from the first business to respond.' },
            { type: 'h2', text: 'The minute-by-minute reality' },
            { type: 'p', text: 'It is tempting to think "within the hour" is good enough. It isn\'t. Velocify analysed millions of lead records at minute-level granularity and found that calling within one minute produced a 391% improvement in contact rate versus calling at two minutes. The steepest drop in the entire curve happens between minute one and minute two.' },
            { type: 'p', text: 'By 30 minutes, contact rates have collapsed to barely above cold-calling levels. The window does not close gradually. It slams.' },
            { type: 'p', text: 'And there is a second half to the problem most teams never fix: persistence. The MIT data found the optimal number of call attempts is six. The average sales team gives up after 1.3. So even the teams that respond fast often quit too early.' },
            { type: 'p', text: 'Fast first touch, plus disciplined follow-up. That combination is where the results live.' },
            { type: 'h2', text: "The honest problem: humans can't do this" },
            { type: 'p', text: "Here is the catch. To respond to every lead within five minutes, every time, including the one that arrives at 9pm on a Saturday, you would need a salesperson sitting by the phone 24 hours a day, seven days a week, who never takes a break and never gets to a lead late. That person doesn't exist, and you couldn't afford to roster them if they did." },
            { type: 'p', text: 'This is exactly the gap an AI voice agent closes. The moment a lead comes in, it calls, in seconds, day or night. It qualifies them against your criteria on that first call, while their intent is still hot, and books them straight into your calendar before a competitor has even seen the enquiry. It then follows up across multiple attempts without ever getting discouraged or distracted.' },
            { type: 'p', text: 'The five-minute window has been the holy grail of sales for twenty years. The reason almost no one hits it is that it was humanly impossible to hit consistently. That constraint just disappeared.' },
            { type: 'visual', image: '/blog/blog-1-human-vs-ai.webp', mobileImage: '/blog/blog-1-human-vs-ai-mobile.webp', imageAlt: 'Split scene: a 9-to-5 human team with after-hours calls piling up versus an always-on AI agent calmly routing every call into a calendar.', label: '9-to-5 human team vs always-on AI', description: 'A split-scene illustration: an overworked human after-hours team with calls piling up, versus an always-on AI agent calmly handling every call.' },
            { type: 'takeaway', text: 'Speed-to-lead is not a nice-to-have. It is the highest-leverage variable in lead conversion, proven across two decades and millions of leads. Respond in five minutes and you are up to 21x more likely to qualify the lead and most likely to win the sale. The average business takes 47 hours. Closing that gap is the cheapest growth you will ever buy.' }
        ],
        sources: [
            'Oldroyd, McElheran, Elkington. "The Short Life of Online Sales Leads." Harvard Business Review, 2011.',
            'Oldroyd, J. (MIT Sloan) / InsideSales. "Lead Response Management Study," 2007 (15,000+ leads, 100+ companies, 3 years).',
            'Velocify. "Sales Processes That Boost Lead Conversion by 391%," 2012.',
            'Drift. "2018 Lead Response Report" (433 B2B companies tested).',
            'Lead Connect. "First Responder Advantage Study," 2020.'
        ]
    },

    'every-missed-call-is-a-lost-customer': {
        slug: 'every-missed-call-is-a-lost-customer',
        category: 'Inbound',
        vertical: 'All industries',
        title: 'Every Missed Call Is a Lost Customer (Not a Callback)',
        dek: '80% of callers will not leave a voicemail and 85% will not call back. After-hours calls are up to half your volume. Here is what unanswered phones really cost.',
        metaDescription: '80% of callers will not leave a voicemail and 85% will not call back. After-hours calls are up to half your volume.',
        author: 'David Taylor',
        authorRole: 'CTO',
        date: '2026-05-12',
        readTime: '5 min',
        heroImage: '/blog/blog-2-leaky-bucket-visual-1.webp',
        heroMobileImage: '/blog/blog-2-hero-mobile.webp',
        heroImageAlt: 'Illustration of a leaking bucket: incoming phone-call droplets pour in the top and drain out the bottom through holes labelled voicemail hang-up, no callback, and after hours.',
        heroVisual: {
            label: 'The leaky bucket',
            description: 'A bucket being filled from above by falling phone-call droplets, leaking out the bottom through three holes labelled voicemail hang-up, no callback, and after hours.'
        },
        sections: [
            { type: 'p', text: 'Most businesses treat a missed call like a message in a bottle: someone will leave a voicemail, or they will try again later, and we will get to them. It feels safe. It is not.' },
            { type: 'p', text: 'The data on inbound callers is brutal, because a phone call is the highest-intent lead you will ever get. Someone who picks up the phone is ready to talk now. And when no one answers, here is what they actually do.' },
            { type: 'h2', text: "They don't leave a message. They don't call back." },
            { type: 'p', text: 'According to aggregated call-tracking data, 80% of callers who reach voicemail hang up without leaving a message. They are not going to narrate their needs to a machine.' },
            { type: 'p', text: "Worse: 85% of people whose call goes unanswered will not call back at all. They don't see it as your loss. They see it as their cue to dial the next business on the list. Your competitor." },
            { type: 'p', text: 'So the comforting story, that a missed call becomes a callback, is mostly fiction. A missed call is usually just a customer you handed to someone else.' },
            { type: 'statStrip', image: '/blog/blog-2-stats.webp', mobileImage: '/blog/blog-2-stats-mobile.webp', imageAlt: '80% hang up rather than leave a voicemail, 85% never call back if unanswered, 35 to 50% of calls come in after hours.', items: [
                { value: '80%', label: 'hang up rather than leave a voicemail' },
                { value: '85%', label: 'never call back if unanswered' },
                { value: '35-50%', label: 'of calls come in after hours' }
            ] },
            { type: 'h2', text: 'The after-hours blind spot' },
            { type: 'p', text: 'Now layer on timing. A large share of enquiries arrive when your office is closed. After-hours calls represent an estimated 35 to 50% of total inbound volume: evenings, early mornings, weekends.' },
            { type: 'p', text: "For a business that only answers 9-to-5, that means up to half of your highest-intent leads hit a wall the moment they reach out. They don't wait politely until Monday. By Monday they've booked with whoever picked up on Saturday." },
            { type: 'p', text: 'This is the cruel maths of inbound: the leads most likely to convert are often the ones least likely to be answered.' },
            { type: 'pullquote', text: "A missed call isn't a callback opportunity. It's a lead, with money attached, walking to your competitor in real time." },
            { type: 'h2', text: 'Why this is different from a slow email reply' },
            { type: 'p', text: "When someone fills in a web form, there's at least a soft expectation of waiting. A phone call carries no such patience. The caller has decided to act this second. Intent is at its absolute peak and its half-life is measured in minutes, not days." },
            { type: 'p', text: "That's what makes the unanswered phone the most expensive leak in the building. It's not that you're slow. It's that the channel with the highest conversion potential is the one most likely to go unhandled, precisely when intent is highest." },
            { type: 'visual', image: '/blog/blog-2-missed-call-flowchart.webp', mobileImage: '/blog/blog-2-missed-call-flowchart-mobile.webp', imageAlt: 'Decision flowchart: an inbound call that is answered leads to BOOKED; an unanswered call branches into 80% hang up, 85% never call back, and calls a competitor.', label: 'What really happens to a missed call', description: 'A decision flowchart: an answered call leads to BOOKED; an unanswered call branches into hang-ups, no callbacks, and calls to competitors.' },
            { type: 'h2', text: 'Sealing the leak' },
            { type: 'p', text: "You can't out-hire this problem. Even a great reception team sleeps, takes lunch, handles one call at a time, and goes home at five. The leak isn't a staffing failure; it's a structural one." },
            { type: 'p', text: 'An AI voice agent changes the structure. It answers every inbound call instantly, on the first ring, 24 hours a day, 365 days a year. It never sends a caller to voicemail. It qualifies each caller against your script, books the qualified ones straight into your calendar, and records, transcribes and scores every conversation so nothing is lost. Two callers at once? Both get answered.' },
            { type: 'p', text: 'That turns the phone from a leaky bucket into a sealed funnel. The highest-intent channel you have stops draining and starts converting, including at 9pm on a Saturday.' },
            { type: 'visual', image: '/blog/blog-2-bucket-vs-funnel.webp', mobileImage: '/blog/blog-2-bucket-vs-funnel-mobile.webp', imageAlt: 'Before and after: a leaky bucket of phone calls draining away, versus a sealed funnel where an AI agent captures every call into the calendar.', label: 'Leaky bucket vs sealed funnel', description: 'Before and after illustration: a leaking bucket of calls becomes a sealed bucket where an AI agent captures every call into the calendar.' },
            { type: 'takeaway', text: 'A missed call is not a callback waiting to happen. 80% will not leave a voicemail, 85% will not try again, and up to half of all calls come in after hours. Every unanswered ring is a high-intent customer moving to a competitor. The only reliable fix is answering every call, instantly, around the clock.' }
        ],
        sources: [
            'CallRail / Ringba. Aggregated inbound call-tracking data (millions of calls).',
            'Oldroyd, McElheran, Elkington. "The Short Life of Online Sales Leads." Harvard Business Review, 2011.',
            'Stellar Voice Agents internal benchmarks.'
        ]
    },

    'are-my-clients-too-old-for-ai': {
        slug: 'are-my-clients-too-old-for-ai',
        category: 'AI Voice',
        vertical: 'All industries',
        title: '"My Clients Are Too Old for AI" — What the Research Actually Says',
        dek: 'The most common objection to AI voice is that older customers will not accept it. The data tells a different story: 90% of over-55s found voice AI easy to use, and boomers prefer calls over texts.',
        metaDescription: '90% of over-55s found voice AI easy to use, and boomers prefer calls over texts. Here is what the research actually says about AI voice and older customers.',
        author: 'Gary Sarco',
        authorRole: 'CEO',
        date: '2026-05-05',
        readTime: '6 min',
        heroImage: '/blog/blog-3-natural-conversation-visual-1.webp',
        heroMobileImage: '/blog/blog-3-hero-mobile.webp',
        heroImageAlt: 'Warm illustration of an older adult comfortably on the phone, with a glowing audio-waveform AI voice and the caption "A natural conversation — not a phone menu."',
        heroVisual: {
            label: 'A natural conversation, not a phone menu',
            description: 'A warm illustration of an older adult comfortably on the phone with a glowing audio-waveform AI voice.'
        },
        sections: [
            { type: 'p', text: '"My clients are older. They\'ll never talk to AI."' },
            { type: 'p', text: "It's the single most common objection we hear, and it deserves an honest answer rather than a sales dodge. So let's look at what the research actually shows about older adults and AI voice. It's more nuanced, and more encouraging, than the objection assumes." },
            { type: 'h2', text: "The resistance isn't to AI. It's to bad AI." },
            { type: 'p', text: "Here's the key insight buried in the data: people of every age don't reject AI voice as a concept. They reject frustrating AI, the robotic phone menus that can't understand you, loop endlessly, and never resolve anything." },
            { type: 'p', text: 'When the experience is natural and useful, acceptance is high across the board. Customer satisfaction with AI voice agents now sits at 72%, up from 53% just three years ago. And the gap between good and bad implementation is enormous: modern conversational AI voice agents score around 3.8 out of 5 for satisfaction, versus 2.1 out of 5 for traditional IVR phone menus. Nearly double.' },
            { type: 'p', text: 'So when someone says "people hate talking to AI," what they usually mean is "people hate talking to bad AI." That is a solvable problem, not a wall.' },
            { type: 'visual', image: '/blog/blog-3-ivr-comparison.webp', mobileImage: '/blog/blog-3-ivr-comparison-mobile.webp', imageAlt: 'Horizontal bar comparison: natural AI voice agent scores 3.8 out of 5 versus traditional IVR phone menu at 2.1 out of 5. Overall AI voice satisfaction rose from 53% to 72% in three years.', label: 'Natural AI vs traditional IVR', description: 'Horizontal bar comparison: natural AI voice agent 3.8 / 5 vs traditional IVR phone menu 2.1 / 5. Overall AI voice satisfaction: 53% to 72% in three years.' },
            { type: 'h2', text: 'What the data on over-55s actually says' },
            { type: 'p', text: 'This is where the objection really comes apart. In a 12-week usability study, 90% of adults aged 55 and over found voice-assistant technology easy to learn and use. Just as importantly, initial worries about privacy and monitoring decreased significantly with use. Familiarity bred comfort, not contempt.' },
            { type: 'p', text: 'More context: 55% of adults aged 50+ have already used AI voice technologies like Alexa, Siri or Google Assistant (University of Michigan National Poll on Healthy Aging). Boomers retain the strongest preference for voice calls over messaging of any generation. Only 31% say messaging has replaced most of their calls. Adoption rises sharply when AI is embedded in familiar tools and when usefulness clearly outweighs novelty.' },
            { type: 'statStrip', image: '/blog/blog-3-stats.webp', mobileImage: '/blog/blog-3-stats-mobile.webp', imageAlt: '90% of over-55s found voice AI easy to use, 55% of over-50s already use AI voice assistants, 72% of consumers accept AI voice when it works well.', items: [
                { value: '90%', label: 'of over-55s found voice AI easy to use' },
                { value: '55%', label: 'of over-50s already use AI voice assistants' },
                { value: '72%', label: 'of consumers accept AI voice when it works well' }
            ] },
            { type: 'h2', text: 'Why this works in your favour, not against it' },
            { type: 'p', text: 'Put those two facts together and something clicks.' },
            { type: 'p', text: 'First: older customers prefer phone calls. Second: our product is a phone call. We are not asking a 65-year-old to download an app, learn a chatbot, or navigate a portal. We are calling them on the phone, the exact channel they already prefer, and having a natural conversation.' },
            { type: 'p', text: "The objection assumes we're pushing unfamiliar technology onto people who want the old way of doing things. The reality is the opposite: we're meeting them on the channel they like best, and removing the part they hate, the hold music, the menu trees, the \"press 1 for...\"." },
            { type: 'pullquote', text: "Older customers aren't anti-AI. They're anti-frustration. Give them a warm, natural call that respects their time, and the objection evaporates." },
            { type: 'h2', text: 'The exposure effect is the whole game' },
            { type: 'p', text: "The most important finding in all of this is the 12-week study's arc: resistance fades with positive exposure. A person who has a single good experience with a natural-sounding, genuinely helpful AI call simply does not carry the negative reaction the stereotype predicts." },
            { type: 'p', text: "Our own client's experience bears this out. EasyStart Homes has been live for over six months, and their leads, across all ages, don't realise they're speaking with AI. The voice is warm, it handles interruptions, it stays on track. That's not a demo trick; it's the standard." },
            { type: 'visual', image: '/blog/blog-3-exposure-curve.webp', mobileImage: '/blog/blog-3-exposure-curve-mobile.webp', imageAlt: 'Line chart over 12 weeks: comfort and ease of use rises while privacy concern falls, the two lines crossing midway. End annotation: 90% found it easy to use.', label: 'Resistance fades with exposure', description: 'Two lines over 12 weeks: comfort and ease of use rises, privacy concern falls. The lines cross midway. End annotation: 90% found it easy to use.' },
            { type: 'takeaway', text: "The 'my clients are too old' objection doesn't survive contact with the data. 90% of over-55s found voice AI easy to use, boomers prefer calls over texts, and acceptance climbs with every good experience. The resistance was never to AI, it was to bad AI. A natural, helpful voice agent meets older customers exactly where they're most comfortable: on the phone." }
        ],
        sources: [
            'MDPI. "Adapting Voice Assistant Technology for Older Adults," 2025 (12-week usability study).',
            'University of Michigan. "National Poll on Healthy Aging: How Older Adults Use and Think About AI," Feb 2025.',
            'Telnyx. "Voice AI Consumer Insight Panel," Nov 2025.',
            'YouGov. "How Americans Communicate in 2026."',
            'Frontiers in Psychology. "Factors Influencing Older Adults\' Adoption of AI Voice Assistants," 2025.'
        ]
    },

    'easystart-homes-speed-to-lead-projection': {
        slug: 'easystart-homes-speed-to-lead-projection',
        category: 'Case Study',
        vertical: 'Real Estate',
        title: "From 17% to 40%: What Speed-to-Lead Could Do for a Home Builder's Bookings",
        dek: 'A real home-building client books 17 to 25% of leads with outbound calling alone. Here is the honest model for what adding instant speed-to-lead could do, and why we did not claim more.',
        metaDescription: 'A real home-building client books 17 to 25% of leads with outbound calling. Here is the honest model for what adding speed-to-lead could do.',
        author: 'David Taylor',
        authorRole: 'CTO',
        date: '2026-04-28',
        readTime: '7 min',
        heroImage: '/blog/blog-4-booking-rate-lift-visual-1.webp',
        heroMobileImage: '/blog/blog-4-hero-mobile.webp',
        heroImageAlt: 'Ascending bar chart showing booking rate rising from 17 to 25 percent now, to 28 to 35 percent conservative, to 32 to 40 percent moderate. Subtitle: same leads, no extra ad spend.',
        heroVisual: {
            label: 'The booking-rate lift',
            description: 'Ascending bar chart: Now 17-25%, Conservative 28-35%, Moderate 32-40%. Same leads, no extra ad spend.'
        },
        sections: [
            { type: 'p', text: "Most of what you read about AI and sales is theoretical. This isn't. This is six months of live data from a real client in residential home building, plus an honest model of what one more change could do." },
            { type: 'p', text: 'Meet Denes Aldott, a sales consultant at EasyStart Homes here in Australia. He has been running one of our voice products in live operation since January 2026. His verdict after testing the voice himself, before a single real lead went through: "That\'s just so unreal, well done!" His leads still don\'t realise they\'re talking to AI.' },
            { type: 'p', text: 'Here is what the numbers look like, and where they could go.' },
            { type: 'h2', text: "What Denes runs today (and what it doesn't have)" },
            { type: 'p', text: 'Denes uses our outbound product: a structured calling cadence that works his lead database with up to nine touches across six days, blending calls, SMS and email. No human caller time required.' },
            { type: 'p', text: 'The results are consistent and strong. In the December 2025 pilot, the system contacted 60 leads and produced 10 qualified bookings, a 16.7% booking rate. Across the live engagement from January to May 2026, processing 50 to 100 leads a month, it has held a 17 to 25% booking rate.' },
            { type: 'visual', image: '/blog/blog-4-engagement-timeline.webp', mobileImage: '/blog/blog-4-engagement-timeline-mobile.webp', imageAlt: 'Horizontal timeline of the EasyStart engagement: December 2025 pilot of 60 leads and 10 bookings at 16.7%, going live January 2026, then January to May 2026 at 50 to 100 leads a month and a 17 to 25% booking rate, 6+ months live.', label: 'The EasyStart engagement so far', description: 'Horizontal timeline: Dec 2025 Pilot (60 leads, 10 bookings, 16.7%) -> Jan 2026 Live -> Jan-May 2026 50-100 leads/mo, 17-25% booking rate, 6+ months live.' },
            { type: 'p', text: 'But here is the important part. This system is not a speed-to-lead system. Leads are uploaded in batches, not triggered the instant someone enquires. First contact might land hours or even days after the person originally raised their hand. There is no real-time trigger from web-form submission to first call.' },
            { type: 'p', text: 'Which means that 17 to 25% is being achieved without the single highest-leverage variable in lead conversion: speed. The floor is already this good. The question is what the ceiling looks like with speed added.' },
            { type: 'h2', text: 'The model: what speed-to-lead would add' },
            { type: 'p', text: "We won't insult anyone's intelligence with fantasy maths. The research (see our speed-to-lead post) shows a 3x to 21x improvement in qualification when you respond in five minutes versus hours. But you cannot simply multiply 21% by 21 and claim 441%. That would be dishonest, and Denes already recovers some leads through persistence, which narrows the gap." },
            { type: 'p', text: 'So we model a conservative uplift built on two real mechanisms.' },
            { type: 'p', text: "Mechanism 1, higher first-attempt contact. Today, Denes's leads are called hours or days after they enquire. Many have moved on or forgotten they enquired. With speed-to-lead, the first call lands within 60 seconds, while they're still at their computer thinking about their home build. Velocify's data shows up to a 391% contact-rate improvement at one minute versus two. Even conservatively, first-attempt contact should improve 2 to 3x." },
            { type: 'p', text: "Mechanism 2, captured after-hours leads. Today, a lead who enquires at 9pm on a Saturday hears nothing until Monday. With speed-to-lead, they get a call in 60 seconds. After-hours enquiries are 35 to 50% of total volume, and in a delayed-cadence system they're largely dead weight." },
            { type: 'visual', image: '/blog/blog-4-funnel-comparison.webp', mobileImage: '/blog/blog-4-funnel-comparison-mobile.webp', imageAlt: 'Two side-by-side sales funnels. Current delayed cadence: lead in, contacted 30 to 40%, booked 17 to 25%. With speed-to-lead: lead in, contacted 60 to 75%, booked 28 to 40%.', label: 'Current vs with speed-to-lead', description: 'Two side-by-side sales funnels. Current (delayed cadence): Lead in -> Contacted 30-40% -> Booked 17-25%. With speed-to-lead: Lead in -> Contacted 60-75% -> Booked 28-40%.' },
            { type: 'h2', text: 'The conservative projection' },
            { type: 'table', headers: ['Metric', 'Current', 'With speed-to-lead', 'Change'], rows: [
                ['First response time', 'Hours to days', 'Under 60 seconds', '500x+ faster'],
                ['First-attempt contact rate', '~30-40%', '~60-75%', '+80-100%'],
                ['After-hours coverage', 'None', '24/7/365', 'New channel'],
                ['Booking rate (conservative)', '17-25%', '28-35%', '~1.4-1.6x'],
                ['Booking rate (moderate)', '17-25%', '32-40%', '~1.6-2.3x'],
                ['Monthly bookings (75 leads)', '13-19', '21-30', '+8-11']
            ] },
            { type: 'p', text: "At Denes's typical volume of 75 leads a month, that's 8 to 11 additional qualified bookings every month, from the same leads, with no extra ad spend. In home building, where a single booking can become a build worth tens or hundreds of thousands of dollars, that isn't a marginal gain. It's transformative." },
            { type: 'visual', image: '/blog/blog-4-extra-bookings.webp', mobileImage: '/blog/blog-4-extra-bookings-mobile.webp', imageAlt: 'Callout showing 13 to 19 bookings a month now rising to 21 to 30 with speed-to-lead. Badge: +8 to 11 extra qualified bookings. Same leads, no extra ad spend.', label: 'Extra bookings per month', description: 'Callout: 13-19 bookings/mo now arrow to 21-30 with speed-to-lead. Badge: +8 to 11 extra qualified bookings. Same leads, no extra ad spend.' },
            { type: 'h2', text: "Why we didn't claim more" },
            { type: 'p', text: "The MIT research implies a 9x conversion lift for sub-five-minute response. Applied naively to a 21% baseline, that would suggest a booking rate approaching 100%. We don't claim that, for three honest reasons:" },
            { type: 'p', text: 'Not every lead is reachable regardless of speed: wrong numbers, spam, no real intent.' },
            { type: 'p', text: "Denes's cadence already recovers some leads through persistence, so the incremental gain from speed is smaller than a from-scratch comparison." },
            { type: 'p', text: 'Real-estate leads have their own qualification barriers: finance readiness, location, timeline, that exist independent of how fast you call.' },
            { type: 'p', text: "We'd rather under-promise and over-deliver. 28 to 35% is defensible, achievable, and still pays for itself many times over." },
            { type: 'pullquote', text: 'The floor is 17 to 25% without speed. Add the one variable the system does not yet have, and the honest, conservative ceiling is 28 to 40%. Same leads. Same spend.' },
            { type: 'takeaway', text: 'EasyStart Homes proves the outbound system works: a steady 17 to 25% booking rate with zero human caller time, achieved without speed-to-lead. Add instant response, the highest-leverage lever in the playbook, and a conservative model projects 28 to 40%, or 8 to 11 extra bookings a month from the same leads. For a home builder, that is the difference between a good year and a record one.' }
        ],
        sources: [
            'Stellar Voice Agents internal data — EasyStart Homes engagement, December 2025 to May 2026.',
            'Oldroyd, McElheran, Elkington. "The Short Life of Online Sales Leads." Harvard Business Review, 2011.',
            'Oldroyd, J. (MIT Sloan) / InsideSales, 2007.',
            'Velocify, 2012 (391% contact-rate improvement).',
            'CallRail / Ringba (after-hours call volume).'
        ]
    },

    'real-cost-of-slow-follow-up': {
        slug: 'real-cost-of-slow-follow-up',
        category: 'ROI',
        vertical: 'All industries',
        title: 'The Real Cost of Slow Follow-Up: A Revenue-Leak Breakdown',
        dek: 'Slow response, missed calls and after-hours enquiries quietly drain revenue every month. Here is where the money leaks, how to size it for your business, and how to seal it.',
        metaDescription: 'Slow response, missed calls and after-hours enquiries quietly drain revenue every month. Here is where the money leaks.',
        author: 'David Taylor',
        authorRole: 'CTO',
        date: '2026-04-21',
        readTime: '6 min',
        heroImage: '/blog/blog-5-revenue-leak-waterfall-visual-1.webp',
        heroMobileImage: '/blog/blog-5-hero-mobile.webp',
        heroImageAlt: 'Waterfall diagram showing 100 leads of full revenue potential draining through three leaks (slow response, missed calls, after-hours unanswered), leaving a small captured remainder labelled Revenue you actually capture.',
        heroVisual: {
            label: 'The revenue-leak waterfall',
            description: '100 leads of full revenue potential drain through three leaks (slow response, missed calls, after-hours unanswered), leaving a small captured remainder.'
        },
        sections: [
            { type: 'p', text: "Slow follow-up rarely shows up as a line item. No one sends you an invoice for the lead you called back too late, or the caller who hit your voicemail at 8pm and dialled a competitor instead. The cost is real, it's recurring, and it's almost completely invisible. Which is exactly why it never gets fixed." },
            { type: 'p', text: "Let's make it visible. Here is where the money actually leaks, and roughly how big each leak is." },
            { type: 'h2', text: 'Leak 1: Slow response' },
            { type: 'p', text: "When you respond to a web lead in five minutes, you're up to 21x more likely to qualify them than if you wait 30 minutes, and you're far more likely to win the deal outright, because 78% of buyers purchase from whoever responds first." },
            { type: 'p', text: "The average business takes 47 hours to respond. So most companies are losing the large majority of every web lead's value to delay alone, before price or product ever enters the conversation. This is the biggest leak, and the one nobody sees on a P&L." },
            { type: 'h2', text: 'Leak 2: Missed calls' },
            { type: 'p', text: "Phone calls are your highest-intent leads, and they're brutally unforgiving. 80% of callers won't leave a voicemail. 85% won't call back if they don't get through. They simply move to the next business." },
            { type: 'p', text: "So every unanswered ring isn't a callback in waiting; it's a high-intent buyer leaving in real time. For most businesses this leak runs all day, every day, in the background." },
            { type: 'statStrip', image: '/blog/blog-5-stats.webp', mobileImage: '/blog/blog-5-stats-mobile.webp', imageAlt: '47 hours average response time when it should be 5 minutes, 85% of unanswered callers never call back, 35 to 50% of enquiries arrive after hours.', items: [
                { value: '47 hrs', label: 'average response time (should be 5 min)' },
                { value: '85%', label: 'of unanswered callers never call back' },
                { value: '35-50%', label: 'of enquiries arrive after hours' }
            ] },
            { type: 'h2', text: 'Leak 3: After-hours enquiries' },
            { type: 'p', text: 'Up to 35 to 50% of all enquiries arrive outside business hours: evenings, early mornings, weekends. If you only answer 9-to-5, as much as half of your demand hits a wall the moment it reaches you.' },
            { type: 'p', text: "These aren't low-quality leads, either. Someone enquiring at 9pm on a Saturday is often your most motivated buyer. And in a delayed system, they're the most likely to be gone by Monday." },
            { type: 'h2', text: 'Why these leaks compound' },
            { type: 'p', text: "Here is the part that makes slow follow-up so expensive: the leaks stack on top of each other. An after-hours lead is also a slow-response lead. A missed call is also, often, an after-hours call. The same enquiry can fall through two or three gaps at once." },
            { type: 'p', text: "That's why the total cost is almost always bigger than any single statistic suggests, and why it's so easy to underestimate. You're not losing 20% here or 30% there in isolation; you're losing the multiplied product of several leaks operating at the same time." },
            { type: 'pullquote', text: "You can't manage what you can't see. The first step to plugging a revenue leak is sizing it, in dollars, for your own business." },
            { type: 'visual', image: '/blog/blog-5-compounding-gates.webp', mobileImage: '/blog/blog-5-compounding-gates-mobile.webp', imageAlt: 'A single lead stream passing through three gates labelled Answered in time, Call picked up, and Covered after hours. At each gate a portion drops away, leaving a thin captured stream labelled what you actually capture.', label: 'How the leaks compound', description: 'One lead enters and passes three gates: Answered in time? Call picked up? Covered after hours? At each gate a portion drops away, leaving a thin captured stream.' },
            { type: 'h2', text: 'Put a number on your own leak' },
            { type: 'p', text: 'The averages above are useful, but your business is specific. The exact cost depends on your lead volume, your average deal value, how fast you currently respond, and how much of your demand arrives after hours.' },
            { type: 'p', text: "That is what our 30-second test is for. Answer a few quick questions and it shows you, to the dollar, what slow follow-up, missed calls and after-hours enquiries are costing you every month, and which plan would seal the gap. No guesswork, no theory, your numbers." },
            { type: 'ctaInline', text: 'Take the 30-second test', href: '#take-the-test' },
            { type: 'h2', text: 'Sealing all three leaks at once' },
            { type: 'p', text: "The reason these leaks persist isn't laziness; it's that humans physically can't plug them. No team responds to every web lead in 60 seconds, answers every call on the first ring, and covers every hour of every night, all at once. The leaks are structural." },
            { type: 'p', text: 'An AI voice agent is structural too, which is why it can fix them: it calls new leads in seconds, answers every inbound call instantly without ever routing to voicemail, and runs 24/7/365 so after-hours demand is captured instead of lost. One system, all three leaks, sealed at the same time, and you only pay when it delivers a qualified booking.' },
            { type: 'visual', image: '/blog/blog-5-three-leaks-sealed.webp', mobileImage: '/blog/blog-5-three-leaks-sealed-mobile.webp', imageAlt: 'Before and after: a leaking pipe with three labelled holes (slow response, missed calls, after hours) becomes one sealed pipe delivering full flow into a calendar booking.', label: 'Three leaks vs one sealed system', description: 'Before/after: a leaking pipe with three labelled holes (slow response, missed calls, after hours) becomes a sealed pipe delivering full flow into a calendar booking.' },
            { type: 'takeaway', text: 'Slow follow-up is the most expensive cost most businesses never measure. It leaks through three gaps at once, slow response, missed calls and after-hours enquiries, and because they compound, the true cost is bigger than any single number suggests. Size it for your business with the 30-second test, then seal all three leaks with one always-on system.' }
        ],
        sources: [
            'Oldroyd, McElheran, Elkington. "The Short Life of Online Sales Leads." Harvard Business Review, 2011.',
            'Oldroyd, J. (MIT Sloan) / InsideSales, 2007.',
            'Drift. "2018 Lead Response Report."',
            'Lead Connect. "First Responder Advantage Study," 2020.',
            'CallRail / Ringba. Aggregated inbound call-tracking data.'
        ]
    },

    'rising-cost-of-scaling-a-human-team': {
        slug: 'rising-cost-of-scaling-a-human-team',
        category: 'Cost / Operations',
        vertical: 'All industries',
        title: 'The Rising Cost of Scaling a Human Team (And the Smarter Way to Grow)',
        dek: 'Every rep you add costs more than salary: ~6 months to ramp, 35% annual turnover, and up to $115k to replace. Here is the real cost of scaling people, and how AI lets you redeploy your team to pure selling.',
        metaDescription: 'Every rep you add costs more than salary: ~6 months to ramp, 35% annual turnover, and up to $115k to replace. Here is the real cost of scaling people.',
        author: 'Gary Sarco',
        authorRole: 'CEO',
        date: '2026-06-02',
        readTime: '6 min',
        heroImage: '/blog/blog-6-hero.webp',
        heroMobileImage: '/blog/blog-6-hero-mobile.webp',
        heroImageAlt: 'Chart comparing a steeply rising stepped cost line for a human team against a flat low cost line for an AI voice agent as lead volume grows.',
        heroVisual: {
            label: 'Two ways to grow',
            description: 'A human team cost line climbs in expensive steps; an AI voice agent line stays flat as lead volume grows.'
        },
        sections: [
            { type: 'p', text: 'Growth is supposed to feel good. So why does every new hire make the business feel heavier, not lighter?' },
            { type: 'p', text: 'Here is the uncomfortable truth about scaling a team by adding people: the cost rises faster than the output, and most of it is invisible. Salary is the part you see. The ramp time, the turnover, the management drag, and the simple fact that your expensive new salesperson spends most of their week not selling, those are the costs that quietly eat the margin you were trying to grow.' },
            { type: 'p', text: 'Let us add them up, then look at the alternative.' },
            { type: 'h2', text: 'Cost 1: They take half a year to pay off' },
            { type: 'p', text: 'You do not hire a productive salesperson. You hire someone who becomes productive, eventually. The average sales rep takes around 5.7 months to ramp to baseline productivity, and closer to seven months (about 210 days) to fully hit quota. For most of that time you are paying full freight for partial output.' },
            { type: 'h2', text: 'Cost 2: A third of them leave every year' },
            { type: 'p', text: 'Then there is churn. Annual sales turnover averages around 35%, so roughly one in three of the people you trained walks out the door each year, taking their ramp investment with them. And replacing them is not cheap: all-in, the cost of replacing a single sales rep lands between $97,000 and $115,000 once you count recruiting, onboarding, lost productivity and the revenue gap during the new person\'s ramp.' },
            { type: 'p', text: 'So the cycle for many teams is: spend months getting someone productive, keep them for a while, lose a third of them, and start the expensive clock again.' },
            { type: 'statStrip', image: '/blog/blog-6-stats.webp', mobileImage: '/blog/blog-6-stats-mobile.webp', imageAlt: 'About 5.7 months to ramp a new rep, 35% annual sales turnover, and 97,000 to 115,000 dollars to replace one rep.', items: [
                { value: '~5.7 mo', label: 'to ramp a new rep' },
                { value: '35%', label: 'annual sales turnover' },
                { value: '$97k-115k', label: 'to replace one rep' }
            ] },
            { type: 'h2', text: 'Cost 3: Most of their week is not selling anyway' },
            { type: 'p', text: 'Here is the part that makes it sting. Even your fully-ramped, fully-retained reps spend the minority of their time actually selling. Across Salesforce and Forrester research (a study of 3,031 reps), salespeople spend under 30% of their time selling. The other 70% goes to admin and CRM data entry, internal meetings, manual prospect research, and follow-up coordination, an estimated 28.8 hours per rep, per week, on non-selling work.' },
            { type: 'p', text: 'So when you add capacity by hiring, you are not buying 40 hours of selling. You are buying about 12 hours of selling and 28 hours of overhead, then paying to manage it.' },
            { type: 'visual', image: '/blog/blog-6-rep-week-donut.webp', mobileImage: '/blog/blog-6-rep-week-donut-mobile.webp', imageAlt: 'Donut chart of a sales rep\'s week: 30% selling, 20% admin and CRM, 15% internal meetings, 15% prospect research, 10% email, 10% other, with about 28.8 hours a week not selling.', label: 'Where a sales rep\'s week goes', description: 'A donut chart: 30% selling, the rest split across admin, meetings, research and email. About 28.8 hours a week not selling.' },
            { type: 'h2', text: 'Cost 4: The management tax compounds' },
            { type: 'p', text: 'Every person you add also adds load above them. More one-on-ones, more pipeline reviews, more coaching, more performance management, more coordination. The team gets harder to run precisely as it gets bigger, and the manager\'s time, your most expensive time, gets consumed by keeping the machine running instead of growing the business.' },
            { type: 'p', text: 'This is why "just hire more reps" so often produces diminishing returns: headcount goes up, but proportional revenue does not follow, because the overhead scales with the people, not the output.' },
            { type: 'pullquote', text: 'Adding people adds salary, ramp, turnover risk, and management drag, all at once. Adding an AI agent adds capacity, and nothing else.' },
            { type: 'h2', text: 'The alternative: scale the work, redeploy the people' },
            { type: 'p', text: 'This is not an argument for firing your sales team. It is an argument for pointing them at the right work.' },
            { type: 'p', text: 'An AI voice agent scales the way software scales, not the way people do. It needs no ramp period; it is productive on day one. It does not quit, does not churn, and does not need recruiting or onboarding. It handles 10 leads or 10,000 with the same flat cost and zero added management load. It works nights, weekends and holidays without overtime. And with Stellar, you only pay when it delivers a qualified booking, so capacity stops being a fixed cost you carry and becomes a variable cost tied to results.' },
            { type: 'p', text: 'What it does best is exactly the work that is currently eating your team\'s week: the instant first call, the qualifying questions, the relentless follow-up, the after-hours coverage, the CRM logging. Hand that to the agent, and something powerful happens to your humans.' },
            { type: 'h2', text: 'Redeploy your team to the work only humans do' },
            { type: 'p', text: 'Take the dialling, chasing, qualifying and admin off your salespeople\'s plates, and you do not need to shrink the team. You get to upgrade what the team does.' },
            { type: 'p', text: 'Instead of spending 28 hours a week on overhead, your reps spend their time on warm, pre-qualified, already-booked conversations, building rapport, handling real objections, structuring the deal, and closing. The human skills that actually move revenue. The AI fills the calendar with qualified appointments; your people show up and win them.' },
            { type: 'p', text: 'That is the real unlock. You stop paying skilled salespeople to do the work of a dialler, and start getting the full value of why you hired them. Same team, far more selling, no extra ramp, turnover or management cost layered on top.' },
            { type: 'visual', image: '/blog/blog-6-hire-vs-redeploy.webp', mobileImage: '/blog/blog-6-hire-vs-redeploy-mobile.webp', imageAlt: 'Two-panel illustration contrasting scaling by hiring (more cost and overhead) with scaling by AI, which handles chasing and feeds booked appointments to the team, who are redeployed to selling.', label: 'Hire more vs redeploy', description: 'Scale by hiring stacks cost and overhead. Scale with AI: the agent does the chasing while people are redeployed to closing.' },
            { type: 'takeaway', text: 'Scaling by headcount stacks four rising costs at once: about 6 months to ramp, 35% annual turnover, up to $115k to replace a rep, and reps who spend under 30% of their week selling, plus a management tax that compounds with every hire. An AI voice agent adds capacity with none of that, and frees your existing team to do the one thing humans are irreplaceable at: closing. Scale the work with AI, redeploy the people to selling.' }
        ],
        sources: [
            'Salesforce. "State of Sales" research and 2023/2025 productivity findings (reps spend under 30% of time selling).',
            'Forrester. Activity study of 3,031 sales reps (time breakdown; ~28.8 hrs/week non-selling).',
            'Industry aggregates on sales ramp time (~5.7 months / ~210 days to full quota), turnover (~35% annually), and cost to replace a rep ($97k-$115k all-in), 2025-2026.',
            'Stellar Voice Agents internal model.'
        ]
    }
};

// Publish order — drives the index page and "related posts" rotation.
// Newest first; posts are spaced one week apart (2026-06-02 back to 2026-04-21).
export const POST_ORDER = [
    'rising-cost-of-scaling-a-human-team',
    '5-minute-window-speed-to-lead',
    'every-missed-call-is-a-lost-customer',
    'are-my-clients-too-old-for-ai',
    'easystart-homes-speed-to-lead-projection',
    'real-cost-of-slow-follow-up'
];

export function getPost(slug) {
    return blogPosts[slug] ?? null;
}

export function getAllPosts() {
    return POST_ORDER.map((slug) => blogPosts[slug]).filter(Boolean);
}

export function getRelatedPosts(currentSlug, count = 3) {
    return POST_ORDER
        .filter((s) => s !== currentSlug)
        .slice(0, count)
        .map((s) => blogPosts[s]);
}
