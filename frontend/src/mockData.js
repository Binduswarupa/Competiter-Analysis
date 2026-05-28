export const INITIAL_COMPETITORS = [
  {
    id: "stripe",
    name: "Stripe",
    domain: "stripe.com",
    industry: "Fintech / Payments",
    description: "Financial infrastructure platform for the internet, offering developer-friendly billing, checkout, and card issuing APIs.",
    strategy: "Developer-first onboarding, robust API suite, rapid product expansion (Atlas, Corporate Card), and integration ecosystem.",
    positioning: { x: 88, y: 92 },
    pricing: {
      free: "No monthly fees",
      pro: "2.9% + 30¢ per txn",
      enterprise: "Custom interchange splits"
    },
    features: {
      api: true,
      sso: true,
      analytics: true,
      mobile: true,
      support247: true
    },
    metrics: {
      speed: 94,
      seo: 92,
      social: 85
    },
    sentiment: {
      positive: 80,
      neutral: 14,
      negative: 6
    },
    swot: {
      strengths: [
        "Unrivaled developer mindshare and premium API docs",
        "Very fast setup and onboarding for global merchant accounts",
        "Broad product suite (Payments, Billing, Tax, Radar, Atlas)"
      ],
      weaknesses: [
        "Higher transactional costs compared to direct acquirers",
        "Support can be slow and automated for smaller merchants",
        "Frequent merchant accounts hold-ups without prior warning"
      ],
      opportunities: [
        "Further expansion into stablecoins and Web3 settlement rails",
        "Growing micro-transaction billing support",
        "Expanding Stripe Capital lending to global SMBs"
      ],
      threats: [
        "High pressure from Adyen on enterprise pricing",
        "Regulatory scrutiny regarding fraud prevention policies",
        "Local payments competitors in Asia and Latin America"
      ]
    },
    reviewKeywords: [
      { word: "Developer-first", count: 54, sentiment: "positive", quote: "Stripe's developer onboarding and API sandbox is exceptionally smooth compared to legacy banks." },
      { word: "Radar Fraud", count: 32, sentiment: "positive", quote: "Radar blocked multiple card-testing attacks automatically during our holiday rush." },
      { word: "Billing SDKs", count: 18, sentiment: "neutral", quote: "The billing APIs are very powerful but they take a few days of engineering resources to coordinate correctly." },
      { word: "Account Holds", count: 22, sentiment: "negative", quote: "They placed our payouts on hold for 5 days without any warning, causing cash-flow issues." },
      { word: "Slow Support", count: 25, sentiment: "negative", quote: "We waited 48 hours for a reply to our high-priority support ticket during a checkout issue." }
    ]
  },
  {
    id: "adyen",
    name: "Adyen",
    domain: "adyen.com",
    industry: "Fintech / Payments",
    description: "Single payments platform integrating gateway, risk management, and acquiring directly connected to card schemes.",
    strategy: "Focus on global enterprise scale, omnichannel unified commerce (POS + Online), and direct bank acquiring integration.",
    positioning: { x: 92, y: 78 },
    pricing: {
      free: "Requires contract",
      pro: "Interchange++ (variable)",
      enterprise: "Tiered volume discounts"
    },
    features: {
      api: true,
      sso: true,
      analytics: true,
      mobile: false,
      support247: true
    },
    metrics: {
      speed: 88,
      seo: 76,
      social: 60
    },
    sentiment: {
      positive: 74,
      neutral: 20,
      negative: 6
    },
    swot: {
      strengths: [
        "Direct connection to global card networks bypassing middleware",
        "Omnichannel leader (integrates POS terminal and online platforms)",
        "Lower processing costs for extremely high-volume enterprises"
      ],
      weaknesses: [
        "High volume entry barrier; not suitable for small startups",
        "Integration is highly complex and requires dedicated engineers",
        "Limited ecosystem of third-party plugins"
      ],
      opportunities: [
        "Capturing mid-market businesses looking for omnichannel services",
        "Expansion of embedded financial services for SaaS platforms",
        "New regional licenses in emerging markets"
      ],
      threats: [
        "Stripe moving upmarket into enterprise contracts",
        "Decentralized finance networks reducing card processing margins",
        "Increasing strictness in international compliance"
      ]
    },
    reviewKeywords: [
      { word: "Omnichannel POS", count: 42, sentiment: "positive", quote: "The unified terminals let us manage offline retail transactions and web orders under one database." },
      { word: "Direct Acquiring", count: 30, sentiment: "positive", quote: "We save thousands in gateway markup fees by routing directly to local bank acquiring nodes." },
      { word: "High Barrier", count: 28, sentiment: "negative", quote: "Adyen rejected our application because they only accept merchants processing over $100k monthly." },
      { word: "Complex Setup", count: 24, sentiment: "negative", quote: "Integrating custom token validation in our mobile checkout took weeks of back-and-forth debugging." },
      { word: "Contract Negotiations", count: 15, sentiment: "neutral", quote: "Getting custom volume contracts finalized took several weeks of sales reviews." }
    ]
  },
  {
    id: "paddle",
    name: "Paddle",
    domain: "paddle.com",
    industry: "Fintech / Payments",
    description: "Merchant of Record (MoR) for software and SaaS companies, handling global sales tax, billing compliance, and fraud.",
    strategy: "Developer compliance simplification, unified pricing/tax handling, and out-of-the-box merchant of record liability protection.",
    positioning: { x: 65, y: 82 },
    pricing: {
      free: "No monthly fee",
      pro: "5% + 50¢ per txn",
      enterprise: "Custom tier (> $1M ARR)"
    },
    features: {
      api: true,
      sso: false,
      analytics: true,
      mobile: false,
      support247: false
    },
    metrics: {
      speed: 82,
      seo: 80,
      social: 72
    },
    sentiment: {
      positive: 76,
      neutral: 16,
      negative: 8
    },
    swot: {
      strengths: [
        "Acts as Merchant of Record (absorbs sales tax filing liabilities)",
        "Single dashboard for subscriptions, invoicing, and checkouts",
        "Friendly terms for early-stage bootstrapped SaaS companies"
      ],
      weaknesses: [
        "Significantly higher fee percentages (5% + 50¢) than pure gateways",
        "Customers are technically buying from Paddle, which restricts branding",
        "Limited custom subscription customization engines"
      ],
      opportunities: [
        "Providing embedded accounting and SaaS metrics natively",
        "Supporting localized alternative payment methods (APMs)",
        "Capturing non-tech digital content creators and online tools"
      ],
      threats: [
        "Stripe Tax and Stripe Billing lowering tax filing barriers",
        "Regulatory updates changing Merchant of Record compliance definitions",
        "New low-cost compliance aggregators"
      ]
    },
    reviewKeywords: [
      { word: "VAT Compliance", count: 50, sentiment: "positive", quote: "Paddle acts as the Merchant of Record, completely saving us from filing digital VAT sales taxes in 30 countries." },
      { word: "Fast Subscriptions", count: 28, sentiment: "positive", quote: "Setting up monthly software billing tiers took less than half an hour using their pre-built overlays." },
      { word: "High Commission", count: 35, sentiment: "negative", quote: "The 5% txn fee is extremely steep compared to pure gateways when processing high volumes." },
      { word: "Checkout Branding", count: 14, sentiment: "neutral", quote: "Invoices show Paddle as the seller, which causes confusion for some of our non-tech clients." },
      { word: "Merchant of Record", count: 19, sentiment: "neutral", quote: "Since they assume tax liability, they are highly strict about what products are approved for sale." }
    ]
  }
];

export const MOCK_NEWS = [
  { id: 1, time: "10 mins ago", competitor: "Stripe", text: "Stripe announced support for stablecoin settlements (USDC) starting today.", type: "feature" },
  { id: 2, time: "2 hours ago", competitor: "Adyen", text: "Adyen launched new ultra-slim Android POS terminals for retail stores.", type: "hardware" },
  { id: 3, time: "5 hours ago", competitor: "Paddle", text: "Paddle integrated support for Indian UPI and Brazilian Pix payment methods.", type: "payment" },
  { id: 4, time: "1 day ago", competitor: "Stripe", text: "Stripe raised processing limits for early-stage startup grants program.", type: "marketing" },
  { id: 5, time: "2 days ago", competitor: "Adyen", text: "Adyen secured a direct acquiring license in Mexico.", type: "license" }
];

export const INITIAL_ALERT_RULES = [
  { id: "rule-speed", name: "Page Speed Outlier Warning (speed < 80%)", active: true, type: "speed" },
  { id: "rule-seo", name: "SEO Rank Alert (score drops below 80%)", active: true, type: "seo" },
  { id: "rule-pricing", name: "Competitor Pricing Strategy Shift (change detected)", active: true, type: "pricing" },
  { id: "rule-negative", name: "Negative Review Sentiment Spike (> 12%)", active: false, type: "sentiment" }
];

export const INITIAL_ALERT_LOGS = [
  { id: "log-1", severity: "INFO", time: "10 mins ago", title: "Monitoring Active Scopes", text: "Started real-time scraping listeners for competitor domains." },
  { id: "log-2", severity: "WARNING", time: "2 hours ago", title: "Paddle SEO Rank Drop", text: "Paddle SEO score shifted from 82% to 80% due to missing page descriptions." },
  { id: "log-3", severity: "HIGH", time: "5 hours ago", title: "Stripe Price Alert Triggered", text: "Stripe announced 2.9% + 30¢ flat tiers for checkout sub-widgets." },
  { id: "log-4", severity: "INFO", time: "1 day ago", title: "Notion Workspace Synced", text: "Successfully synchronized 3 competitors stats columns to company Notion database." }
];

export const generateCompetitorData = (name, domain, industry, description) => {
  const cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  
  const x = Math.floor(Math.random() * 40) + 50; // 50-90
  const y = Math.floor(Math.random() * 45) + 45; // 45-90
  
  const speed = Math.floor(Math.random() * 20) + 75; // 75-95
  const seo = Math.floor(Math.random() * 25) + 70; // 70-95
  const social = Math.floor(Math.random() * 35) + 55; // 55-90

  const pos = Math.floor(Math.random() * 15) + 65; // 65-80
  const neg = Math.floor(Math.random() * 8) + 2;   // 2-10
  const neu = 100 - pos - neg;

  return {
    id: cleanId,
    name,
    domain,
    industry: industry || "Tech / Software",
    description: description || `AI-powered competitor in the ${industry || "technology"} space focusing on enterprise automation.`,
    strategy: `Agile development lifecycle, strategic customer retention programs, digital-first growth marketing, and scalable pricing models.`,
    positioning: { x, y },
    pricing: {
      free: "14-day Free Trial",
      pro: "$49 / user / month",
      enterprise: "Custom Annual Contract"
    },
    features: {
      api: Math.random() > 0.3,
      sso: Math.random() > 0.5,
      analytics: Math.random() > 0.2,
      mobile: Math.random() > 0.4,
      support247: Math.random() > 0.4
    },
    metrics: { speed, seo, social },
    sentiment: { positive: pos, neutral: neu, negative: neg },
    swot: {
      strengths: [
        `Highly responsive customer onboarding and setup processes`,
        `Modern, clean visual interface and intuitive client UX`,
        `Flexible api integration layers and extensible data models`
      ],
      weaknesses: [
        `Relatively new brand presence compared to industry legacy giants`,
        `Higher price point for mid-market user accounts`,
        `Minor missing automation modules which require manual workarounds`
      ],
      opportunities: [
        `Leverage emerging LLM APIs to deliver custom insights`,
        `Form strategic partnerships with channel distributors`,
        `Expanding marketing presence to non-English regions`
      ],
      threats: [
        `Rapid imitation of core features by larger capitalized competitors`,
        `Talent attrition toward tech-giants offering remote work packages`,
        `Macro-economic spending budget pullbacks across corporate IT`
      ]
    },
    reviewKeywords: [
      { word: "Clean UI", count: 24, sentiment: "positive", quote: "The interface is very polished, dashboard navigation feels fast." },
      { word: "Pricing", count: 18, sentiment: "neutral", quote: "Reasonable entry tiers, but enterprise add-ons scale up quickly." },
      { word: "Setup Support", count: 15, sentiment: "positive", quote: "Got setup queries resolved within an hour during their onboarding call." },
      { word: "Documentation", count: 10, sentiment: "negative", quote: "Some advanced API endpoints aren't documented in their guides." },
      { word: "Mobile Support", count: 8, sentiment: "negative", quote: "The mobile app lacks dashboard chart exports and report building." }
    ]
  };
};

export const MOCK_BOT_RESPONSES = [
  {
    keywords: ["price", "pricing", "cost", "cheap", "expensive"],
    response: "Looking at pricing structures, Stripe charges 2.9% + 30¢, Paddle takes 5% + 50¢ (but includes Sales Tax compliance), and Adyen uses custom Interchange++ models which are cheaper for massive enterprises. If you want to beat them on price, offering a flat subscription rather than transactional fees for low-ticket merchants is an excellent market gap."
  },
  {
    keywords: ["weakness", "vulnerab", "flaw", "gap"],
    response: "Key weaknesses identified: Stripe struggles with sudden account freezes and support responsiveness for smaller merchants. Adyen is inaccessible for startups due to high minimum volume requirements. Paddle restricts direct branding because they act as the Merchant of Record. Capitalizing on prompt 24/7 personal customer support is a major differentiator."
  },
  {
    keywords: ["strength", "advantage", "benefit", "good"],
    response: "Stripe's developer ecosystem and API integration speed is unmatched. Adyen's omnichannel POS terminal + online card acquiring network is incredibly strong. Paddle's tax compliance coverage saves SaaS companies from global filing headaches. Any competitor must either equal Stripe's developer experience or offer unique services like tax localization."
  },
  {
    keywords: ["trend", "market", "future", "opportunity"],
    response: "Current market trends show high customer demand for alternative localized checkout methods (Pix, UPI, Klarna), real-time stablecoin payouts, and autonomous AI fraud prevention. Gaps exist in providing instant cross-border settlement for remote work contracts."
  }
];

export const getBotResponse = (message) => {
  const msg = message.toLowerCase();
  for (const item of MOCK_BOT_RESPONSES) {
    if (item.keywords.some(kw => msg.includes(kw))) {
      return item.response;
    }
  }
  return "That is a great question. Based on our AI's scrape of competitor websites, industry reports, and sentiment logs, it appears their primary focus is scaling their core infrastructure. To gain an advantage here, we should target their underserved developer experience and focus on local payment methods.";
};
