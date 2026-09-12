import {
  FiActivity,
  FiBriefcase,
  FiCoffee,
  FiGrid,
  FiHome,
  FiMessageSquare,
  FiMic,
  FiPhoneCall,
  FiServer,
  FiShoppingCart,
  FiTarget,
  FiTool,
  FiTrendingUp,
  FiWind,
  FiZap,
} from "react-icons/fi";
import { FaCar, FaCouch, FaHardHat, FaLeaf, FaSpa, FaTooth } from "react-icons/fa";
import { caseStudies } from "../assets/assets";
import servicesTeaserImage from "../assets/teaser-services.jpg";
import industriesTeaserImage from "../assets/teaser-industries.jpg";
import workTeaserImage from "../assets/teaser-work.jpeg";
import aiReceptionistImage from "../assets/category/cat-ai-receptionist.jpeg";
import voiceAgentsImage from "../assets/category/cat-voice-agents.jpg";
import chatbotAutomationImage from "../assets/category/cat-chatbot-automation.jpg";
import aiAutomationImage from "../assets/category/cat-ai-automation.jpg";
import leadGenerationImage from "../assets/category/cat-lead-generation.jpeg";
import aiDigitalAdsImage from "../assets/category/cat-ai-digital-ads.jpg";
import aiEnterpriseInfrastructureImage from "../assets/category/cat-ai-enterprise-infrastructure.png";
import mediumToBigBusinessImage from "../assets/category/cat-medium-to-big-business.png";
import realEstateImage from "../assets/category/cat-real-estate.jpg";
import storeImage from "../assets/category/cat-store.webp";
import hospitalityImage from "../assets/category/cat-hospitality.jpg";
import showroomsImage from "../assets/category/cat-showrooms.jpg";

// Powers both the Navbar's Services/Industries dropdowns and each item's own
// SEO landing page (/services/:slug, /industries/:slug) - one source of
// truth so the menu and the pages it links to never drift apart.

export const servicesMenu = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    icon: FiPhoneCall,
    image: aiReceptionistImage,
    tagline: "A always-on front desk that never puts a caller on hold.",
    metaDescription:
      "Faalak's AI receptionist answers every call, greets customers by name, routes urgent calls, and books appointments 24/7 - so no caller ever hits voicemail.",
    description:
      "Your AI receptionist greets every caller in real time, answers common questions, and routes anything urgent to the right person - all without a hold queue or a missed call. It works around your existing phone number, so nothing about your setup has to change.",
    highlights: [
      "Answers instantly, 24/7 - including nights, weekends, and holidays",
      "Greets callers by name and pulls context from your CRM",
      "Books, confirms, and reschedules appointments on your calendar",
      "Routes urgent or high-value calls straight to your team",
      "Trained on your own scripts, tone, and FAQs",
    ],
    whoFor: "Front desks, clinics, salons, and any business where a ringing phone is a lead walking away.",
  },
  {
    slug: "voice-agents",
    name: "Voice Agents",
    icon: FiMic,
    image: voiceAgentsImage,
    tagline: "Human-like AI voice agents for sales, support, and follow-up.",
    metaDescription:
      "Deploy Retell AI-powered voice agents that handle inbound support, outbound sales calls, and follow-up campaigns with natural, human-like conversation.",
    description:
      "Beyond front-desk reception, our voice agents run full conversations - qualifying inbound sales calls, handling support questions, and executing outbound campaigns - powered by Retell AI's natural voice models trained on your business's own scripts.",
    highlights: [
      "Natural, human-like conversation - not a robotic IVR menu",
      "Handles inbound support and outbound campaigns alike",
      "Qualifies leads in real time before handing off to your team",
      "Custom conversational flows built around your business rules",
      "Full call transcripts and sentiment logged automatically",
    ],
    whoFor: "Sales teams, support desks, and any business running high call volume that needs consistent quality.",
  },
  {
    slug: "chatbot-automation",
    name: "ChatBot Automation",
    icon: FiMessageSquare,
    image: chatbotAutomationImage,
    tagline: "Turn every website and WhatsApp visitor into a qualified lead.",
    metaDescription:
      "AI chatbot automation for your website and WhatsApp - real-time, brand-aligned conversations that qualify leads and capture contact details around the clock.",
    description:
      "Your website and WhatsApp chatbot engages visitors the moment they land, answers questions using your own content, and captures qualified leads instead of letting them bounce - all styled to match your brand.",
    highlights: [
      "Embeds directly into your existing website - no rebuild required",
      "Trained on your own site content and FAQs for accurate answers",
      "Intent-based routing sends hot leads to a human instantly",
      "Works across web chat and WhatsApp from one flow",
      "Every conversation logged and synced to your CRM",
    ],
    whoFor: "Any business whose website gets traffic but loses too many visitors before they reach out.",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: FiZap,
    image: aiAutomationImage,
    tagline: "Connect the busywork between your tools so nothing falls through.",
    metaDescription:
      "Faalak's AI automation layer connects your calls, chats, and leads directly into your CRM, spreadsheets, and reporting tools - with zero manual data entry.",
    description:
      "We wire your voice agents, chatbots, and lead capture directly into the tools you already run your business on - CRM, spreadsheets, calendars, and reporting - so information moves automatically instead of through manual copy-paste.",
    highlights: [
      "Zero manual data entry between calls, chats, and your CRM",
      "Works with the tools you already use - no forced migration",
      "Automated reminder flows and follow-up sequences",
      "Real-time sync, not overnight batch exports",
      "Clear reporting so you always know what's happening",
    ],
    whoFor: "Growing teams juggling too many disconnected tools and manual handoffs.",
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    icon: FiTarget,
    image: leadGenerationImage,
    tagline: "Qualified leads captured and routed the moment they show interest.",
    metaDescription:
      "AI-driven lead generation that captures, qualifies, and routes leads from every call, chat, and campaign straight to your sales team in real time.",
    description:
      "Every call and chat is a potential lead - our AI captures contact details, qualifies intent against your own criteria, and routes only the ready-to-buy conversations to your sales team, so your team's time goes to prospects worth pursuing.",
    highlights: [
      "Qualifies leads against your own criteria, not a generic script",
      "Captures contact details from every call, chat, and form",
      "Routes hot leads to sales in real time, not end-of-day",
      "Nurtures cooler leads automatically until they're ready",
      "Full visibility into where every lead came from",
    ],
    whoFor: "Sales-driven businesses that need more qualified conversations, not just more traffic.",
  },
  {
    slug: "ai-digital-ads",
    name: "AI Digital Ads",
    icon: FiTrendingUp,
    image: aiDigitalAdsImage,
    tagline: "Campaigns that adapt to what's actually converting.",
    metaDescription:
      "AI-optimized digital advertising that continuously tests creative and targeting, then routes every resulting lead straight into your automation pipeline.",
    description:
      "We run and optimize your paid campaigns with AI-assisted targeting and creative testing, then connect the results directly into your voice agent and chatbot pipeline - so ad spend turns into booked calls, not just clicks.",
    highlights: [
      "Continuous creative and audience testing, not a set-and-forget campaign",
      "Every lead flows straight into your voice agent or chatbot follow-up",
      "Clear cost-per-lead and cost-per-booking reporting",
      "Budget reallocated automatically toward what's converting",
      "Works across the major ad platforms your customers are on",
    ],
    whoFor: "Businesses spending on ads who want spend tied directly to booked calls, not vanity metrics.",
  },
  {
    slug: "ai-enterprise-infrastructure",
    name: "AI Enterprise Infrastructure",
    icon: FiServer,
    image: aiEnterpriseInfrastructureImage,
    tagline: "Multi-location, multi-team AI systems built to scale.",
    metaDescription:
      "Enterprise-grade AI infrastructure from Faalak - multi-location voice and chat automation, custom integrations, and dedicated support built to scale with you.",
    description:
      "For larger organizations, we design and deploy AI voice and chat infrastructure across multiple locations, teams, and systems - with custom integrations, dedicated onboarding, and the reliability a growing enterprise needs.",
    highlights: [
      "Multi-location and multi-team deployment from one control layer",
      "Custom integrations with your existing enterprise systems",
      "Dedicated onboarding and ongoing account support",
      "Built to handle high call and chat volume reliably at scale",
      "Centralized reporting across every location and channel",
    ],
    whoFor: "Multi-location businesses and enterprises that have outgrown a single-agent setup.",
  },
];

export const industriesMenu = [
  {
    slug: "medium-to-big-business",
    name: "Medium to Big Business",
    icon: FiBriefcase,
    image: mediumToBigBusinessImage,
    tagline: "Automation that scales across departments, not just one desk.",
    metaDescription:
      "AI voice and chat automation built for medium to large businesses - consistent coverage across departments, locations, and teams, all centrally reported.",
    description:
      "As you grow, consistency gets harder to maintain call to call. Our AI voice and chat automation gives every department and location the same reliable coverage, with one dashboard to see how it's all performing.",
    highlights: [
      "Consistent coverage across every department and location",
      "Centralized reporting instead of siloed, per-team tracking",
      "Integrates with the enterprise tools you already run",
      "Scales up or down with headcount and call volume",
      "Dedicated onboarding for multi-team rollouts",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: FiHome,
    image: realEstateImage,
    tagline: "Qualify buyer and renter leads before your agents ever call back.",
    metaDescription:
      "AI automation for real estate agencies - qualifies buyer and renter leads in real time, schedules viewings, and routes hot prospects straight to agents.",
    description:
      "Every listing inquiry is a race against the next agency to respond. Our AI answers instantly, qualifies budget and timeline, and books viewings directly onto your agents' calendars - so your team only calls back people who are ready.",
    highlights: [
      "Qualifies buyer/renter budget and timeline in real time",
      "Books property viewings directly onto agent calendars",
      "Answers listing questions instantly, day or night",
      "Routes hot prospects straight to the right agent",
      "Follows up automatically on leads that go quiet",
    ],
  },
  {
    slug: "retail-stores",
    name: "Store",
    icon: FiShoppingCart,
    image: storeImage,
    tagline: "Answer stock, hours, and order questions without pulling staff off the floor.",
    metaDescription:
      "AI phone and chat automation for retail stores - answers stock, hours, and order questions instantly, so staff stay focused on customers in front of them.",
    description:
      "A ringing phone shouldn't pull staff away from customers on the floor. Our AI answers stock availability, store hours, and order questions instantly, and only forwards calls that genuinely need a person.",
    highlights: [
      "Answers stock, hours, and location questions instantly",
      "Keeps staff focused on customers physically in-store",
      "Forwards only the calls that truly need a person",
      "Handles multiple simultaneous calls without a queue",
      "Works with your existing store phone number",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: FiCoffee,
    image: hospitalityImage,
    tagline: "Handle bookings and guest questions without an overnight desk.",
    metaDescription:
      "AI automation for hotels, restaurants, and hospitality venues - handles bookings, availability, and guest questions 24/7 without staffing an overnight desk.",
    description:
      "Guests book and ask questions at all hours, not just business hours. Our AI handles reservations, availability, and common guest questions around the clock, so you're not staffing a phone desk overnight to catch them.",
    highlights: [
      "Handles bookings and availability questions 24/7",
      "Answers common guest questions instantly",
      "Reduces the need for an overnight phone desk",
      "Syncs with your existing booking/reservation system",
      "Escalates special requests to staff automatically",
    ],
  },
  {
    slug: "showrooms",
    name: "Showrooms",
    icon: FiGrid,
    image: showroomsImage,
    tagline: "Qualify walk-in and phone interest before staff step away from the floor.",
    metaDescription:
      "AI phone automation for showrooms - qualifies product interest, books appointments, and answers common questions so floor staff stay with in-person customers.",
    description:
      "Showroom staff are most valuable in front of an interested customer, not on the phone. Our AI answers product and pricing questions, books appointments, and only escalates calls that genuinely need someone off the floor.",
    highlights: [
      "Answers product and pricing questions instantly",
      "Books showroom appointments directly onto your calendar",
      "Keeps floor staff focused on in-person customers",
      "Qualifies serious interest before an appointment is booked",
      "Follows up automatically with visitors who didn't convert",
    ],
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapists",
    icon: FiActivity,
    tagline: "Keep the schedule full and answer patient questions without leaving the treatment table.",
    metaDescription:
      "AI voice and chat automation for physiotherapy clinics - books and confirms appointments, answers common patient questions, and reduces no-shows around the clock.",
    description:
      "Physiotherapy patients often call between sessions with scheduling changes or simple questions your front desk shouldn't have to drop treatment to answer. Our AI books, confirms, and reschedules appointments, answers common questions about sessions and pricing, and sends automated reminders that cut down on no-shows.",
    highlights: [
      "Books, confirms, and reschedules appointments automatically",
      "Answers common questions about treatments, pricing, and preparation",
      "Sends automated reminders to reduce no-shows",
      "Frees front-desk staff to focus on patients in the clinic",
      "Works around your existing phone number and booking system",
    ],
  },
  {
    slug: "dental",
    name: "Dental Practices",
    icon: FaTooth,
    tagline: "Answer every patient call and keep the chair schedule full, day or night.",
    metaDescription:
      "AI voice automation for dental practices - answers patient calls, books and confirms appointments, and follows up on missed visits without adding front-desk staff.",
    description:
      "A missed call is often a missed patient. Our AI answers every call instantly, books and confirms appointments directly on your calendar, and automatically follows up with patients who miss a visit, so your front desk stays focused on the people in your waiting room.",
    highlights: [
      "Answers every patient call, including after hours",
      "Books and confirms appointments directly on your calendar",
      "Follows up automatically on missed and rescheduled visits",
      "Answers common questions about services and insurance",
      "Reduces front-desk workload without adding headcount",
    ],
  },
  {
    slug: "massage-and-spa",
    name: "Massage & Spa",
    icon: FaSpa,
    tagline: "Handle bookings and treatment questions without stepping away from a client.",
    metaDescription:
      "AI automation for massage and spa businesses - handles bookings, answers treatment and pricing questions, and sends reminders that reduce no-shows.",
    description:
      "Therapists and estheticians shouldn't have to leave a client mid-treatment to answer the phone. Our AI handles booking requests, answers common questions about treatments and pricing, and sends automated reminders, so your team stays focused on the client in the room.",
    highlights: [
      "Handles booking requests without interrupting treatments",
      "Answers common questions about services and pricing",
      "Sends automated appointment reminders",
      "Reduces no-shows and last-minute cancellations",
      "Syncs with your existing booking system",
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    icon: FiWind,
    tagline: "Capture every service call, especially the emergency ones after hours.",
    metaDescription:
      "AI voice automation for HVAC companies - captures service requests, qualifies job urgency, and books technician visits around the clock, including after-hours emergencies.",
    description:
      "HVAC emergencies don't wait for business hours, and neither do your competitors. Our AI answers every call, qualifies urgency and job details, and books technician visits directly onto your schedule, so an after-hours breakdown becomes a booked job instead of a voicemail.",
    highlights: [
      "Answers emergency and routine service calls 24/7",
      "Qualifies job urgency and details before dispatch",
      "Books technician visits directly onto your schedule",
      "Follows up automatically on quote requests",
      "Works with your existing dispatch and scheduling tools",
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    icon: FaHardHat,
    tagline: "Turn every storm-damage call into a booked estimate, not a missed opportunity.",
    metaDescription:
      "AI automation for roofing companies - captures leads from storm-damage and quote calls, qualifies the job, and books estimates automatically.",
    description:
      "Roofing leads spike after storms and go cold fast if nobody answers. Our AI captures every call and web inquiry, qualifies the scope of the job, and books estimate appointments directly onto your calendar, so your crews spend time on roofs, not on the phone.",
    highlights: [
      "Captures every storm-damage and quote-request call",
      "Qualifies job scope before an estimate is booked",
      "Books estimate appointments directly onto your calendar",
      "Follows up automatically on quotes that go quiet",
      "Available around the clock during storm season",
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: FiTool,
    tagline: "Never miss an emergency call again, day or night.",
    metaDescription:
      "AI voice automation for plumbing companies - answers emergency and routine service calls, qualifies the job, and books technician visits 24/7.",
    description:
      "A burst pipe doesn't wait for morning, and the first plumber to answer usually gets the job. Our AI answers every call instantly, qualifies the issue, and books technician visits directly onto your schedule, so emergency calls turn into booked jobs instead of missed opportunities.",
    highlights: [
      "Answers emergency and routine calls around the clock",
      "Qualifies the issue before a technician is dispatched",
      "Books service visits directly onto your schedule",
      "Sends automated appointment reminders",
      "Works with your existing dispatch and scheduling tools",
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: FaLeaf,
    tagline: "Capture quote requests and keep crews booked through the season.",
    metaDescription:
      "AI automation for landscaping companies - captures quote requests, qualifies the job, and books site visits automatically, even outside business hours.",
    description:
      "Quote requests coming in evenings and weekends often go unanswered until the next business day, losing ground to faster-responding competitors. Our AI captures every request immediately, qualifies the job scope, and follows up automatically until a site visit is booked.",
    highlights: [
      "Captures quote requests immediately, day or night",
      "Qualifies job scope before a site visit is booked",
      "Books site visits directly onto your calendar",
      "Follows up automatically on quotes that go quiet",
      "Keeps crews booked throughout the season",
    ],
  },
  {
    slug: "auto-dealership",
    name: "Auto Dealership",
    icon: FaCar,
    tagline: "Qualify buyer interest and book test drives before a lead goes cold.",
    metaDescription:
      "AI voice and chat automation for auto dealerships - qualifies buyer interest, answers vehicle questions, and books test drives directly onto sales calendars.",
    description:
      "Car buyers move fast, and the dealership that responds first usually wins the sale. Our AI answers vehicle and financing questions instantly, qualifies buyer interest, and books test drives directly onto your sales team's calendar, so every lead gets a fast response.",
    highlights: [
      "Answers vehicle and financing questions instantly",
      "Qualifies buyer interest and budget in real time",
      "Books test drives directly onto sales calendars",
      "Follows up automatically on leads that go quiet",
      "Routes serious buyers straight to the right salesperson",
    ],
  },
  {
    slug: "furniture-store",
    name: "Furniture Store",
    icon: FaCouch,
    tagline: "Answer stock, delivery, and custom-order questions without pulling staff off the showroom floor.",
    metaDescription:
      "AI voice and chat automation for furniture stores - answers stock, pricing, delivery, and custom-order questions instantly, and books showroom consultations 24/7.",
    description:
      "Furniture buyers ask a lot before they commit - what's in stock, lead times on custom pieces, delivery windows, financing options. Our AI answers all of it instantly across phone and chat, and books showroom consultations directly onto your calendar, so your team spends its time with customers who are ready to buy.",
    highlights: [
      "Answers stock, pricing, and delivery-window questions instantly",
      "Handles custom-order and lead-time enquiries around the clock",
      "Books showroom consultations directly onto your calendar",
      "Keeps floor staff focused on in-person customers",
      "Follows up automatically with visitors who didn't buy",
    ],
  },
];

export function findMenuItem(list, slug) {
  return list.find((item) => item.slug === slug) || null;
}

// Groups items into labeled columns for the Navbar's mega-menu, and gives
// each menu a "teaser" panel (icon tile + blurb + link) - reference slugs
// into the flat arrays above instead of duplicating data, so a menu item's
// content only ever lives in one place.
export const servicesGroups = [
  { title: "Voice AI", slugs: ["ai-receptionist", "voice-agents"] },
  { title: "Automation", slugs: ["chatbot-automation", "ai-automation", "lead-generation"] },
  { title: "Growth & Scale", slugs: ["ai-digital-ads", "ai-enterprise-infrastructure"] },
];

export const industriesGroups = [
  { title: "Property & Hospitality", slugs: ["real-estate", "hospitality", "showrooms"] },
  { title: "Business & Retail", slugs: ["medium-to-big-business", "retail-stores", "auto-dealership", "furniture-store"] },
  { title: "Health & Wellness", slugs: ["physiotherapy", "dental", "massage-and-spa"] },
  { title: "Home & Trade Services", slugs: ["hvac", "roofing", "plumbing", "landscaping"] },
];

export const servicesTeaser = {
  image: servicesTeaserImage,
  heading: "Why voice-first automation wins",
  blurb: "See how an AI voice agent answers, qualifies, and books in one seamless call.",
  href: "/services/voice-agents",
  linkLabel: "Learn more",
};

export const industriesTeaser = {
  image: industriesTeaserImage,
  heading: "Built around your industry",
  blurb: "Every flow is tailored to how your specific industry actually operates day to day.",
  href: "/industries/medium-to-big-business",
  linkLabel: "Learn more",
};

// Resolves a group's slugs into full item objects for rendering.
export function resolveGroups(groups, list) {
  return groups.map((group) => ({
    title: group.title,
    items: group.slugs.map((slug) => findMenuItem(list, slug)).filter(Boolean),
  }));
}

// "Our Work" mega-menu - shaped like servicesMenu/industriesMenu (slug +
// name + icon) so it drops into the same MegaMenu component, sourced from
// the richer caseStudies records in assets.js (which the /work/:slug page
// reads directly for the full case study content).
export const workMenu = caseStudies.map((study) => ({
  slug: study.slug,
  name: study.title,
  icon: FiBriefcase,
}));

export const workGroups = [
  { title: "Retail & Property", slugs: ["furniture-store", "real-estate-agency"] },
  { title: "Wellness & Home Services", slugs: ["massage-therapy-studio", "landscaping-company"] },
  { title: "Healthcare & Automotive", slugs: ["dental-clinic", "auto-repair-shop"] },
];

export const workTeaser = {
  image: workTeaserImage,
  heading: "Real results, real businesses",
  blurb: "See how six different businesses use Faalak to capture more leads and answer faster.",
  href: "/work",
  linkLabel: "View all case studies",
};
