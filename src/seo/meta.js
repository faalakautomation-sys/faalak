export const SITE_ORIGIN = "https://www.faalak.com";
export const SITEMAP_LASTMOD = "2026-11-26";
export const OG_IMAGE_URL = `${SITE_ORIGIN}/og-banner.jpg`;

export const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const AREA_SERVED = [
  { "@type": "City", name: "Toronto" },
  { "@type": "City", name: "Mississauga" },
  { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
  { "@type": "Country", name: "Canada" },
];

export function canonicalUrl(path) {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

function breadcrumbList(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function webPageGraph({ title, description, path, crumbs }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        url: canonicalUrl(path),
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      breadcrumbList(crumbs),
    ],
  };
}

export const homeSeo = {
  title: "AI Receptionist & AI Voice Agents in Canada | Faalak",
  description:
    "Faalak is a Mississauga AI receptionist provider. Our AI voice agents answer your calls 24/7 on your number, book appointments and send details by WhatsApp + SMS.",
  path: "/",
};

export function homeJsonLd(faqItems) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Faalak",
        alternateName: "Faalak AI Automation",
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/favicon.png`,
        description:
          "Mississauga-based AI voice agent and AI receptionist provider. Answers your business calls 24/7 on your existing number, books appointments during your booking hours and sends you each caller's name, number and reason by WhatsApp + SMS. Serving Toronto, the GTA and Canada.",
        telephone: "+1-416-910-4547",
        email: "info@faalak.com",
        foundingDate: "2025",
        address: {
          "@type": "PostalAddress",
          streetAddress: "50 Burnhamthorpe Rd. West",
          addressLocality: "Mississauga",
          addressRegion: "ON",
          postalCode: "L5L 3M9",
          addressCountry: "CA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        areaServed: AREA_SERVED,
        sameAs: [
          "https://www.linkedin.com/company/faalak-ai-automation/",
          "https://www.hotfrog.ca/company/AaGvvWeycTu5hG2_0q6rfw",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Faalak services",
          itemListElement: [
            "AI Voice Agent",
            "AI Receptionist",
            "Chatbot",
            "Inbound Calls",
            "Outbound Calls",
            "Marketing Notifications",
            "Booking System",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: "Faalak",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "en-CA",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      breadcrumbList([{ name: "Home", url: `${SITE_ORIGIN}/` }]),
    ],
  };
}

const CATEGORY_OVERRIDES = {
  "service:ai-receptionist": {
    title: "AI Receptionist Provider in Toronto & Canada | Faalak",
    description:
      "An AI receptionist that answers every call 24/7 on your existing number, answers from your FAQs, books in your hours and sends details by WhatsApp + SMS.",
  },
  "service:after-hours-answering": {
    title: "After-Hours Answering Service Canada | Faalak",
  },
  "service:voice-agents": {
    title: "AI Voice Agents in Canada for Small Business | Faalak",
    description:
      "Custom AI voice agents for Canadian businesses: answer inbound calls 24/7, qualify leads with your questions and get each caller's details by WhatsApp + SMS.",
  },
  "service:owner-operated-voice-agents": {
    title: "Owner-Operated AI Voice Agents | Faalak",
    description:
      "Owner-operated AI voice agents for small GTA and Canada businesses that need reliable phone coverage without a full reception desk.",
  },
  "service:lead-generation": {
    title: "AI Lead Generation for the GTA | Faalak",
    description:
      "AI-assisted lead generation for the GTA and Canada. Capture and qualify inbound interest with voice and automation from Faalak.",
  },
  "service:chatbot-automation": {
    title: "Chatbot Automation for the GTA | Faalak",
    description:
      "Chatbot automation for GTA and Canadian companies. Qualify visitors and hand off to voice or sales. Based in Mississauga, serving the GTA.",
  },
  "service:ai-automation": {
    title: "AI Automation for the GTA | Faalak",
  },
  "service:ai-digital-ads": {
    title: "AI Digital Ads | Faalak",
  },
  "service:ai-enterprise-infrastructure": {
    title: "AI Enterprise Infrastructure | Faalak",
  },
  "industry:medium-to-big-business": {
    title: "AI Automation for Larger Teams | Faalak",
  },
  "industry:retail-stores": {
    title: "AI Receptionist for Retail Stores | Faalak",
  },
  "industry:hospitality": {
    title: "Hospitality Call Answering | Faalak",
  },
  "industry:showrooms": {
    title: "Showroom Call Answering | Faalak",
  },
  "industry:physiotherapy": {
    title: "Physiotherapy Call Answering | Faalak",
  },
  "industry:dental": {
    title: "Dental Practice Call Answering | Faalak",
  },
  "industry:massage-and-spa": {
    title: "AI Receptionist for Massage & Spa in Toronto | Faalak",
    description:
      "Faalak's AI receptionist answers spa and massage clinic calls 24/7, answers from your FAQs, books in your hours and sends details by WhatsApp + SMS.",
  },
  "industry:hvac": {
    title: "HVAC Answering Service in Toronto & GTA | AI | Faalak",
    description:
      "Faalak's AI voice agent answers HVAC calls 24/7 on your number, flags urgent no-heat calls, books in your hours and sends details by WhatsApp + SMS.",
    serviceName: "AI answering service for HVAC companies",
    audienceType: "HVAC companies",
  },
  "industry:roofing": {
    title: "Roofing Call Answering | Faalak",
  },
  "industry:plumbing": {
    title: "Plumbing Call Answering | Faalak",
  },
  "industry:landscaping": {
    title: "Landscaping Answering Service in Toronto & GTA | Faalak",
    description:
      "Never miss a quote request. Faalak's AI voice agent answers landscaping calls 24/7, asks your questions, books site visits in your hours and texts you.",
  },
  "industry:auto-dealership": {
    title: "Auto Dealership Call Answering | Faalak",
  },
  "industry:furniture-store": {
    title: "AI Receptionist for Furniture Stores in Canada | Faalak",
    description:
      "Faalak's AI receptionist answers furniture store calls 24/7 from your own FAQs, books showroom visits in your hours and sends details by WhatsApp + SMS.",
  },
  "industry:real-estate": {
    title: "AI Receptionist for Real Estate Agents in Canada | Faalak",
    description:
      "Faalak's AI receptionist answers buyer and seller calls 24/7, qualifies leads with your questions, books showings in your hours and texts you via WhatsApp + SMS.",
    serviceName: "AI receptionist for real estate agents",
    audienceType: "Real estate agents and brokerages",
  },
};

export function categorySeo(kind, item) {
  const base = kind === "service" ? "/services" : "/industries";
  const path = `${base}/${item.slug}`;
  const override = CATEGORY_OVERRIDES[`${kind}:${item.slug}`] ?? {};
  const title = override.title ?? `${item.name} | Faalak`;
  const description = override.description ?? item.metaDescription;
  const serviceName = override.serviceName ?? item.name;

  const service = {
    "@type": "Service",
    "@id": `${canonicalUrl(path)}#service`,
    name: serviceName,
    serviceType: kind === "industry" ? "AI receptionist / AI voice agent" : item.name,
    description,
    url: canonicalUrl(path),
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    areaServed: AREA_SERVED,
  };

  if (override.audienceType) {
    service.audience = { "@type": "BusinessAudience", audienceType: override.audienceType };
  }

  const graph = [
    service,
    breadcrumbList([
      { name: "Home", url: `${SITE_ORIGIN}/` },
      { name: item.name, url: canonicalUrl(path) },
    ]),
  ];

  if (Array.isArray(item.faqs) && item.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: item.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return {
    title,
    description,
    path,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": graph,
    },
  };
}

export const workSeo = {
  title: "Case Studies | Faalak",
  description:
    "See how Faalak's AI voice agents and automation helped real businesses across retail, real estate, wellness, and more capture more leads and answer faster.",
  path: "/work",
  jsonLd: webPageGraph({
    title: "Case Studies | Faalak",
    description:
      "See how Faalak's AI voice agents and automation helped real businesses across retail, real estate, wellness, and more capture more leads and answer faster.",
    path: "/work",
    crumbs: [
      { name: "Home", url: `${SITE_ORIGIN}/` },
      { name: "Case studies", url: canonicalUrl("/work") },
    ],
  }),
};

export function caseStudySeo(study) {
  const path = `/work/${study.slug}`;
  const title = `${study.title} Case Study | Faalak`;
  const description = `${study.summary} See how Faalak's AI voice agent and automation helped this ${study.industry.toLowerCase()} business.`;
  return {
    title,
    description,
    path,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: study.title,
          description,
          url: canonicalUrl(path),
          author: { "@type": "Organization", name: "Faalak", url: `${SITE_ORIGIN}/` },
          publisher: { "@id": `${SITE_ORIGIN}/#organization` },
          mainEntityOfPage: canonicalUrl(path),
        },
        breadcrumbList([
          { name: "Home", url: `${SITE_ORIGIN}/` },
          { name: "Case studies", url: canonicalUrl("/work") },
          { name: study.title, url: canonicalUrl(path) },
        ]),
      ],
    },
  };
}

export const dataSecuritySeo = {
  title: "Data Handling & Security | Faalak",
  description:
    "How Faalak's AI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details.",
  path: "/data-security",
  jsonLd: webPageGraph({
    title: "Data Handling & Security | Faalak",
    description:
      "How Faalak's AI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details.",
    path: "/data-security",
    crumbs: [
      { name: "Home", url: `${SITE_ORIGIN}/` },
      { name: "Data security", url: canonicalUrl("/data-security") },
    ],
  }),
};

const RESOURCE_TITLES = {
  "case-studies": "Automation Case Study Guides | Faalak",
  "how-it-works": "How an AI Receptionist Works: Calls, Booking, Alerts | Faalak",
  security: "Call Data Security Guide | Faalak",
  "guides-insights": "Guides & Insights | Faalak",
  blog: "AI Receptionist & Voice Agent Blog | Faalak",
  "live-demos": "Voice Agent Demo Checklist | Faalak",
  faqs: "AI Receptionist FAQs for Canadian Businesses | Faalak",
};

export function resourceSeo(slug, topic) {
  const path = `/resources/${slug}`;
  const title = RESOURCE_TITLES[slug] ?? `${topic.title} | Faalak`;
  return {
    title,
    description: topic.description,
    path,
    type: "article",
    jsonLd: webPageGraph({
      title,
      description: topic.description,
      path,
      crumbs: [
        { name: "Home", url: `${SITE_ORIGIN}/` },
        { name: topic.title, url: canonicalUrl(path) },
      ],
    }),
  };
}

export const bookingSeo = {
  title: "Book an Appointment | Faalak",
  description:
    "Choose a time to book a 15-minute consultation with Faalak. Available Monday through Saturday in Toronto time.",
  path: "/book-appointment",
  jsonLd: webPageGraph({
    title: "Book an Appointment | Faalak",
    description:
      "Choose a time to book a 15-minute consultation with Faalak. Available Monday through Saturday in Toronto time.",
    path: "/book-appointment",
    crumbs: [
      { name: "Home", url: `${SITE_ORIGIN}/` },
      { name: "Book an appointment", url: canonicalUrl("/book-appointment") },
    ],
  }),
};

export function legalSeo({ title, description, path }) {
  const pageTitle = `${title} | Faalak`;
  return {
    title: pageTitle,
    description,
    path,
    jsonLd: webPageGraph({
      title: pageTitle,
      description,
      path,
      crumbs: [
        { name: "Home", url: `${SITE_ORIGIN}/` },
        { name: title, url: canonicalUrl(path) },
      ],
    }),
  };
}

export const superintelligenceSeo = {
  title: "What Is Superintelligence? | Faalak",
  description:
    "A clear guide to superintelligence: what SI means, how it differs from today's AI, and how businesses can adopt automation responsibly.",
  path: "/blog/superintelligence",
  indexable: false,
  type: "article",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: "What Is Superintelligence? Understanding the Next AI Frontier",
        description:
          "A clear guide to superintelligence, how it differs from today's AI, and responsible business adoption.",
        datePublished: "2026-10-08",
        dateModified: "2026-10-08",
        author: { "@type": "Organization", name: "Faalak" },
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        mainEntityOfPage: canonicalUrl("/blog/superintelligence"),
      },
      breadcrumbList([
        { name: "Home", url: `${SITE_ORIGIN}/` },
        {
          name: "What Is Superintelligence? Understanding the Next AI Frontier",
          url: canonicalUrl("/blog/superintelligence"),
        },
      ]),
    ],
  },
};

export const voiceAgentsCanadaFaqs = [
  {
    question: "What is an AI voice agent?",
    answer:
      "An AI voice agent is software that answers phone calls in natural conversation. It handles common questions, books appointments and captures leads.",
  },
  {
    question: "Do you serve businesses outside Toronto?",
    answer: "Yes. Faalak is based in Mississauga and serves businesses in Toronto, the GTA and across Canada.",
  },
  {
    question: "Can it book appointments?",
    answer: "Yes. It books appointments during the booking hours you set.",
  },
  {
    question: "What happens with urgent calls?",
    answer: "The agent flags them, and the caller's details reach you right away by WhatsApp + SMS.",
  },
  {
    question: "Do I need a new phone number?",
    answer: "No. It answers on your existing number.",
  },
  {
    question: "How do I get started?",
    answer: "Call +1 416-910-4547 to hear a live demo, then book a consultation and we'll map out your setup.",
  },
];

export const voiceAgentsCanadaSeo = {
  title: "AI Voice Agents in Canada | 24/7 Call Answering | Faalak",
  description:
    "Faalak builds AI voice agents for Canadian businesses. Answer every call 24/7, qualify leads, book appointments and get call summaries by WhatsApp + SMS.",
  path: "/ai-voice-agents-canada",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "AI voice agent",
        name: "AI Voice Agents in Canada",
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: { "@type": "Country", name: "Canada" },
        url: canonicalUrl("/ai-voice-agents-canada"),
      },
      {
        "@type": "FAQPage",
        mainEntity: voiceAgentsCanadaFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      breadcrumbList([
        { name: "Home", url: `${SITE_ORIGIN}/` },
        { name: "AI Voice Agents in Canada", url: canonicalUrl("/ai-voice-agents-canada") },
      ]),
    ],
  },
};

export const notFoundSeo = {
  title: "Page Not Found | Faalak",
  description: "The page you are looking for does not exist or may have moved.",
  indexable: false,
};
