import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import PageMeta from "../components/PageMeta";
import { voiceAgentsCanadaFaqs, voiceAgentsCanadaSeo } from "../seo/meta";

const capabilities = [
  {
    title: "Answers every call, 24/7",
    text: "On your existing number, including evenings, weekends and holidays.",
  },
  {
    title: "Answers common questions",
    text: "From your own FAQs, in your words.",
  },
  {
    title: "Qualifies leads",
    text: "By asking your screening questions, so each lead is ready for your callback.",
  },
  {
    title: "Books appointments",
    text: "During your booking hours.",
  },
  {
    title: "Flags urgent calls",
    text: "The details reach you right away by WhatsApp + SMS.",
  },
  {
    title: "Sends every caller's details",
    text: "Name, number and reason, by WhatsApp + SMS.",
  },
];

const steps = [
  {
    title: "Discovery call",
    text: "We learn your services, common questions and how you want calls handled.",
  },
  {
    title: "Script and voice",
    text: "We design the conversation, your FAQs and your screening questions.",
  },
  {
    title: "Set your rules",
    text: "Booking hours, what counts as urgent, and where your WhatsApp + SMS summaries go.",
  },
  {
    title: "Go live",
    text: "On your existing number.",
  },
  {
    title: "Review and tune",
    text: "We review calls and improve the agent over time.",
  },
];

const industries = [
  { name: "Massage & spa", to: "/industries/massage-and-spa" },
  { name: "Furniture stores", to: "/industries/furniture-store" },
  { name: "HVAC", to: "/industries/hvac" },
  { name: "Real estate", to: "/industries/real-estate" },
  { name: "Landscaping", to: "/industries/landscaping" },
];

const AiVoiceAgentsCanada = () => (
  <div
    style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
    className="px-4 pb-24 sm:px-12 lg:px-24 xl:px-40"
  >
    <PageMeta {...voiceAgentsCanadaSeo} />

    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Canada</p>
    <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
      AI Voice Agents for Canadian Businesses
    </h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
      Every missed call is a customer who may call someone else. Faalak is a Mississauga-based AI voice
      agent agency serving Toronto, the GTA and businesses across Canada. We build AI voice agents that
      answer your business line 24/7, on your existing number, in a natural, human-like voice.
    </p>
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a
        href="tel:+14169104547"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
      >
        Call +1 416-910-4547 to hear a live demo
      </a>
      <Link
        to="/book-appointment"
        className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105"
      >
        Book a consultation
      </Link>
    </div>

    <section className="mt-14 max-w-5xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">What an AI voice agent does</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {capabilities.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-[0_14px_30px_-24px_rgba(30,64,175,0.25)]"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiCheck className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm leading-6 text-gray-700">
              <strong className="font-semibold text-gray-900">{item.title}.</strong> {item.text}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-gray-700">
        Learn more about our{" "}
        <Link to="/services/ai-receptionist" className="font-semibold text-primary underline-offset-2 hover:underline">
          AI receptionist service
        </Link>{" "}
        and{" "}
        <Link to="/services/voice-agents" className="font-semibold text-primary underline-offset-2 hover:underline">
          custom AI voice agents
        </Link>
        .
      </p>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Why Canadian businesses use AI voice agents</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Customers call when it suits them, not when the front desk is open. Canada spans six time zones, so
        evening and weekend calls are normal. An AI voice agent covers early mornings, late nights and busy
        hours without adding staff, so service businesses in Toronto, the GTA and across Canada can capture
        calls they would otherwise miss.
      </p>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Inbound calls, with the rest of your setup</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        The voice agent answers inbound calls: questions from your FAQs, booking during your hours, and lead
        qualification with your questions. It is built to sit alongside the{" "}
        <Link to="/services/ai-receptionist" className="font-semibold text-primary underline-offset-2 hover:underline">
          AI receptionist
        </Link>{" "}
        and{" "}
        <Link to="/services/chatbot-automation" className="font-semibold text-primary underline-offset-2 hover:underline">
          website chatbot
        </Link>
        .
      </p>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">How it works</h2>
      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white/90 p-4">
            <span className="font-display text-lg font-semibold text-primary">{index + 1}</span>
            <p className="text-sm leading-6 text-gray-700">
              <strong className="font-semibold text-gray-900">{step.title}.</strong> {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Industries we serve</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Massage and spa studios, furniture stores, HVAC companies, real estate teams and landscaping businesses.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <Link
            key={industry.to}
            to={industry.to}
            className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-primary hover:text-primary"
          >
            {industry.name}
          </Link>
        ))}
      </div>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Data and privacy</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Read how we handle call data on our{" "}
        <Link to="/data-security" className="font-semibold text-primary underline-offset-2 hover:underline">
          data security page
        </Link>
        .
      </p>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Serving businesses across Canada</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Faalak is based in Mississauga, Ontario and works with businesses in Toronto, the GTA and across Canada.
      </p>
    </section>

    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Questions</h2>
      <div className="mt-4 space-y-3">
        {voiceAgentsCanadaFaqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white/90 p-4">
            <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-14 max-w-3xl rounded-3xl border border-gray-200 bg-white/90 p-6">
      <h2 className="font-display text-2xl font-semibold text-gray-900">Ready to stop missing calls?</h2>
      <p className="mt-3 text-base leading-7 text-gray-600">
        Call +1 416-910-4547 or book a consultation with Faalak.
      </p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a
          href="tel:+14169104547"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
        >
          Call +1 416-910-4547
        </a>
        <Link
          to="/book-appointment"
          className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:scale-105"
        >
          Book a consultation
        </Link>
      </div>
    </section>
  </div>
);

export default AiVoiceAgentsCanada;
