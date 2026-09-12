import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { FiCheck, FiMail, FiPhone, FiUser, FiZap } from "react-icons/fi";
import assets from "../assets/assets";
import { industriesMenu } from "../data/menuData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Only a curated handful of industries here, not the full menu - keeps the
// pill row short and scannable instead of forcing visitors to scroll through
// all sixteen before they can even fill out the form.
const DEMO_INDUSTRY_SLUGS = ["massage-and-spa", "furniture-store", "hvac", "real-estate", "landscaping"];
const industries = DEMO_INDUSTRY_SLUGS.map((slug) =>
  industriesMenu.find((item) => item.slug === slug)
).filter(Boolean);

const LiveDemo = () => {
  // --- Left column: books a real OUTBOUND call - the visitor leaves their
  // number and Faalak's agent calls them (via /call-request -> WhatsApp lead
  // notification, same flow as the rest of the site's call-back forms). ---
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].slug);
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "" });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (!agreed) {
      toast.error("Please confirm you'd like a demo call before continuing.");
      return;
    }

    const industryName = industries.find((item) => item.slug === selectedIndustry)?.name;

    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/call-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim() || undefined,
          phoneNumber: formData.phoneNumber.trim(),
          notes: `Live demo request - industry: ${industryName}`,
        }),
      });
      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || "Unable to submit your request");
      }

      setStatus("success");
      toast.success("Connecting you to our AI voice agent now...");

      // Immediately open the floating "Talk to Maya" widget, pre-filled with
      // what they just typed, and have it start dialing right away - so
      // "Call me now" actually starts a live call instead of only booking a
      // callback for later.
      window.dispatchEvent(
        new CustomEvent("open-retell-widget", {
          detail: {
            name: formData.name.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            autoStart: true,
          },
        })
      );

      setFormData({ name: "", email: "", phoneNumber: "" });
      setAgreed(false);
    } catch (error) {
      console.error("Live demo call request failed:", error);
      setStatus("error");
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      id="live-demo"
      className="relative px-4 py-16 text-gray-700 sm:px-12 sm:py-24 lg:px-24 xl:px-40 dark:text-white"
    >
      {/* Same soft ambient glow used behind Services/WhyChooseUs - sits
          directly on the page background instead of a boxed panel. */}
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-72 rounded-full bg-gradient-to-r from-sky-500/10 via-blue-400/10 to-cyan-400/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        {/* Left column - book an outbound call */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Live Demo
            </span>
          </div>

          <h2 className="font-elite mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
            Hear it for yourself.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base dark:text-white/70">
            Pick your industry, drop your details, and our AI voice agent will
            call you in seconds. No robotic &ldquo;press 1&rdquo; menus - a real
            conversation.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-white/50">
                1 &middot; Choose an industry
              </p>
              <div className="no-scrollbar flex flex-wrap gap-2">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  const isActive = selectedIndustry === industry.slug;
                  return (
                    <button
                      key={industry.slug}
                      type="button"
                      onClick={() => setSelectedIndustry(industry.slug)}
                      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                        isActive
                          ? "border-primary bg-primary text-white shadow-lg shadow-blue-500/30"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-blue-50 dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/40 dark:hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {industry.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-white/50">
                2 &middot; Your details
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="relative block">
                  <FiUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10"
                  />
                </label>
                <label className="relative block">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10"
                  />
                </label>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-white/50">
                3 &middot; Enter your number
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block flex-1">
                  <FiPhone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.03] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "loading" ? "Calling..." : "Call me now"}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-white/15 dark:bg-white/5">
              <span
                onClick={() => setAgreed((previous) => !previous)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                  agreed ? "border-primary bg-primary" : "border-gray-300 bg-transparent dark:border-white/30"
                }`}
              >
                {agreed && <FiCheck className="h-3 w-3 text-white" />}
              </span>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="sr-only"
              />
              <span className="text-xs leading-relaxed text-gray-500 dark:text-white/60">
                I&apos;d like a demo call from Faalak&apos;s AI voice agent and
                agree to be contacted at the number above.
              </span>
            </label>

            <p className="text-xs text-gray-400 dark:text-white/40">
              No spam. One demo call, then we delete your number.
            </p>
          </form>
        </div>

        {/* Right column - just the photo, no overlay card. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto h-105 w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 shadow-2xl shadow-blue-900/10 sm:h-120 lg:max-w-none dark:border-white/10 dark:shadow-black/40"
        >
          <img
            src={assets.liveDemoImage}
            alt="Customer on a phone call with Faalak's AI voice agent"
            className="h-full w-full object-cover"
          />

          {/* Latency badge - Maya's real response speed, shown right on the
              photo so it reads as a live product stat, not marketing copy. */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-sm dark:bg-primary-deep/90 dark:text-white">
            <FiZap className="h-3.5 w-3.5 text-primary" />
            300ms latency
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiveDemo;
