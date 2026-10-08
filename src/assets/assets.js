import {
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMessageSquare,
  FiMapPin,
  FiPenTool,
  FiPhoneCall,
  FiUserCheck,
  FiSettings,
  FiTarget,
  FiBell,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import { FaBalanceScale, FaCrown } from 'react-icons/fa'
import logo from './3.png'
import logo_dark from './2.png'
import arrow_icon from './arrow_icon.svg'
import group_profile from './group_profile.png'
import bgImage2 from './bgImage2.png'
import hero_video from './3D animated.mp4'
import heroCoverImage from './bg-image.png'
import liveDemoImage from './bg-lady-image.jpg'
import ads_icon from './ads_icon.svg'
import content_icon from './content_icon.svg'
import marketing_icon from './marketing_icon.svg'
import social_icon from './social_icon.svg'
import menu_icon from './menu_icon.svg'
import menu_icon_dark from './menu_icon_dark.svg'
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
import flag from './flag.png'


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
    title: "Voice Agents",
    description: "Powerful, human-like voice agents powered by Retell AI. Handle inbound calls, qualify leads, and book appointments 24/7 with natural conversations.",
    benefits: ["Retell AI powered", "Natural voice", "Lead qualification"],
    detail: "Handles overflow and after-hours calls so a real team member only steps in once a lead is qualified and ready to talk.",
    icon: FiPhoneCall,
  },
  {
    title: "Owner-Operate Agents",
    description: "Keep your own number while an AI/SI voice agent answers calls, qualifies prospects, and books leads whenever you are busy or unavailable.",
    benefits: ["Use your number", "Books leads", "Works while you work"],
    detail: "Your agent covers calls during appointments, jobs, and busy hours, then sends qualified lead details to you so you can follow up when it suits you.",
    icon: FiUserCheck,
  },
  {
    title: "Outbound Calls",
    description: "Launch automated outbound calling campaigns with Retell AI. Reach customers at scale with personalized, natural-sounding voice interactions.",
    benefits: ["Retell AI technology", "Personalized calls", "Campaign automation"],
    detail: "Runs follow-up and re-engagement campaigns automatically, so cold leads get a consistent second touch without manual dialing.",
    icon: FiPhoneCall,
  },
  {
    title: "Website AI/SI Chatbots",
    description: "Turn every website visitor into a qualified lead with smart, brand-aligned chat automation powered by advanced AI/SI technology.",
    benefits: ["Real-time engagement", "Intent-based routing", "Lead capture"],
    detail: "Trained on your own site content and FAQs, so answers stay accurate and on-brand instead of generic chatbot replies.",
    icon: FiMessageSquare,
  },
  {
    title: "Appointment Booking",
    description: "Let AI/SI book, confirm, and reschedule appointments while reducing missed opportunities. Seamless integration with your calendar.",
    benefits: ["Automated scheduling", "Reminder flows", "Reduced admin work"],
    detail: "Syncs directly with your existing calendar, so double-bookings and manual back-and-forth over available slots disappear.",
    icon: FiCalendar,
  },
  {
    title: "CRM & Data Handling",
    description: "Sync every interaction into your CRM, spreadsheets, and reporting tools without manual work. Keep all your data centralized.",
    benefits: ["Zero manual entry", "Real-time sync", "Clear reporting"],
    detail: "Works with the CRM and spreadsheet tools you already use, so there's nothing new for your team to learn.",
    icon: FiDatabase,
  }
]

export const caseStudies = [
  {
    slug: "furniture-store",
    title: "Furniture Store",
    industry: "Retail & Home Design",
    summary: "AI/SI handled showroom inquiries, answered product questions, and booked consultations automatically.",
    challenge: "A steady stream of website and phone inquiries about stock, pricing, and custom orders was pulling showroom staff away from customers physically in-store.",
    solution: "Faalak deployed a voice agent and website chatbot trained on the store's full catalog, so common questions were answered instantly and only genuine consultation requests reached staff.",
    metrics: ["+38% qualified leads", "2 min avg. response", "92% satisfaction"],
  },
  {
    slug: "real-estate-agency",
    title: "Real Estate Agency",
    industry: "Property Sales",
    summary: "AI/SI qualified buyer leads in real time, routed hot prospects, and scheduled viewings without delay.",
    challenge: "Listing inquiries were going cold before agents could call back, especially outside office hours when competing agencies were still responding.",
    solution: "An AI/SI voice agent now answers every inquiry instantly, qualifies budget and timeline, and books viewings directly onto agent calendars around the clock.",
    metrics: ["+52% lead capture", "Under 30 sec response", "89% booking rate"],
  },
  {
    slug: "massage-therapy-studio",
    title: "Massage & Therapy Studio",
    industry: "Wellness & Recovery",
    summary: "AI/SI managed booking requests, answered service questions, and sent instant reminders to reduce no-shows.",
    challenge: "Front-desk staff were spending significant time on the phone taking bookings and reminder calls instead of focusing on clients in the studio.",
    solution: "Faalak's voice and WhatsApp automation now handles bookings, service questions, and automated reminders, freeing staff to focus on in-person care.",
    metrics: ["+31% bookings", "1 min response time", "97% reminder delivery"],
  },
  {
    slug: "landscaping-company",
    title: "Landscaping Company",
    industry: "Outdoor Services",
    summary: "AI/SI captured quote requests, qualified site visits, and followed up with customers 24/7.",
    challenge: "Quote requests coming in evenings and weekends often went unanswered until the next business day, losing ground to faster-responding competitors.",
    solution: "An always-on AI/SI voice agent now captures every quote request immediately, qualifies the job scope, and follows up automatically until a site visit is booked.",
    metrics: ["+44% quote requests", "Same-day follow-up", "85% lead conversion"],
  },
  {
    slug: "dental-clinic",
    title: "Dental Clinic",
    industry: "Healthcare",
    summary: "AI/SI answered FAQs, booked visits, and followed up with patients round-the-clock.",
    challenge: "Patients calling outside clinic hours were routed to voicemail, and follow-up on missed appointments was inconsistent.",
    solution: "Faalak's AI/SI receptionist now answers FAQs, books and confirms visits 24/7, and automatically follows up with patients who miss an appointment.",
    metrics: ["+27% appointments", "1 min response time", "4.8/5 satisfaction"],
  },
  {
    slug: "auto-repair-shop",
    title: "Auto Repair Shop",
    industry: "Automotive Services",
    summary: "AI/SI handled booking requests, answered common repair questions, and sent service reminders automatically.",
    challenge: "Technicians were regularly interrupted to answer phone questions about repair status and availability, slowing down work in the bay.",
    solution: "An AI/SI voice agent now handles booking requests and common repair questions directly, and sends automated service reminders, letting technicians stay focused on the vehicles in front of them.",
    metrics: ["+35% service bookings", "Under 2 min reply", "90% reminder completion"],
  },
]

 export const whyChooseUsData = [
  {
    title: "24/7 Customer Support",
    description: "Your voice agent answers every call day and night, so no customer or lead goes unanswered.",
    detail: "Nights, weekends, and holidays included. You get full call center coverage without hiring extra shifts.",
    icon: FiClock,
  },
  {
    title: "Qualified Leads",
    description: "Our agents ask the right questions and pass you only serious, ready-to-buy leads.",
    detail: "Every caller is screened on your criteria, so your team skips the time wasters and talks only to people who are ready to buy.",
    icon: FiTarget,
  },
  {
    title: "Instant WhatsApp Notifications",
    description: "Get a WhatsApp alert the moment a lead is captured, so you can follow up while they are still interested.",
    detail: "Name, number, and a short summary of the conversation land on your phone within seconds of the call ending.",
    icon: FiBell,
  },
  {
    title: "Human-Like Conversations",
    description: "Natural voice experiences that sound clear, friendly, and trustworthy.",
    detail: "Trained on your own scripts and business rules, so callers focus on getting help, not on spotting a bot.",
    icon: FiMessageSquare,
  },
  {
    title: "Canada-Based Team",
    description: "We are a Canada-based company, so you get reliable support, clear communication, and service you can trust.",
    detail: "Work with a team that understands Canadian businesses and is easy to reach whenever you need help.",
    icon: FiMapPin,
  },
  {
    title: "Scalable AI/SI",
    description: "Built to grow with your team, your channels, and your customer volume.",
    detail: "Handles a quiet Tuesday and a 10x traffic spike the same way, with no extra hires required.",
    icon: FiLayers,
  },
]


export const faqData = [
  {
    question: "What does Faalak AI/SI Automation do?",
    answer:
      "We build AI/SI Voice Agents. WhatsApp Automation. Website Chatbots that answer calls and messages, qualify leads and book appointments 24/7 without additional staff.",
  },
  {
    question: "How quickly can I launch an AI/SI Voice Agent?",
    answer:
      "Most clients go live within days. Faalak handles the setup, training, telephony and integrations so you do not need an internal engineering team.",
  },
  {
    question: "Will my customers know they are speaking with AI/SI?",
    answer:
      "Faalak's enterprise-grade AI/SI system is designed for natural and humanlike conversations. It follows your business scripts and tone without robotic menus.",
  },
  {
    question: "Which languages can the agent speak?",
    answer:
      "Our AI/SI agents can speak multiple languages and accents. This helps you serve customers in the language they prefer.",
  },
  {
    question: "Does it integrate with my calendar and CRM?",
    answer:
      "Yes, Calls, Chats and Leads can sync with your calendar. CRM, spreadsheets and reporting tools in real time.",
  },
  {
    question: "Do I need to replace my current phone system or website?",
    answer:
      "No. Faalak works alongside your existing phone system. Our chatbots can also be added directly to your current website.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, absolutely. By hosting on our own VPS. We promise our clients that their data never enters public Al pools or shared corporate data silos.",
  },
  {
    question: "What happens if the agent cannot handle a call?",
    answer:
      "The agent can transfer the caller to your team or take a detailed message for follow-up. No caller is left without a response.",
  },
  {
    question: "Can it make outbound calls as well?",
    answer:
      "Yes. Faalak AI/SI agents can handle inbound and outbound calls including follow-ups, reminders and lead qualification.",
  },
  {
    question: "What kind of businesses is this built for?",
    answer:
      "We work with businesses that rely on fast customer response including Retail, Real Estate, Wellness, Healthcare, Home Services and Automotive. If missed calls cost you leads, Faalak can help.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on your call volume and use case. Contact our team for a plan tailored to your business.",
  },
  {
    question: "Can I try it before committing?",
    answer:
      "Yes. Select \"Watch Demo\" or \"Talk to Maya\" to experience Faalak's AI/SI Voice Agent. You can also book a free consultation for a solution tailored to your business.",
  },
];


export const testimonialsData = [
  {
    name: "Sarah M.",
    role: "Owner, Bright Smile Dental",
    quote:
      "We used to lose calls every time we were mid-appointment. Now the AI/SI answers instantly, books the slot, and it's already on our calendar before the patient even hangs up.",
    rating: 5,
    detail: "Missed-call rate dropped to near zero within the first two weeks of going live.",
  },
  {
    name: "James R.",
    role: "Founder, Apex Home Services",
    quote:
      "Faalak's voice agent sounds so natural our customers don't realize it's AI/SI until we tell them. Missed calls dropped to almost zero in the first month.",
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
    name: "Ms. Asiya Jailani",
    role: "Founder & CEO",
    icon: FaCrown,
    bio: "Sets the vision for Faalak and leads the team building AI/SI voice agents and automation for growing businesses.",
  },
  {
    name: "Mr. Nofil Imran",
    role: "Head of AI/SI Engineering",
    icon: FiCpu,
    bio: "Designs and ships the voice agent, chatbot, and automation systems that power every Faalak deployment.",
  },
  {
    name: "Mr. Bahadur Ali Bokhari",
    role: "Barrister & Legal Advisor",
    icon: FaBalanceScale,
    bio: "Advises on contracts, compliance, and legal structure so Faalak and its clients operate on solid ground.",
  },
  {
    name: "Mr. David William",
    role: "Developer & SaaS Designer",
    icon: FiPenTool,
    bio: "Shapes Faalak's brand voice and visual identity across the website, campaigns, and client-facing materials.",
  },
  {
    name: "Mr. John Markie",
    role: "SEO Expert & Marketing Specialist",
    icon: FiTrendingUp,
    bio: "Drives organic growth and campaign strategy so Faalak's automation reaches the businesses that need it most.",
  },
];

const assets = {
  logo,
  logo_dark,
  arrow_icon,
  group_profile,
  bgImage2,
  hero_video,
  heroCoverImage,
  liveDemoImage,
  ads_icon,
  content_icon,
  marketing_icon,
  social_icon,
  menu_icon,
  menu_icon_dark,
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
  flag,
}

export default assets