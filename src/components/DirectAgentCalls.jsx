import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { FiActivity, FiCheck, FiCopy, FiPhoneCall, FiWind, FiX } from "react-icons/fi";
import { FaCouch, FaHome, FaSpa } from "react-icons/fa";
import toast from "react-hot-toast";
import { GTA_INDUSTRIES } from "../data/industries";

const PRESENTATION = {
  "massage-and-spa": { category: "Health & wellness", icon: FaSpa, accent: "#a883d8" },
  "furniture-store": { category: "Retail", icon: FaCouch, accent: "#91a86c" },
  hvac: { category: "Home services", icon: FiWind, accent: "#62a9b4" },
  "real-estate": { category: "Property", icon: FaHome, accent: "#d59c69" },
  landscaping: { category: "Home services", icon: FiActivity, accent: "#76a77b" },
};

const agents = GTA_INDUSTRIES.map((industry) => ({
  ...industry,
  ...PRESENTATION[industry.slug],
}));

const DirectAgentCalls = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [copied, setCopied] = useState(false);
  const selected = agents[selectedIndex];

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(selectedAgent.number);
      setCopied(true);
      toast.success("Phone number copied.");
    } catch (error) {
      console.error("Could not copy the demo phone number:", error);
      toast.error("Could not copy the phone number. Please copy it manually.");
    }
  };

  return (
    <section
      id="live-demos"
      className="faalak-agent-gallery relative scroll-mt-24 overflow-hidden px-4 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-24"
      aria-labelledby="live-demos-heading"
    >
      <div className="faalak-agent-gallery-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#985236]" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#985236]">Try an agent</span>
        </div>
        <h2
          id="live-demos-heading"
          className="font-display mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#151515] sm:text-4xl md:text-5xl"
        >
          Live Demos
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#68635e] sm:text-base">
          Choose a business type and call its demo agent to hear a real conversation flow.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist" aria-label="Choose a live demo">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isSelected = selectedIndex === index;
            return (
              <button
                key={agent.slug}
                id={`demo-tab-${agent.slug}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="demo-detail-panel"
                onClick={() => setSelectedIndex(index)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  isSelected
                    ? "border-[#24211e] bg-white shadow-[0_12px_35px_rgba(36,33,30,0.1)]"
                    : "border-[#e5e0da] bg-white/65 hover:bg-white"
                }`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${agent.accent}25`, color: agent.accent }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#988d83]">
                    {agent.category}
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold text-[#201e1c]">{agent.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.slug}
            id="demo-detail-panel"
            role="tabpanel"
            aria-labelledby={`demo-tab-${selected.slug}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-col gap-5 rounded-[1.5rem] border border-[#e5e0da] bg-white p-5 shadow-[0_24px_70px_rgba(43,36,30,0.07)] sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#985236]">{selected.category}</p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#171717]">{selected.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69645f]">{selected.scenario}</p>
              <p className="mt-2 whitespace-nowrap text-xs text-[#8e857d]">{selected.displayNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedAgent(selected);
                setCopied(false);
              }}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0054a8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004987]"
              aria-label={`Call the ${selected.name} demo`}
            >
              <FiPhoneCall className="h-4 w-4" />
              Call {selected.name}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9998 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            role="presentation"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-[#e9e3dc] bg-[#faf9f7] p-6 text-[#171717] shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="direct-call-dialog-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#985236]">Live demo call</p>
                  <h2 id="direct-call-dialog-title" className="mt-2 text-2xl font-semibold">
                    Call our {selectedAgent.name} demo agent
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAgent(null)}
                  className="rounded-full p-2 text-[#827a72] transition hover:bg-[#eee9e3] hover:text-[#171717]"
                  aria-label="Close call dialog"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#6d665f]">{selectedAgent.scenario}</p>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-[#e9e3dc] bg-white px-4 py-3">
                <span className="whitespace-nowrap text-lg font-bold tracking-wide">{selectedAgent.displayNumber}</span>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#f3f0ec] px-3 py-2 text-xs font-bold text-[#423b35] transition hover:bg-[#e9e3dc]"
                  aria-label="Copy phone number"
                >
                  {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="mt-5 hidden flex-col items-center gap-3 rounded-xl border border-[#e9e3dc] bg-white p-4 text-center md:flex">
                <QRCodeSVG value={`tel:${selectedAgent.number}`} size={160} level="M" aria-label={`QR code to call ${selectedAgent.name}`} />
                <p className="text-sm font-semibold text-[#423b35]">Scan to call from your phone</p>
              </div>
              <a
                href={`tel:${selectedAgent.number}`}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0054a8] px-5 py-3 font-bold text-white transition hover:bg-[#004987] md:hidden"
              >
                <FiPhoneCall className="h-4 w-4" />
                Call from your phone
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DirectAgentCalls;
