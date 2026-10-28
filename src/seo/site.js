export const SITE_ORIGIN = "https://www.faalak.com";
export const SITEMAP_LASTMOD = "2026-10-28";
export const GSC_VERIFICATION = "kw7QtcUAao4kvMRalu0WyQ3d_YD0Kyz_lgWHMt_GpVw";
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
export const PHONE_DISPLAY = "+1 416 910 4547";
export const PHONE_SCHEMA = "+1-416-910-4547";

export const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Faalak",
  url: `${SITE_ORIGIN}/`,
  email: ["info@faalak.com", "sales@faalak.com"],
  telephone: PHONE_SCHEMA,
  sameAs: ["https://www.linkedin.com/company/faalak-ai-automation/"],
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "Country", name: "Canada" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_SCHEMA,
      contactType: "customer service",
      email: "info@faalak.com",
      areaServed: "CA",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: PHONE_SCHEMA,
      contactType: "sales",
      email: "sales@faalak.com",
      areaServed: "CA",
      availableLanguage: ["English"],
    },
  ],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Faalak",
  url: `${SITE_ORIGIN}/`,
  telephone: PHONE_SCHEMA,
  email: "info@faalak.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Toronto",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ontario",
      },
    },
    {
      "@type": "Country",
      name: "Canada",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Faalak",
  url: `${SITE_ORIGIN}/`,
};

function canonicalFor(path) {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

function serviceJsonLd(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.title,
    description: page.description,
    url: page.canonical,
    provider: {
      "@type": "Organization",
      name: "Faalak",
      telephone: PHONE_SCHEMA,
      url: `${SITE_ORIGIN}/`,
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "Country", name: "Canada" },
    ],
  };
}

function webPageJsonLd(page) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: page.canonical,
    isPartOf: { "@type": "WebSite", name: "Faalak", url: `${SITE_ORIGIN}/` },
    about: { "@type": "Organization", name: "Faalak" },
  };
}

function articleJsonLd(page) {
  return {
    "@context": "https://schema.org",
    "@type": page.schemaType || "Article",
    headline: page.h1,
    description: page.description,
    url: page.canonical,
    mainEntityOfPage: page.canonical,
    datePublished: page.datePublished,
    dateModified: page.dateModified || page.datePublished,
    author: { "@type": "Organization", name: "Faalak" },
    publisher: { "@type": "Organization", name: "Faalak", url: `${SITE_ORIGIN}/` },
  };
}

function decorate(page) {
  const canonical = canonicalFor(page.path);
  const full = { ...page, canonical, robots: page.robots || INDEX_ROBOTS, ogType: page.ogType || "website" };
  const jsonLd = [organizationJsonLd];

  if (page.path === "/") {
    jsonLd.push(localBusinessJsonLd, websiteJsonLd);
  } else if (page.kind === "service") {
    jsonLd.push(serviceJsonLd(full));
  } else if (page.kind === "article") {
    jsonLd.push(articleJsonLd(full));
  } else {
    jsonLd.push(webPageJsonLd(full));
  }

  return { ...full, jsonLd };
}

const pageDefs = [
  {
    path: "/",
    title: "AI Voice Agents & Receptionists | Faalak Toronto",
    description:
      "Faalak builds AI voice agents and virtual receptionists for Toronto and Canada businesses—answer calls, book after-hours, and qualify leads 24/7.",
    h1: "AI voice agents and virtual receptionists for Toronto businesses",
    paragraphs: [
      "Faalak builds AI voice agents and virtual receptionists for Toronto and Canada businesses—answer calls, book after-hours, and qualify leads 24/7.",
      "The team handles inbound calls, appointment booking, and lead qualification around the clock for companies in Toronto, ON, Canada.",
      `Call ${PHONE_DISPLAY}, or email info@faalak.com and sales@faalak.com.`,
    ],
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/services/voice-agents",
    kind: "service",
    title: "AI Voice Agents Toronto | Faalak Canada",
    description:
      "Custom AI voice agents for Toronto and Canada—qualify leads, handle inbound calls, and automate phone workflows. Built by Faalak.",
    h1: "AI voice agents for Toronto and Canada",
    paragraphs: [
      "Custom AI voice agents for Toronto and Canada qualify leads, handle inbound calls, and automate phone workflows.",
      "Faalak voice agents run full conversations for inbound support, outbound campaigns, and follow-up, using scripts from the business.",
    ],
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/services/ai-receptionist",
    kind: "service",
    title: "AI Receptionist Toronto | After-Hours Answering",
    description:
      "AI receptionist for Toronto and Canadian businesses—answer calls, take messages, book after hours. Talk to Faalak about virtual reception.",
    h1: "AI receptionist and after-hours answering for Canadian businesses",
    paragraphs: [
      "Faalak's virtual receptionist answers calls, takes messages, and books after hours for Toronto and Canadian businesses.",
      "It greets callers, answers common questions, and routes urgent calls without a hold queue, using the business's existing phone number.",
    ],
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/services/owner-operated-voice-agents",
    kind: "service",
    title: "Owner-Operated AI Voice Agents | Faalak",
    description:
      "Owner-operated AI voice agents for small Toronto and Canada businesses that need reliable phone coverage without a full reception desk.",
    h1: "Owner-operated AI voice agents for growing businesses",
    paragraphs: [
      "Owner-operated AI voice agents give small Toronto and Canada businesses reliable phone coverage, including after hours, without a full reception desk.",
      "Keep the existing business number. The agent answers when the owner is with a customer, on a job, or away from the phone, then captures details and books qualified leads.",
    ],
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/services/chatbot-automation",
    kind: "service",
    title: "Chatbot Automation Toronto | Faalak",
    description:
      "Chatbot automation for Toronto and Canadian companies—qualify visitors and hand off to voice or sales. Explore Faalak chatbot services.",
    h1: "Chatbot automation for Canadian businesses",
    paragraphs: [
      "Chatbot automation for Toronto and Canadian companies qualifies visitors on the website and WhatsApp, then hands hot leads to voice or sales.",
      "The chatbot answers from the business's own content and captures contact details instead of letting visitors leave without a next step.",
    ],
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/services/ai-automation",
    kind: "service",
    title: "AI Automation Toronto | Faalak Canada",
    description:
      "AI automation for Toronto and Canada businesses—connect calls, chats, and leads to the CRM without manual data entry. Built by Faalak.",
    h1: "AI automation for Toronto and Canada businesses",
    paragraphs: [
      "Faalak connects voice agents, chatbots, and lead capture to the CRM, calendar, and spreadsheets a Toronto or Canada business already uses.",
      "Information moves without manual copy-paste, including reminder flows and follow-up sequences.",
    ],
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/services/lead-generation",
    kind: "service",
    title: "AI Lead Generation Toronto | Faalak",
    description:
      "AI-assisted lead generation for Toronto and Canada businesses—capture and qualify inbound interest with voice and automation from Faalak.",
    h1: "AI lead generation for Toronto businesses",
    paragraphs: [
      "AI-assisted lead generation for Toronto and Canada businesses captures and qualifies inbound interest with voice and automation from Faalak.",
      "Calls and chats are screened against the business's own criteria, and ready-to-buy conversations are routed to the sales team.",
    ],
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/services/ai-digital-ads",
    kind: "service",
    title: "AI Digital Ads Toronto | Faalak",
    description:
      "AI-assisted digital ads for Toronto and Canada businesses. Faalak ties campaign leads to voice and chatbot follow-up.",
    h1: "AI digital ads for Toronto businesses",
    paragraphs: [
      "Faalak runs and optimizes paid campaigns for Toronto and Canada businesses, then connects the resulting leads to voice agent and chatbot follow-up.",
      "Reporting stays tied to leads and booked calls rather than clicks alone.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/services/ai-enterprise-infrastructure",
    kind: "service",
    title: "AI Enterprise Infrastructure | Faalak",
    description:
      "Multi-location AI voice and chat infrastructure for Canadian businesses, with custom integrations and onboarding from Faalak.",
    h1: "AI enterprise infrastructure for Canadian businesses",
    paragraphs: [
      "Faalak designs AI voice and chat infrastructure for multi-location Canadian businesses that have outgrown a single-agent setup.",
      "Deployments include custom integrations, dedicated onboarding, and reporting across locations and teams.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/work",
    title: "Case Studies | Faalak Toronto",
    description:
      "Case studies of businesses using Faalak AI voice agents and automation to answer calls and capture inbound leads.",
    h1: "Case studies",
    paragraphs: [
      "Real businesses using Faalak voice agents and automation to answer calls and keep inbound leads moving.",
      "Each study describes the phone or chat problem, what Faalak deployed, and how the workflow changed.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/work/furniture-store",
    kind: "article",
    schemaType: "Article",
    title: "Furniture Store Case Study | Faalak",
    description:
      "A furniture store used Faalak to answer showroom inquiries, product questions, and consultation bookings.",
    h1: "Furniture Store",
    paragraphs: [
      "AI handled showroom inquiries, answered product questions, and booked consultations automatically.",
      "Website and phone questions about stock, pricing, and custom orders were pulling showroom staff away from customers in the store. Faalak deployed a voice agent and website chatbot trained on the catalog so common questions were answered immediately.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/work/real-estate-agency",
    kind: "article",
    schemaType: "Article",
    title: "Real Estate Agency Case Study | Faalak",
    description:
      "A real estate agency used Faalak to qualify buyer leads and schedule viewings without waiting until the next business day.",
    h1: "Real Estate Agency",
    paragraphs: [
      "The voice agent qualified buyer leads, routed hot prospects, and scheduled viewings.",
      "Listing inquiries were going cold before agents could call back, especially outside office hours. The agent answers inquiries, qualifies budget and timeline, and books viewings onto agent calendars.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/work/massage-therapy-studio",
    kind: "article",
    schemaType: "Article",
    title: "Massage & Therapy Studio Case Study | Faalak",
    description:
      "A massage and therapy studio used Faalak to manage booking requests, service questions, and reminders.",
    h1: "Massage & Therapy Studio",
    paragraphs: [
      "Faalak managed booking requests, answered service questions, and sent reminders.",
      "Front-desk staff were spending call time on bookings and reminders instead of clients in the studio. Voice and WhatsApp automation now handles those requests.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/work/landscaping-company",
    kind: "article",
    schemaType: "Article",
    title: "Landscaping Company Case Study | Faalak",
    description:
      "A landscaping company used Faalak to capture quote requests and qualify site visits outside office hours.",
    h1: "Landscaping Company",
    paragraphs: [
      "The voice agent captured quote requests, qualified site visits, and followed up with customers.",
      "Evening and weekend quote requests often waited until the next business day. The agent captures each request, qualifies the job scope, and follows up until a site visit is booked.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/work/dental-clinic",
    kind: "article",
    schemaType: "Article",
    title: "Dental Clinic Case Study | Faalak",
    description:
      "A dental clinic used Faalak's AI receptionist to answer FAQs, book visits, and follow up with patients.",
    h1: "Dental Clinic",
    paragraphs: [
      "Faalak's receptionist answered FAQs, booked visits, and followed up with patients around the clock.",
      "Patients calling outside clinic hours were reaching voicemail, and missed-appointment follow-up was inconsistent. The receptionist answers FAQs, books and confirms visits, and follows up after a missed appointment.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/work/auto-repair-shop",
    kind: "article",
    schemaType: "Article",
    title: "Auto Repair Shop Case Study | Faalak",
    description:
      "An auto repair shop used Faalak to handle booking requests, common repair questions, and service reminders.",
    h1: "Auto Repair Shop",
    paragraphs: [
      "The voice agent handled booking requests, answered common repair questions, and sent service reminders.",
      "Technicians were being interrupted to answer questions about repair status and availability. The agent now takes booking requests and common questions so technicians stay on the vehicles in the bay.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/data-security",
    title: "Data Handling & Security | Faalak",
    description:
      "How Faalak handles client and caller data for its AI voice systems—ownership, hosting, access, and compliance documents available on request.",
    h1: "Committed to security, privacy and responsible data handling.",
    paragraphs: [
      "A clear overview of how Faalak's AI systems handle client and caller data, where safeguards apply, and what documentation is available.",
      "Faalak's automation, CRM, and integration layer is built and owned in-house. Telephony, voice, and language-model providers host their portions of the pipeline. Faalak's CRM and lead database are hosted at InterServer's New Jersey data center. SOC 2 Type II and ISO 27001 references on the page apply to that hosting provider's facility, not to a Faalak certification.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/blog/superintelligence",
    kind: "article",
    schemaType: "BlogPosting",
    datePublished: "2026-10-08",
    dateModified: "2026-10-08",
    ogType: "article",
    title: "What Is Superintelligence? | Faalak",
    description:
      "A clear guide to superintelligence: what the term means, how it differs from today's AI, and how businesses can adopt automation responsibly.",
    h1: "What Is Superintelligence? Understanding the Next AI/SI Frontier",
    paragraphs: [
      "Superintelligence describes a hypothetical form of intelligence that would exceed human capabilities across most important cognitive tasks. It is not a description of today's business voice agents or chatbots.",
      "Faalak uses AI/SI to talk about both practical automation businesses can use today and the wider discussion about future superintelligence. Current services are voice agents, chat, and workflow automation. Faalak does not claim to offer superintelligence.",
    ],
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/industries/real-estate",
    title: "Real Estate AI Agents | Faalak Toronto",
    description:
      "AI voice automation for real estate teams in Toronto and Canada—qualify buyer and renter leads, answer listing questions, and book viewings.",
    h1: "AI voice agents for real estate teams in Toronto",
    paragraphs: [
      "Every listing inquiry is a race to respond. Faalak answers, qualifies budget and timeline, and books viewings onto agent calendars for Toronto and Canada brokerages.",
      "Hot prospects can be routed to the right agent, and quieter leads can be followed up without waiting until the next morning.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/retail-stores",
    title: "Retail Store AI Answering | Faalak",
    description:
      "AI phone and chat answering for retail stores in Toronto and Canada—stock, hours, and order questions without pulling staff off the floor.",
    h1: "AI phone answering for retail stores in Toronto",
    paragraphs: [
      "A ringing phone should not pull staff away from customers on the floor. Faalak answers stock, hours, and order questions and forwards only the calls that need a person.",
      "The agent works with the store's existing phone number and can handle more than one call at a time.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/hospitality",
    title: "Hospitality AI Answering | Faalak",
    description:
      "AI answering for hotels and restaurants in Toronto and Canada—bookings, availability, and guest questions without an overnight phone desk.",
    h1: "AI reservation answering for hospitality businesses",
    paragraphs: [
      "Guests book and ask questions at all hours. Faalak handles reservations, availability, and common guest questions so a venue is not staffing a phone desk overnight.",
      "Special requests can still be escalated to staff, and the flow works with the existing booking system.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/showrooms",
    title: "Showroom AI Phone Agents | Faalak",
    description:
      "AI phone agents for showrooms in Toronto and Canada—qualify product interest, answer pricing questions, and book appointments.",
    h1: "AI phone agents for showroom teams",
    paragraphs: [
      "Showroom staff are most useful with the customer in front of them. Faalak answers product and pricing questions, qualifies interest, and books appointments.",
      "Calls that genuinely need someone off the floor are escalated. Other visitors can be followed up automatically.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/physiotherapy",
    title: "Physiotherapy AI Reception | Faalak",
    description:
      "AI reception for physiotherapy clinics in Toronto and Canada—book, confirm, and reschedule visits and answer common patient questions.",
    h1: "AI appointment answering for physiotherapy clinics",
    paragraphs: [
      "Physiotherapy patients call between sessions with scheduling changes and simple questions. Faalak books, confirms, and reschedules appointments and answers common questions about sessions and pricing.",
      "Automated reminders cut down on no-shows, and the clinic keeps its existing phone number and booking system.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/dental",
    title: "Dental AI Receptionist | Faalak",
    description:
      "AI receptionist for dental practices in Toronto and Canada—answer patient calls, book visits, and follow up after missed appointments.",
    h1: "AI receptionist for dental practices in Toronto",
    paragraphs: [
      "A missed call is often a missed patient. Faalak answers patient calls, including after hours, books and confirms appointments, and follows up when a visit is missed.",
      "Common questions about services can be answered without adding front-desk headcount.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/massage-and-spa",
    title: "Massage & Spa AI Booking | Faalak",
    description:
      "AI booking for massage and spa businesses in Toronto and Canada—treatment questions, appointments, and reminders without leaving a client.",
    h1: "AI booking for massage and spa businesses",
    paragraphs: [
      "Therapists should not have to leave a client to answer the phone. Faalak handles booking requests, treatment and pricing questions, and appointment reminders.",
      "The flow syncs with the existing booking system and keeps the team with the client in the room.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/hvac",
    title: "HVAC AI Call Answering | Faalak",
    description:
      "AI call answering for HVAC companies in Toronto and Canada—capture service requests, qualify urgency, and book technician visits.",
    h1: "AI call answering for HVAC companies",
    paragraphs: [
      "HVAC calls do not wait for business hours. Faalak answers, qualifies urgency and job details, and books technician visits onto the schedule.",
      "Quote requests can be followed up automatically, using the company's existing dispatch tools.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/roofing",
    title: "Roofing AI Lead Capture | Faalak",
    description:
      "AI lead capture for roofing companies in Toronto and Canada—storm-damage and quote calls qualified and booked as estimates.",
    h1: "AI lead capture for roofing companies",
    paragraphs: [
      "Roofing leads go cold quickly when nobody answers. Faalak captures storm-damage and quote calls, qualifies the job, and books estimate appointments.",
      "Crews spend time on roofs instead of chasing every ring, including during storm season.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/plumbing",
    title: "Plumbing AI Call Answering | Faalak",
    description:
      "AI call answering for plumbing companies in Toronto and Canada—emergency and routine calls qualified and booked around the clock.",
    h1: "AI call answering for plumbing companies",
    paragraphs: [
      "The first plumber to answer usually gets the job. Faalak answers emergency and routine calls, qualifies the issue, and books technician visits.",
      "Reminders go out automatically, and the shop keeps its existing dispatch and scheduling tools.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/landscaping",
    title: "Landscaping AI Quotes | Faalak",
    description:
      "AI quote capture for landscaping companies in Toronto and Canada—after-hours requests qualified and booked as site visits.",
    h1: "AI quote capture for landscaping companies",
    paragraphs: [
      "Evening and weekend quote requests often wait until the next business day. Faalak captures each request, qualifies the job, and books site visits.",
      "Quieter quotes are followed up so crews stay booked through the season.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/auto-dealership",
    title: "Auto Dealership AI Agents | Faalak",
    description:
      "AI voice agents for auto dealerships in Toronto and Canada—qualify buyers, answer vehicle questions, and book test drives.",
    h1: "AI voice agents for auto dealerships",
    paragraphs: [
      "Car buyers move fast. Faalak answers vehicle and financing questions, qualifies interest, and books test drives onto sales calendars.",
      "Serious buyers can be routed to the right salesperson, and quieter leads can be followed up.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/furniture-store",
    title: "Furniture Store AI Agents | Faalak",
    description:
      "AI phone and chat agents for furniture stores in Toronto and Canada—stock, delivery, custom orders, and showroom consultations.",
    h1: "AI phone answering for furniture stores",
    paragraphs: [
      "Furniture buyers ask about stock, custom lead times, delivery windows, and financing before they commit. Faalak answers those questions and books showroom consultations.",
      "Floor staff stay with in-person customers while phone and chat keep moving.",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/industries/medium-to-big-business",
    title: "Enterprise AI Voice Coverage | Faalak",
    description:
      "AI voice and chat coverage for medium and large businesses in Toronto and Canada—consistent answering across teams and locations.",
    h1: "AI voice coverage for growing Canadian businesses",
    paragraphs: [
      "As call volume grows, coverage gets uneven. Faalak gives departments and locations the same voice and chat answering, with one place to see how it is performing.",
      "The rollout integrates with tools the organization already runs and can scale with headcount and call volume.",
    ],
    changefreq: "monthly",
    priority: "0.6",
  },
];

export const indexablePages = pageDefs.map(decorate);

const pagesByPath = new Map(indexablePages.map((page) => [page.path, page]));

export const notFoundSeo = {
  path: null,
  title: "Page Not Found | Faalak",
  description: "This page does not exist on the Faalak site.",
  h1: "Page not found",
  paragraphs: [
    "The page you requested is not on faalak.com. Use the links below to reach the homepage, services, or contact details.",
    `Faalak is in Toronto, ON, Canada. Call ${PHONE_DISPLAY} or email info@faalak.com.`,
  ],
  canonical: null,
  robots: "noindex, follow",
  ogType: "website",
  noindex: true,
  jsonLd: [organizationJsonLd],
};

export function normalizePath(pathname) {
  if (!pathname) return "/";
  const withoutQuery = String(pathname).split("?")[0].split("#")[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery || "/";
}

export function resolveSeo(pathname) {
  return pagesByPath.get(normalizePath(pathname)) || notFoundSeo;
}

export function renderSitemap(pages = indexablePages) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${page.canonical}</loc>
    <lastmod>${SITEMAP_LASTMOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
