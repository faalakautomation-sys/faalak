import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiMail, FiMapPin, FiPhone, FiSend, FiUser } from "react-icons/fi";
import assets from "../assets/assets";
import { API_BASE_URL } from "../api/config";
import { industriesMenu } from "../data/menuData";
import { industryPresets } from "../data/industryPresets";

const featuredIndustries = industryPresets
  .map(({ slug }) => industriesMenu.find((industry) => industry.slug === slug))
  .filter(Boolean);

const footerServices = [
  { name: "AI Receptionist", to: "/services/ai-receptionist" },
  { name: "Owner-Operated Voice Agents", to: "/services/owner-operated-voice-agents" },
  { name: "Website Chatbots", to: "/services/chatbot-automation" },
  { name: "Appointment Booking & CRM", to: "/#services" },
];

const buildOptions = [
  { title: "Conversational agents", description: "Voice and chat agents for sales, service and follow-up." },
  { title: "Website chatbots", description: "Answer website visitors and capture leads around the clock." },
  { title: "Appointment booking & CRM", description: "Book appointments and keep customer details organized." },
  { title: "Lead Notifications", description: "Receive new caller details by WhatsApp or SMS." },
  { title: "Marketing Alerts", description: "Send permission-based WhatsApp or SMS follow-ups after calls." },
  { title: "Something else", description: "A workflow specific to your business." },
];

const businessGoals = [
  "Answer calls 24/7",
  "Capture and qualify leads",
  "Book appointments",
  "Send WhatsApp or SMS updates",
];

const Footer = () => {
  const [contactStep, setContactStep] = useState(0);
  const [buildChoice, setBuildChoice] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    category: "",
    description: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleGoalToggle = (goal) => {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]
    );
  };

  const handleContinue = () => {
    if (contactStep === 0 && !buildChoice) {
      toast.error("Choose what you would like to build.");
      return;
    }
    if (contactStep === 1 && !formData.category) {
      toast.error("Choose your business type to continue.");
      return;
    }
    if (contactStep === 3 && (!formData.name.trim() || !formData.phoneNumber.trim() || !formData.email.trim())) {
      toast.error("Please add your name, phone number, and email to continue.");
      return;
    }
    setContactStep((step) => Math.min(step + 1, 4));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contactStep !== 4) {
      handleContinue();
      return;
    }
    if (!buildChoice || !formData.name.trim() || !formData.phoneNumber.trim() || !formData.email.trim() || !formData.category) {
      toast.error("Please complete the required details before sending.");
      return;
    }

    setFormStatus("loading");
    try {
      const description = [
        `What they want to build: ${buildChoice}`,
        selectedGoals.length ? `Goals: ${selectedGoals.join(", ")}` : "",
        formData.description.trim() ? `Additional details: ${formData.description.trim()}` : "",
      ].filter(Boolean).join("\n");
      const response = await fetch(`${API_BASE_URL}/call-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          email: formData.email.trim(),
          category: formData.category,
          description,
          source: "contact_form",
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.error || "Unable to send your message");

      setFormStatus("success");
      setFormData({ name: "", phoneNumber: "", email: "", category: "", description: "" });
      setBuildChoice("");
      setSelectedGoals([]);
      setContactStep(0);
      toast.success("Thanks. Our team will be in touch shortly.");
    } catch (error) {
      setFormStatus("error");
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#f5f3ef] px-4 pt-10 text-[#514b45] sm:px-10 sm:pt-14 lg:px-24 xl:px-40">
      {/* Contact form and business details */}
      <motion.div
        id="contact-us"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 px-6 py-8 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] sm:px-10 sm:py-10"
      >
        <div className="pointer-events-none absolute -left-10 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact Us</span>
            </div>
            <h2 className="font-elite mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              Tell us what you want to <span className="text-primary">automate</span>.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Share a few details and our team will get back to you with the right next step.
            </p>

            <div className="mt-7 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3"><FiMapPin className="text-primary" /> Toronto, Canada</p>
              <p className="flex items-center gap-3"><FiUser className="text-primary" /> Faalak AI Automation</p>
              <a href="tel:+14169104547" className="flex items-center gap-3 hover:text-primary"><FiPhone className="text-primary" /> +1 416 910 4547</a>
              <a href="mailto:info@faalak.com" className="flex items-center gap-3 hover:text-primary"><FiMail className="text-primary" /> info@faalak.com</a>
              <a href="mailto:sales@faalak.com" className="flex items-center gap-3 hover:text-primary"><FiMail className="text-primary" /> sales@faalak.com</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#e5dfd8] pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 lg:pl-10">
            <div className="flex items-center justify-between border-b border-[#e5dfd8] pb-4 text-xs text-[#82786f]">
              <span>{["Use case", "Business", "Goals", "Your details", "Review"][contactStep]}</span>
              <span className="font-medium tabular-nums text-[#24211e]">
                {String(contactStep + 1).padStart(2, "0")} <span className="mx-1 text-[#b8afa6]">/</span> 05
              </span>
            </div>

            <div className="min-h-[350px] pt-5">
              {contactStep === 0 && (
                <fieldset>
                  <legend className="text-2xl font-semibold leading-tight tracking-tight text-[#201e1c] sm:text-3xl">
                    What would you like to build?
                  </legend>
                  <div className="mt-4 divide-y divide-[#e5dfd8] border-y border-[#e5dfd8]">
                    {buildOptions.map((option) => (
                      <label key={option.title} className="flex cursor-pointer items-center justify-between gap-4 py-3">
                        <span>
                          <span className={`block text-sm font-semibold ${buildChoice === option.title ? "text-primary" : "text-[#24211e]"}`}>
                            {option.title}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-[#77716a]">{option.description}</span>
                        </span>
                        <input
                          type="radio"
                          name="buildChoice"
                          value={option.title}
                          checked={buildChoice === option.title}
                          onChange={() => setBuildChoice(option.title)}
                          className="h-5 w-5 shrink-0 accent-[#0054a8]"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {contactStep === 1 && (
                <div>
                  <label htmlFor="contact-category" className="block text-2xl font-semibold leading-tight tracking-tight text-[#201e1c] sm:text-3xl">
                    What kind of business do you run?
                  </label>
                  <p className="mt-2 text-sm text-[#77716a]">This helps us tailor the conversation to your workflow.</p>
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-6 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary"
                  >
                    <option value="">Choose your business type</option>
                    {featuredIndustries.map((industry) => <option key={industry.slug} value={industry.name}>{industry.name}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              {contactStep === 2 && (
                <fieldset>
                  <legend className="text-2xl font-semibold leading-tight tracking-tight text-[#201e1c] sm:text-3xl">
                    What should it help with?
                  </legend>
                  <p className="mt-2 text-sm text-[#77716a]">Choose any that fit, then add context if you like.</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {businessGoals.map((goal) => {
                      const selected = selectedGoals.includes(goal);
                      return (
                        <label
                          key={goal}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${selected ? "border-blue-300 bg-blue-50 text-[#0054a8]" : "border-gray-200 bg-white text-gray-700 hover:border-blue-200"}`}
                        >
                          <input type="checkbox" checked={selected} onChange={() => handleGoalToggle(goal)} className="h-4 w-4 accent-[#0054a8]" />
                          {goal}
                        </label>
                      );
                    })}
                  </div>
                  <label htmlFor="contact-description" className="sr-only">Additional details</label>
                  <textarea
                    id="contact-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Anything else we should know? (optional)"
                    className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary"
                  />
                </fieldset>
              )}

              {contactStep === 3 && (
                <div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#201e1c] sm:text-3xl">
                    How can we reach you?
                  </h3>
                  <p className="mt-2 text-sm text-[#77716a]">Our team will follow up about your project.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" autoComplete="name" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" placeholder="Phone" autoComplete="tel" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" autoComplete="email" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary sm:col-span-2" />
                  </div>
                </div>
              )}

              {contactStep === 4 && (
                <div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#201e1c] sm:text-3xl">
                    Review your request
                  </h3>
                  <dl className="mt-5 divide-y divide-[#e5dfd8] border-y border-[#e5dfd8] text-sm">
                    <div className="py-3"><dt className="text-xs text-[#82786f]">What to build</dt><dd className="mt-1 font-semibold text-[#24211e]">{buildChoice}</dd></div>
                    <div className="py-3"><dt className="text-xs text-[#82786f]">Business type</dt><dd className="mt-1 font-semibold text-[#24211e]">{formData.category}</dd></div>
                    <div className="py-3"><dt className="text-xs text-[#82786f]">Contact</dt><dd className="mt-1 font-semibold text-[#24211e]">{formData.name} · {formData.phoneNumber} · {formData.email}</dd></div>
                    {selectedGoals.length > 0 && <div className="py-3"><dt className="text-xs text-[#82786f]">Goals</dt><dd className="mt-1 text-[#24211e]">{selectedGoals.join(", ")}</dd></div>}
                    {formData.description.trim() && <div className="py-3"><dt className="text-xs text-[#82786f]">Additional details</dt><dd className="mt-1 whitespace-pre-wrap text-[#24211e]">{formData.description}</dd></div>}
                  </dl>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#e5dfd8] pt-4">
              {contactStep > 0 ? (
                <button type="button" onClick={() => setContactStep((step) => Math.max(step - 1, 0))} className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#68635d] transition hover:bg-[#f5f3ef]">
                  <FiArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : <span />}
              {contactStep < 4 ? (
                <button type="button" onClick={handleContinue} className="inline-flex items-center gap-3 rounded-xl bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#303030]">
                  Continue <FiArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" disabled={formStatus === "loading"} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70">
                  {formStatus === "loading" ? "Sending..." : "Send request"}
                  {formStatus !== "loading" && <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {/* Link columns */}
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-[#ded8d0] pt-12 text-sm text-[#68635d] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={assets.logo} alt="Faalak" className="h-9 w-auto object-contain" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#68635d]">
            The voice that never tires. AI-powered voice agents and automation for inbound &amp; outbound calls.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.facebook.com/faalakai/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e3dc] transition hover:bg-[#ded5cb]"
            >
              <img src={assets.facebook_icon} alt="" className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/faalak.automation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e3dc] transition hover:bg-[#ded5cb]"
            >
              <img src={assets.instagram_icon} alt="" className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/faalak-ai-automation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e3dc] transition hover:bg-[#ded5cb]"
            >
              <img src={assets.linkedin_icon} alt="" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8b8076]">Company</p>
          <ul className="space-y-2.5">
            <li>
              <Link className="hover:text-primary" to="/#hero">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/work">
                Case Studies
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/blog/superintelligence">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/data-security">
                Security
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8b8076]">Industries</p>
          {/* Split featured industries across two compact link columns. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <ul className="space-y-2.5">
              {featuredIndustries.slice(0, 3).map((item) => (
                <li key={item.slug}>
                  <Link className="hover:text-primary" to={`/industries/${item.slug}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {featuredIndustries.slice(3).map((item) => (
                <li key={item.slug}>
                  <Link className="hover:text-primary" to={`/industries/${item.slug}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8b8076]">Services</p>
          <ul className="space-y-2.5">
            {footerServices.map((item) => (
              <li key={item.name}>
                <Link className="hover:text-primary" to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* id read by RetellVoiceWidget.jsx to dock the "Talk to Maya" bubble
          above this row once it scrolls into view, instead of floating over it. */}
      <div
        id="footer-bottom-row"
        className="mt-10 flex flex-col gap-3 border-t border-[#ded8d0] py-6 text-xs text-[#8b8076] sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; 2026 Faalak AI Automation &mdash; All Rights Reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <span>Toronto, Canada</span>
          <a href="mailto:info@faalak.com" className="hover:text-primary">
            info@faalak.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
