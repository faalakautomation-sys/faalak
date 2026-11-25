export const SITE_ORIGIN = "https://www.faalak.com";
export const SITEMAP_LASTMOD = "2026-11-25";
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
  title: "AI Receptionist for GTA Businesses | Faalak",
  description:
    "Faalak's AI receptionist answers every call 24/7, books appointments and sends you the details on WhatsApp. Based in Mississauga, serving the GTA.",
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
    title: "AI Receptionist for the GTA | After-Hours Answering",
    description:
      "AI receptionist for the GTA and Canada. Answer calls, take messages and book after hours. Based in Mississauga, serving the GTA.",
  },
  "service:voice-agents": {
    title: "AI Voice Agents for the GTA | Faalak",
    description:
      "Custom AI voice agents for the GTA and Canada. Qualify leads, handle inbound calls and automate phone workflows. Based in Mississauga, serving the GTA.",
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
  "industry:hvac": {
    title: "HVAC Answering Service in Toronto & GTA | AI | Faalak",
    description:
      "Faalak's AI voice agent answers HVAC calls 24/7 on your number, flags urgent no-heat calls, books in your hours and sends details by WhatsApp + SMS.",
    serviceName: "AI answering service for HVAC companies",
    audienceType: "HVAC companies",
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
  const title = override.title ?? `${item.name} | Faalak AI Automation`;
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

  return {
    title,
    description,
    path,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        service,
        breadcrumbList([
          { name: "Home", url: `${SITE_ORIGIN}/` },
          { name: item.name, url: canonicalUrl(path) },
        ]),
      ],
    },
  };
}

export const workSeo = {
  title: "Case Studies | Faalak AI Automation",
  description:
    "See how Faalak's AI voice agents and automation helped real businesses across retail, real estate, wellness, and more capture more leads and answer faster.",
  path: "/work",
  jsonLd: webPageGraph({
    title: "Case Studies | Faalak AI Automation",
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
  const title = `${study.title} Case Study | Faalak AI Automation`;
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
  title: "Data Handling & Security Overview | Faalak AI Automation",
  description:
    "How Faalak's AI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details.",
  path: "/data-security",
  jsonLd: webPageGraph({
    title: "Data Handling & Security Overview | Faalak AI Automation",
    description:
      "How Faalak's AI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details.",
    path: "/data-security",
    crumbs: [
      { name: "Home", url: `${SITE_ORIGIN}/` },
      { name: "Data security", url: canonicalUrl("/data-security") },
    ],
  }),
};

export function resourceSeo(slug, topic) {
  const path = `/resources/${slug}`;
  const title = `${topic.title} | Faalak Resources`;
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
  title: "What Is Superintelligence? Understanding the Next AI Frontier | Faalak",
  description:
    "A clear guide to superintelligence: what SI means, how it differs from today's AI, and how businesses can adopt automation responsibly.",
  path: "/blog/superintelligence",
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

export const notFoundSeo = {
  title: "Page Not Found | Faalak",
  description: "The page you are looking for does not exist or may have moved.",
  indexable: false,
};
