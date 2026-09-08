import {
  FiBriefcase,
  FiCoffee,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiKey,
  FiMessageSquare,
  FiMic,
  FiPhoneCall,
  FiServer,
  FiShoppingBag,
  FiShoppingCart,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
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
import ecommerceBrandsImage from "../assets/category/cat-ecommerce-brands.jpg";
import fintechBrandsImage from "../assets/category/cat-fintech-brands.jpg";
import mediumToBigBusinessImage from "../assets/category/cat-medium-to-big-business.png";
import realEstateImage from "../assets/category/cat-real-estate.jpg";
import storeImage from "../assets/category/cat-store.webp";
import mortgageImage from "../assets/category/cat-mortgage.jpeg";
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
    slug: "ecommerce-brands",
    name: "Ecommerce Brands",
    icon: FiShoppingBag,
    image: ecommerceBrandsImage,
    tagline: "Answer order questions and recover carts before they're lost.",
    metaDescription:
      "AI voice and chat automation for ecommerce brands - instant order support, cart recovery conversations, and 24/7 customer service that scales with sales spikes.",
    description:
      "Ecommerce support doesn't stop at 5pm and neither do your customers. Our AI handles order status, shipping questions, and returns instantly, and reaches out proactively on abandoned carts - all while syncing with your store platform.",
    highlights: [
      "Instant answers on order status, shipping, and returns",
      "Proactive cart-recovery conversations via chat or WhatsApp",
      "Scales automatically during sales spikes and launches",
      "Syncs with your existing store and CRM platform",
      "Frees your team to focus on escalations, not repetitive questions",
    ],
  },
  {
    slug: "fintech-brands",
    name: "Fintech Brands",
    icon: FiDollarSign,
    image: fintechBrandsImage,
    tagline: "Fast, compliant support for a customer base that expects both.",
    metaDescription:
      "AI automation for fintech brands - fast, accurate support for account and product questions, with conversations logged for compliance and review.",
    description:
      "Fintech customers expect speed and accuracy in equal measure. Our AI answers account and product questions using your approved scripts, escalates anything sensitive to a human immediately, and keeps a full record of every conversation.",
    highlights: [
      "Answers built strictly from your approved scripts and disclosures",
      "Immediate escalation for anything sensitive or account-specific",
      "Full conversation logging for compliance and review",
      "24/7 coverage for a customer base that doesn't keep office hours",
      "Reduces wait times without touching your core banking systems",
    ],
  },
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
    slug: "mortgage",
    name: "Mortgage",
    icon: FiKey,
    image: mortgageImage,
    tagline: "Qualify borrower inquiries before they reach your loan officers.",
    metaDescription:
      "AI voice automation for mortgage brokers and lenders - qualifies borrower inquiries, answers common questions, and routes ready applicants to loan officers.",
    description:
      "Mortgage inquiries come in around the clock, often outside office hours. Our AI answers common borrower questions, captures the details your team needs, and routes qualified applicants straight to a loan officer.",
    highlights: [
      "Captures borrower details before the first human call",
      "Answers common rate, term, and process questions",
      "Routes qualified applicants directly to loan officers",
      "Available outside standard office hours",
      "Every inquiry logged and synced to your CRM",
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
  { title: "Commerce & Finance", slugs: ["ecommerce-brands", "fintech-brands", "mortgage"] },
  { title: "Property & Hospitality", slugs: ["real-estate", "hospitality", "showrooms"] },
  { title: "Business & Retail", slugs: ["medium-to-big-business", "retail-stores"] },
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
