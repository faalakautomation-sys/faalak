import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { FiCheck, FiMail, FiMic, FiPhone, FiUser } from "react-icons/fi";
import { industriesMenu } from "../data/menuData";
import faalakModel from "../assets/faalak-ai-model.jpg";

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

  const focusPhoneNumber = () => {
    document.getElementById("live-demo-phone")?.focus();
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
      toast.success("Connecting you to our AI/SI voice agent now...");

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
    <section
      id="live-demo"
      className="faalak-light-demo relative isolate overflow-hidden border-y border-[#e8e2dc] px-4 py-16 text-gray-700 sm:px-12 sm:py-24 lg:px-16 xl:px-24"
    >
      <div className="faalak-demo-grid pointer-events-none absolute inset-0 -z-10" />
      <span aria-hidden="true" className="faalak-demo-cross absolute left-[12%] top-0" />
      <span aria-hidden="true" className="faalak-demo-cross absolute right-[12%] top-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="faalak-demo-model">
            <img
              src={faalakModel}
              alt="Faalak AI voice agent model wearing a headset"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="faalak-demo-model-label">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Your Faalak AI voice agent
            </span>
          </div>

          <button
            type="button"
            onClick={focusPhoneNumber}
            aria-label="Enter your number to hear the live demo"
            className="faalak-demo-mic mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#e7e2dc] bg-white text-[#171717] shadow-[0_8px_24px_rgba(33,29,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(33,29,24,0.14)]"
          >
            <FiMic className="h-5 w-5" aria-hidden="true" />
          </button>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e4ded7] bg-white/80 px-4 py-2 text-xs font-semibold text-[#635e58]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            300ms latency
          </span>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#a75a3a]" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#985236]">
              Live Demo
            </span>
          </div>

          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#151515] sm:text-4xl md:text-5xl">
            Hear it for yourself.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c5b59] sm:text-base">
            Pick your industry, drop your details, and our AI/SI voice agent will
            call you in seconds. No robotic &ldquo;press 1&rdquo; menus - a real
            conversation.
          </p>

          <div className="faalak-demo-card mt-8 rounded-2xl border border-[#e5e0da] bg-white p-5 shadow-[0_18px_55px_rgba(43,36,30,0.07)] sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#928a82]">
                  1 &middot; Choose an industry
                </p>
                <div className="flex flex-wrap gap-2">
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
                            ? "border-[#171717] bg-[#171717] text-white shadow-sm"
                            : "border-[#e8e3de] bg-white text-[#5b5956] hover:border-[#a75a3a]/50 hover:bg-[#faf7f4]"
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#928a82]">
                  2 &middot; Your details
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="relative block">
                    <FiUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a938b]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-[#e5e0da] bg-white py-3 pl-11 pr-4 text-sm text-[#171717] outline-none placeholder:text-[#9a938b] focus:border-[#a75a3a]"
                    />
                  </label>
                  <label className="relative block">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a938b]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#e5e0da] bg-white py-3 pl-11 pr-4 text-sm text-[#171717] outline-none placeholder:text-[#9a938b] focus:border-[#a75a3a]"
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#928a82]">
                  3 &middot; Enter your number
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative block flex-1">
                    <FiPhone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a938b]" />
                    <input
                      id="live-demo-phone"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-[#e5e0da] bg-white py-3 pl-11 pr-4 text-sm text-[#171717] outline-none placeholder:text-[#9a938b] focus:border-[#a75a3a]"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="shrink-0 rounded-xl bg-[#0054a8] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#004987] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading" ? "Calling..." : "Call me now"}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e5e0da] bg-[#faf9f7] px-4 py-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    agreed ? "border-[#171717] bg-[#171717]" : "border-[#c9c3bc] bg-white"
                  }`}
                >
                  {agreed && <FiCheck className="h-3 w-3 text-white" />}
                </span>
                <span className="text-xs leading-relaxed text-[#6f6a64]">
                  I&apos;d like a demo call from Faalak&apos;s AI/SI voice agent and
                  agree to be contacted at the number above.
                </span>
              </label>

              <p className="text-xs text-[#928a82]">
                No spam. One demo call, then we delete your number.
              </p>
            </form>

            <div className="mt-7 flex h-12 items-end gap-1 border-t border-[#eee9e3] pt-3" aria-hidden="true">
              {[12, 22, 15, 27, 18, 31, 14, 24, 36, 17, 25, 13, 29, 19, 34, 16, 23, 12, 30, 20, 15, 27, 18, 32, 14, 24, 17, 28, 13, 22, 16, 30, 19, 25, 14, 28, 17, 23, 12, 29].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-[2px] bg-[#292725]"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LiveDemo;
