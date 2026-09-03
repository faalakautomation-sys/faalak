import {
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMessageSquare,
  FiPenTool,
  FiPhoneCall,
  FiSettings,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import { FaBalanceScale, FaCrown } from 'react-icons/fa'
import logo from './3.png'
import arrow_icon from './arrow_icon.svg'
import group_profile from './group_profile.png'
import bgImage2 from './bgImage2.png'
import hero_cover from './bg-image.png'
import ads_icon from './ads_icon.svg'
import content_icon from './content_icon.svg'
import marketing_icon from './marketing_icon.svg'
import social_icon from './social_icon.svg'
import menu_icon from './menu_icon.svg'
import close_icon from './close_icon.svg'
import work_mobile_app from './work_mobile_app.png'
import work_fitness_app from './work_fitness_app.png'
import work_dashboard_management from './work_dashboard_management.png'
import email_icon from './email_icon.svg'
import person_icon from './person_icon.svg'
import facebook_icon from './facebook_icon.svg'
import twitter_icon from './twitter_icon.svg'
import instagram_icon from './instagram_icon.svg'
import linkedin_icon from './linkedin_icon.svg'
import logo_dark from './2.png'
import menu_icon_dark from './menu_icon_dark.svg'
import sun_icon from './sun_icon.svg'
import moon_icon from './moon_icon.svg'


export const trustedBrands = [
  "OpenAI",
  "Vapi",
  "Retell AI",
  "Twilio",
  "Make.com",
  "Zapier",
  "Google Sheets",
]

export const servicesData = [
  {
    title: "Retell AI Voice Agents",
    description: "Powerful, human-like voice agents powered by Retell AI. Handle inbound calls, qualify leads, and book appointments 24/7 with natural conversations.",
    benefits: ["Retell AI powered", "Natural voice", "Lead qualification"],
    detail: "Handles overflow and after-hours calls so a real team member only steps in once a lead is qualified and ready to talk.",
    icon: FiPhoneCall,
  },
  {
    title: "Outbound Call Campaigns",
    description: "Launch automated outbound calling campaigns with Retell AI. Reach customers at scale with personalized, natural-sounding voice interactions.",
    benefits: ["Retell AI technology", "Personalized calls", "Campaign automation"],
    detail: "Runs follow-up and re-engagement campaigns automatically, so cold leads get a consistent second touch without manual dialing.",
    icon: FiPhoneCall,
  },
  {
    title: "Website AI Chatbots",
    description: "Turn every website visitor into a qualified lead with smart, brand-aligned chat automation powered by advanced AI technology.",
    benefits: ["Real-time engagement", "Intent-based routing", "Lead capture"],
    detail: "Trained on your own site content and FAQs, so answers stay accurate and on-brand instead of generic chatbot replies.",
    icon: FiMessageSquare,
  },
  {
    title: "Appointment Booking Systems",
    description: "Let AI book, confirm, and reschedule appointments while reducing missed opportunities. Seamless integration with your calendar.",
    benefits: ["Automated scheduling", "Reminder flows", "Reduced admin work"],
    detail: "Syncs directly with your existing calendar, so double-bookings and manual back-and-forth over available slots disappear.",
    icon: FiCalendar,
  },
  {
    title: "CRM & Integration Layer",
    description: "Sync every interaction into your CRM, spreadsheets, and reporting tools without manual work. Keep all your data centralized.",
    benefits: ["Zero manual entry", "Real-time sync", "Clear reporting"],
    detail: "Works with the CRM and spreadsheet tools you already use, so there's nothing new for your team to learn.",
    icon: FiDatabase,
  },
  {
    title: "Voice Agent Customization",
    description: "Custom-trained voice agents tailored to your exact business needs. Fine-tune conversational flows and response behaviors.",
    benefits: ["Custom training", "Behavior tuning", "Brand voice"],
    detail: "We fine-tune tone, scripts, and edge-case handling with you until the agent sounds like part of your team, not a generic bot.",
    icon: FiSettings,
  },
]

export const caseStudies = [
  {
    title: "Furniture Store",
    industry: "Retail & Home Design",
    summary: "AI handled showroom inquiries, answered product questions, and booked consultations automatically.",
    metrics: ["+38% qualified leads", "2 min avg. response", "92% satisfaction"],
  },
  {
    title: "Real Estate Agency",
    industry: "Property Sales",
    summary: "AI qualified buyer leads in real time, routed hot prospects, and scheduled viewings without delay.",
    metrics: ["+52% lead capture", "Under 30 sec response", "89% booking rate"],
  },
  {
    title: "Massage & Therapy Studio",
    industry: "Wellness & Recovery",
    summary: "AI managed booking requests, answered service questions, and sent instant reminders to reduce no-shows.",
    metrics: ["+31% bookings", "1 min response time", "97% reminder delivery"],
  },
  {
    title: "Landscaping Company",
    industry: "Outdoor Services",
    summary: "AI captured quote requests, qualified site visits, and followed up with customers 24/7.",
    metrics: ["+44% quote requests", "Same-day follow-up", "85% lead conversion"],
  },
  {
    title: "Dental Clinic",
    industry: "Healthcare",
    summary: "AI answered FAQs, booked visits, and followed up with patients round-the-clock.",
    metrics: ["+27% appointments", "1 min response time", "4.8/5 satisfaction"],
  },
  {
    title: "Auto Repair Shop",
    industry: "Automotive Services",
    summary: "AI handled booking requests, answered common repair questions, and sent service reminders automatically.",
    metrics: ["+35% service bookings", "Under 2 min reply", "90% reminder completion"],
  },
]

export const whyChooseUsData = [
  {
    title: "24/7 Availability",
    description: "Your AI receptionist works around the clock so no lead goes unanswered.",
    detail: "Nights, weekends, and holidays included — the same coverage a full call center shift would give you, without the shift schedule.",
    icon: FiClock,
  },
  {
    title: "Human-Like Conversations",
    description: "Natural voice and chat experiences that feel premium, clear, and trustworthy.",
    detail: "Built on Retell AI's natural voice models and trained on your own scripts, so callers stay focused on getting help, not spotting a bot.",
    icon: FiMessageSquare,
  },
  {
    title: "Fast Deployment",
    description: "Launch in days, not months, with a streamlined setup and onboarding process.",
    detail: "We handle script writing, integrations, and testing, so your team's only real task is a short review call before go-live.",
    icon: FiZap,
  },
  {
    title: "Custom AI Training",
    description: "We tailor flows, scripts, and automations to your exact business rules.",
    detail: "Every flow is written around how your business actually operates, not a generic template forced to fit.",
    icon: FiTarget,
  },
  {
    title: "CRM Integration",
    description: "Connect calls, chats, and leads directly to your CRM and reporting tools.",
    detail: "No exported spreadsheets or manual copy-paste — every lead lands in your CRM the moment the conversation ends.",
    icon: FiBarChart2,
  },
  {
    title: "Scalable Automation",
    description: "Built to grow with your team, your channels, and your customer volume.",
    detail: "Handles a quiet Tuesday and a 10x traffic spike the same way — no re-provisioning or extra hires required.",
    icon: FiLayers,
  },
]

export const faqData = [
  {
    question: "What does Faalak AI Automation actually do?",
    answer: "We build AI voice agents, WhatsApp automation, and website chatbots that answer every call and chat, qualify leads, and book appointments for your business — 24/7, without you hiring extra staff.",
  },
  {
    question: "Will my customers know they're talking to AI?",
    answer: "Our voice agents are powered by Retell AI and trained on your business's own scripts and tone, so conversations sound natural and human-like. Most callers focus on getting their question answered, not on who's answering.",
  },
  {
    question: "Does the AI actually book appointments, or just answer questions?",
    answer: "Both. It can answer FAQs and qualify what the caller needs, then book, confirm, or reschedule appointments directly on your calendar — reducing missed opportunities without any manual back-and-forth.",
  },
  {
    question: "Can it connect to my CRM and calendar?",
    answer: "Yes. Every call, chat, and lead syncs automatically into your CRM, spreadsheets, or reporting tools in real time — no manual data entry required.",
  },
  {
    question: "Do I need to replace my current phone system or website?",
    answer: "No. The AI voice agent works alongside your existing phone number, and the chatbot embeds directly into your current website — nothing needs to be rebuilt or replaced.",
  },
  {
    question: "How long does it take to get set up?",
    answer: "Most businesses are live within days, not months. We handle the setup, script training, and integrations so you can start capturing leads quickly.",
  },
  {
    question: "What kind of businesses is this built for?",
    answer: "We work with service businesses that live or die by fast response — retail, real estate, wellness and therapy studios, home services, healthcare, and automotive, among others. If missed calls cost you leads, this is built for you.",
  },
  {
    question: "Can I try it before committing?",
    answer: "Absolutely — click \"Watch Demo\" or \"Talk to Maya\" anywhere on this page to speak with our own AI voice agent live, or book a free consultation and we'll walk you through a version built around your business.",
  },
];

export const testimonialsData = [
  {
    name: "Sarah M.",
    role: "Owner, Bright Smile Dental",
    quote:
      "We used to lose calls every time we were mid-appointment. Now the AI answers instantly, books the slot, and it's already on our calendar before the patient even hangs up.",
    rating: 5,
    detail: "Missed-call rate dropped to near zero within the first two weeks of going live.",
  },
  {
    name: "James R.",
    role: "Founder, Apex Home Services",
    quote:
      "Faalak's voice agent sounds so natural our customers don't realize it's AI until we tell them. Missed calls dropped to almost zero in the first month.",
    rating: 5,
    detail: "Now answers every after-hours emergency call instead of routing straight to voicemail.",
  },
  {
    name: "Priya K.",
    role: "Manager, Real Estate Group",
    quote:
      "Leads get qualified and synced to our CRM automatically now. Our team only talks to people who are actually ready to move forward — huge time saver.",
    rating: 5,
    detail: "Agents now spend their time on qualified viewings instead of screening cold inquiries.",
  },
  {
    name: "Daniel O.",
    role: "Owner, Wellness & Therapy Studio",
    quote:
      "Setup took a few days, not months like we expected. The WhatsApp automation alone has probably paid for itself twice over already.",
    rating: 4,
    detail: "Went from first call to fully live automation in under a week.",
  },
];

export const teamData = [
  {
    name: "Asiya .J",
    role: "Founder & CEO",
    icon: FaCrown,
    bio: "Sets the vision for Faalak and leads the team building AI voice agents and automation for growing businesses.",
  },
  {
    name: "Nofil .I",
    role: "Head of AI Engineering",
    icon: FiCpu,
    bio: "Designs and ships the voice agent, chatbot, and automation systems that power every Faalak deployment.",
  },
  {
    name: "Barrister Bahadur Bukhari",
    role: "Business Lawyer and Legal Advisor",
    icon: FaBalanceScale,
    bio: "Advises on contracts, compliance, and legal structure so Faalak and its clients operate on solid ground.",
  },
  {
    name: "Madiha",
    role: "Content Creative Designer",
    icon: FiPenTool,
    bio: "Shapes Faalak's brand voice and visual identity across the website, campaigns, and client-facing materials.",
  },
  {
    name: "Pritam",
    role: "SEO Expert & Marketing Specialist",
    icon: FiTrendingUp,
    bio: "Drives organic growth and campaign strategy so Faalak's automation reaches the businesses that need it most.",
  },
];

const assets = {
  logo,
  arrow_icon,
  group_profile,
  bgImage2,
  hero_cover,
  ads_icon,
  content_icon,
  marketing_icon,
  social_icon,
  menu_icon,
  close_icon,
  work_mobile_app,
  work_fitness_app,
  work_dashboard_management,
  email_icon,
  person_icon,
  facebook_icon,
  twitter_icon,
  instagram_icon,
  linkedin_icon,
  logo_dark,
  menu_icon_dark,
  sun_icon,
  moon_icon
}

export default assets