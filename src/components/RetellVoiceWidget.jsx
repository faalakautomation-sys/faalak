import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RetellWebClient } from "retell-client-js-sdk";
import { FiMic, FiPhone, FiPhoneOff, FiUser, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Tab-lifetime storage on purpose: sessionStorage persists across reopening
// the widget or reloading the page within the SAME tab, but clears the
// moment the tab/window closes and is never shared with other tabs - unlike
// localStorage, which would leak one visitor's details into every future
// visit on that browser.
const SESSION_KEY = "faalak_voice_widget_details";

function readStoredDetails() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.name && parsed?.phoneNumber) return parsed;
    return null;
  } catch {
    return null;
  }
}

const RetellVoiceWidget = () => {
  const clientRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState(() => readStoredDetails() || { name: "", phoneNumber: "" });
  const [isReturning, setIsReturning] = useState(() => Boolean(readStoredDetails()));

  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;
    const openWidget = () => {
      setShowGreeting(false);
      setIsOpen(true);
    };

    const handleCallStarted = () => setStatus("active");
    const handleCallEnded = () => setStatus("idle");
    const handleCallError = () => {
      setStatus("error");
      toast.error("The voice agent could not connect. Please try again.");
    };

    client.on("call_started", handleCallStarted);
    client.on("call_ended", handleCallEnded);
    client.on("error", handleCallError);
    window.addEventListener("open-retell-widget", openWidget);

    return () => {
      client.stopCall();
      client.removeListener("call_started", handleCallStarted);
      client.removeListener("call_ended", handleCallEnded);
      client.removeListener("error", handleCallError);
      window.removeEventListener("open-retell-widget", openWidget);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const placeCall = async (details) => {
    setStatus("connecting");

    try {
      const response = await fetch(`${API_BASE_URL}/retell/web-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await response.json();

      if (!response.ok || !data.accessToken) {
        throw new Error(data.error || "Unable to create the Retell call");
      }

      // Remembered only after a real, valid submission - never on page load
      // with empty fields - and only for this tab's lifetime.
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(details));
      setIsReturning(true);

      await clientRef.current.startCall({ accessToken: data.accessToken });
    } catch (error) {
      console.error("Retell voice call failed:", error);
      setStatus("error");
      toast.error(error.message || "Unable to start the voice agent.");
    }
  };

  const startVoiceAgent = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    await placeCall(formData);
  };

  const startReturningCall = async () => {
    await placeCall(formData);
  };

  const useDifferentDetails = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsReturning(false);
    setFormData({ name: "", phoneNumber: "" });
    setStatus("idle");
  };

  const stopVoiceAgent = () => {
    clientRef.current?.stopCall();
    setStatus("idle");
  };

  const closeWidget = () => {
    if (status === "active" || status === "connecting") return;
    setIsOpen(false);
    setStatus("idle");
    setShowGreeting(false);
  };

  const isCalling = status === "active" || status === "connecting";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setShowGreeting(false);
          setIsOpen((previous) => !previous);
        }}
        aria-label="Open Retell voice agent"
        className="fixed bottom-6 right-6 z-9997 flex h-14 items-center gap-3 rounded-full bg-[#075bd8] px-5 text-white shadow-[0_12px_28px_rgba(7,91,216,0.28)] transition hover:-translate-y-0.5 hover:bg-[#064fbd]"
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#ff4b9b] via-[#9b7cff] to-[#24d5ff] shadow-inner">
          <FiMic className="h-4 w-4 text-white" />
        </span>
        <span className="text-sm font-semibold tracking-tight">Talk to Maya</span>
        {isOpen && <FiX className="ml-1 h-4 w-4" />}
      </motion.button>

      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 right-6 z-9996 w-[320px] max-w-[calc(100vw-32px)] rounded-lg bg-white px-4 py-4 text-slate-800 shadow-[0_14px_38px_rgba(15,23,42,0.16)] ring-1 ring-slate-200"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold tracking-tight">Hi! Want to talk to our AI assistant?</p>
              <button type="button" onClick={() => setShowGreeting(false)} className="shrink-0 text-xs text-slate-500 transition hover:text-slate-900">Close</button>
            </div>
            <p className="mt-3 text-xs font-medium text-slate-400">Maya</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            aria-label="Retell voice agent"
            className="fixed bottom-24 right-6 z-9996 w-[min(380px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
          >
            <div className="relative overflow-hidden border-b border-slate-100 px-6 pb-6 pt-6">
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-sky-100 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#075bd8]">Faalak AI</p>
                  <h2 className="max-w-62.5 text-2xl font-semibold leading-tight text-slate-900">Talk with Maya.</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#075bd8]">
                  <FiMic className="h-5 w-5" />
                </div>
              </div>
              <p className="relative mt-4 text-sm leading-6 text-slate-500">
                {isReturning && !isCalling
                  ? "Good to see you again — you're all set to call."
                  : "Share your details first, then speak directly with our AI voice assistant."}
              </p>
            </div>

            {status === "active" ? (
              <div className="bg-slate-50 px-6 py-7 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50">
                  <FiMic className="h-8 w-8 animate-pulse text-[#075bd8]" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">You are connected</h3>
                <p className="mt-2 text-sm text-slate-500">Maya is listening. You can start speaking.</p>
                <button type="button" onClick={stopVoiceAgent} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
                  <FiPhoneOff className="h-4 w-4" /> End call
                </button>
              </div>
            ) : isReturning ? (
              <div className="bg-slate-50 px-6 py-6">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Calling as</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formData.name}</p>
                  <p className="text-sm text-slate-500">{formData.phoneNumber}</p>
                </div>
                <button
                  type="button"
                  onClick={startReturningCall}
                  disabled={isCalling}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#075bd8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#064fbd] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "connecting" ? "Connecting..." : <><FiMic className="h-4 w-4" /> Start voice call</>}
                </button>
                {status === "error" && <p className="mt-3 text-center text-xs text-rose-600">Connection failed. Please try again.</p>}
                <button type="button" onClick={useDifferentDetails} className="mt-4 block w-full text-center text-xs text-slate-400 transition hover:text-slate-700">
                  Not you? Use different details
                </button>
              </div>
            ) : (
              <form onSubmit={startVoiceAgent} className="bg-slate-50 px-6 py-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Your name</span>
                    <span className="relative block">
                      <FiUser className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Jane Smith" autoComplete="name" disabled={isCalling} className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </span>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Phone number</span>
                    <span className="relative block">
                      <FiPhone className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+1 416 555 0199" autoComplete="tel" disabled={isCalling} className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </span>
                  </label>
                </div>
                <button type="submit" disabled={isCalling} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#075bd8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#064fbd] disabled:cursor-wait disabled:opacity-70">
                  {status === "connecting" ? "Connecting..." : <><FiMic className="h-4 w-4" /> Start voice call</>}
                </button>
                {status === "error" && <p className="mt-3 text-center text-xs text-rose-600">Connection failed. Check your details and try again.</p>}
                <p className="mt-4 text-center text-xs leading-5 text-slate-400">Your details are saved securely to start this demo call.</p>
              </form>
            )}

            {!isCalling && <button type="button" onClick={closeWidget} className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-900" aria-label="Close voice agent"><FiX className="h-5 w-5" /></button>}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default RetellVoiceWidget;
