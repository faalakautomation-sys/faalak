import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { RetellWebClient } from "retell-client-js-sdk";
import {
  FiBriefcase,
  FiCheck,
  FiCoffee,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiKey,
  FiMail,
  FiMic,
  FiPhone,
  FiPhoneCall,
  FiPhoneOff,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import assets from "../assets/assets";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Same eight industries the navbar's "Industries" mega-menu already lists -
// keeps this section's pills matching the rest of the site instead of
// inventing a second, different industry list.
const industries = [
  { slug: "real-estate", name: "Real Estate", icon: FiHome },
  { slug: "ecommerce-brands", name: "Ecommerce Brands", icon: FiShoppingBag },
  { slug: "fintech-brands", name: "Fintech Brands", icon: FiDollarSign },
  { slug: "medium-to-big-business", name: "Medium to Big Business", icon: FiBriefcase },
  { slug: "store", name: "Store", icon: FiShoppingCart },
  { slug: "mortgage", name: "Mortgage", icon: FiKey },
  { slug: "hospitality", name: "Hospitality", icon: FiCoffee },
  { slug: "showrooms", name: "Showrooms", icon: FiGrid },
];

const formatTimer = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

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
      toast.success("You're booked! Our AI voice agent will call you shortly.");
      setFormData({ name: "", email: "", phoneNumber: "" });
      setAgreed(false);
    } catch (error) {
      console.error("Live demo call request failed:", error);
      setStatus("error");
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  // --- Right column: a real INBOUND demo - the visitor talks to Maya, our
  // Retell voice agent, right in the browser. Same RetellWebClient flow as
  // RetellVoiceWidget.jsx (the floating bottom-right widget), just embedded
  // inline here instead of behind a launcher button. ---
  const clientRef = useRef(null);
  const [callStatus, setCallStatus] = useState("idle"); // idle | connecting | active | error
  const [callForm, setCallForm] = useState({ name: "", phoneNumber: "" });
  const [callSeconds, setCallSeconds] = useState(0);
  const tickRef = useRef(null);

  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;

    const handleCallStarted = () => {
      setCallStatus("active");
      setCallSeconds(0);
      tickRef.current = setInterval(() => setCallSeconds((previous) => previous + 1), 1000);
    };
    const handleCallEnded = () => {
      setCallStatus("idle");
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      // Ask again next time, even for a second call in the same page visit.
      setCallForm({ name: "", phoneNumber: "" });
    };
    const handleCallError = () => {
      setCallStatus("error");
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      toast.error("Maya could not connect. Please try again.");
    };

    client.on("call_started", handleCallStarted);
    client.on("call_ended", handleCallEnded);
    client.on("error", handleCallError);

    return () => {
      client.stopCall();
      client.removeListener("call_started", handleCallStarted);
      client.removeListener("call_ended", handleCallEnded);
      client.removeListener("error", handleCallError);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const handleCallFormChange = (event) => {
    const { name, value } = event.target;
    setCallForm((previous) => ({ ...previous, [name]: value }));
  };

  const startMayaCall = async (event) => {
    event.preventDefault();

    if (!callForm.name.trim() || !callForm.phoneNumber.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    setCallStatus("connecting");

    try {
      const response = await fetch(`${API_BASE_URL}/retell/web-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(callForm),
      });
      const data = await response.json();

      if (!response.ok || !data.accessToken) {
        throw new Error(data.error || "Unable to start the voice agent");
      }

      await clientRef.current.startCall({ accessToken: data.accessToken });
    } catch (error) {
      console.error("Maya web call failed:", error);
      setCallStatus("error");
      toast.error(error.message || "Unable to start the voice agent.");
    }
  };

  const endMayaCall = () => {
    clientRef.current?.stopCall();
    setCallStatus("idle");
  };

  const isCalling = callStatus === "active" || callStatus === "connecting";

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

        {/* Right column - talk to Maya live, right now, in the browser */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="h-105 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl shadow-blue-900/10 sm:h-120 dark:border-white/10 dark:shadow-black/40">
            <img
              src={assets.liveDemoImage}
              alt="Faalak AI voice agent"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-2xl shadow-blue-900/20 sm:max-w-md sm:p-8 dark:border-white/10 dark:bg-primary-deep/95 dark:shadow-black/40">
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <FiMic className="h-5 w-5 text-primary" />
                  {callStatus === "active" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  )}
                </span>
                <div>
                  <p className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                    Talk to Maya &middot; live voice agent
                  </p>
                  {callStatus === "idle" && (
                    <p className="text-xs text-gray-400 dark:text-white/50">Ready when you are</p>
                  )}
                  {callStatus === "connecting" && (
                    <p className="flex items-center gap-1.5 text-xs text-amber-500">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                      Connecting...
                    </p>
                  )}
                  {callStatus === "active" && (
                    <p className="flex items-center gap-1.5 text-xs text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      On a call &middot; {formatTimer(callSeconds)}
                    </p>
                  )}
                  {callStatus === "error" && (
                    <p className="text-xs font-medium text-rose-500">Connection failed</p>
                  )}
                </div>
              </div>

              {callStatus === "active" ? (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-white/60">
                    Maya is listening - start speaking.
                  </p>
                  <button
                    type="button"
                    onClick={endMayaCall}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                  >
                    <FiPhoneOff className="h-4 w-4" /> End call
                  </button>
                </div>
              ) : (
                <form onSubmit={startMayaCall} className="mt-6 space-y-3.5">
                  <label className="relative block">
                    <FiUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                    <input
                      type="text"
                      name="name"
                      value={callForm.name}
                      onChange={handleCallFormChange}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={isCalling}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                    />
                  </label>
                  <label className="relative block">
                    <FiPhone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={callForm.phoneNumber}
                      onChange={handleCallFormChange}
                      placeholder="Phone number"
                      autoComplete="tel"
                      disabled={isCalling}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isCalling}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
                  >
                    {callStatus === "connecting" ? (
                      "Connecting..."
                    ) : (
                      <>
                        <FiPhoneCall className="h-4 w-4" /> Start call with Maya
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveDemo;
