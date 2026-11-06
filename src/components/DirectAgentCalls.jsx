import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiActivity,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiCoffee,
  FiCopy,
  FiFeather,
  FiPhoneCall,
  FiPhoneForwarded,
  FiWind,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

const agents = [
  {
    name: "Physio Therapist",
    number: "+12893676052",
    displayNumber: "+1 289 367 6052",
    category: "Health & wellness",
    description:
      "A calm first contact for patients: answering service questions, understanding what callers need, and helping them request an appointment.",
    moments: ["Patient enquiries", "Service information", "Appointment requests"],
    icon: FiActivity,
    accent: "#a883d8",
    glow: "rgba(168, 131, 216, 0.24)",
    orbClass: "is-lavender",
  },
  {
    name: "HVAC",
    number: "+12898166716",
    displayNumber: "+1 289 816 6716",
    category: "Home services",
    description:
      "An always-ready voice for heating and cooling enquiries, gathering job details and helping callers arrange a service visit.",
    moments: ["Service enquiries", "Job details", "Visit requests"],
    icon: FiWind,
    accent: "#62a9b4",
    glow: "rgba(98, 169, 180, 0.24)",
    orbClass: "is-teal",
  },
  {
    name: "Cannabis",
    number: "+12897685945",
    displayNumber: "+1 289 768 5945",
    category: "Retail",
    description:
      "A helpful shop assistant for store information, product questions, and availability, keeping every caller moving in the right direction.",
    moments: ["Store information", "Product enquiries", "Availability questions"],
    icon: FiFeather,
    accent: "#91a86c",
    glow: "rgba(145, 168, 108, 0.24)",
    orbClass: "is-sage",
  },
  {
    name: "Restaurant",
    number: "+12893675561",
    displayNumber: "+1 289 367 5561",
    category: "Hospitality",
    description:
      "A warm welcome for guests with quick answers about the menu, opening hours, location, and reservation requests.",
    moments: ["Menu questions", "Hours & location", "Reservation requests"],
    icon: FiCoffee,
    accent: "#d59c69",
    glow: "rgba(213, 156, 105, 0.25)",
    orbClass: "is-amber",
  },
];

const AgentOrb = ({ agent, compact = false }) => (
  <div
    className={`faalak-agent-orb ${agent.orbClass} ${compact ? "is-compact" : ""}`}
    style={{ "--agent-accent": agent.accent, "--agent-glow": agent.glow }}
    aria-hidden="true"
  >
    <span className="faalak-agent-orb-halo" />
    <span className="faalak-agent-orb-core" />
    <span className="faalak-agent-orb-ring ring-one" />
    <span className="faalak-agent-orb-ring ring-two" />
    <span className="faalak-agent-orb-dot dot-one" />
    <span className="faalak-agent-orb-dot dot-two" />
    <span className="faalak-agent-orb-dot dot-three" />
  </div>
);

const DirectAgentCalls = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [copied, setCopied] = useState(false);
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();
  const selected = agents[selectedIndex];
  const SelectedIcon = selected.icon;

  const selectAgent = (index) => {
    setSelectedIndex(index);
    ref.current?.querySelector(`[data-agent-index="${index}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % agents.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + agents.length) % agents.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = agents.length - 1;
    else return;

    event.preventDefault();
    selectAgent(nextIndex);
    document.getElementById(`agent-tab-${nextIndex}`)?.focus();
  };

  const openCallDialog = () => {
    setSelectedAgent(selected);
    setCopied(false);
  };

  const copyNumber = async () => {
    if (!selectedAgent) return;
    try {
      await navigator.clipboard.writeText(selectedAgent.number);
      setCopied(true);
      toast.success("Phone number copied.");
    } catch (error) {
      console.error("Could not copy the agent phone number:", error);
      toast.error("Could not copy the phone number. Please select and copy it manually.");
    }
  };

  return (
    <section
      id="gallery"
      className="faalak-agent-gallery relative scroll-mt-24 overflow-hidden px-4 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-24"
      aria-labelledby="direct-agent-calls-heading"
    >
      <div className="faalak-agent-gallery-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <span aria-hidden="true" className="faalak-demo-cross absolute left-[12%] top-0" />
      <span aria-hidden="true" className="faalak-demo-cross absolute right-[12%] top-0" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#985236]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#985236]">
                Try an agent
              </span>
            </div>
            <h2
              id="direct-agent-calls-heading"
              className="font-display mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#151515] sm:text-4xl md:text-5xl"
            >
              Voice Agents Gallery.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-5 lg:pb-1">
            <p className="max-w-xl text-sm leading-6 text-[#68635e] sm:text-base">
              Choose an industry and call the agent from your phone to hear a real conversation flow.
            </p>
            <div className="hidden shrink-0 items-center gap-2 sm:flex" aria-label="Agent gallery controls">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                disabled={!canScrollLeft}
                className="faalak-agent-scroll-button"
                aria-label="Scroll agents left"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                disabled={!canScrollRight}
                className="faalak-agent-scroll-button"
                aria-label="Scroll agents right"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-5">
          <div
            ref={ref}
            className="faalak-agent-rail no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:gap-4 sm:px-0"
            role="tablist"
            aria-label="Choose a voice agent"
            aria-orientation="horizontal"
          >
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={agent.name}
                  id={`agent-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="agent-detail-panel"
                  tabIndex={isSelected ? 0 : -1}
                  data-agent-index={index}
                  onClick={() => selectAgent(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`faalak-agent-tab group flex min-w-[205px] snap-start items-center gap-3 rounded-2xl border p-2.5 text-left transition duration-300 sm:min-w-[290px] ${
                    isSelected
                      ? "is-selected border-[#24211e] bg-white shadow-[0_12px_35px_rgba(36,33,30,0.1)]"
                      : "border-[#e5e0da] bg-white/65 hover:border-[#c9b9ab] hover:bg-white"
                  }`}
                >
                  <AgentOrb agent={agent} compact />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#988d83]">
                      {agent.category}
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-[#201e1c]">
                      {agent.name}
                    </span>
                  </span>
                  {isSelected && (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#171717]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.15em] text-[#91877f] sm:hidden">
            <span>Swipe to explore agents</span>
            <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(agents.length).padStart(2, "0")}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            id="agent-detail-panel"
            role="tabpanel"
            aria-labelledby={`agent-tab-${selectedIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="faalak-agent-detail mt-5 grid overflow-hidden rounded-[1.5rem] border border-[#e5e0da] bg-white shadow-[0_24px_70px_rgba(43,36,30,0.07)] md:grid-cols-[0.75fr_1.25fr]"
          >
            <div
              className="faalak-agent-stage hidden min-h-[230px] items-center justify-center overflow-hidden border-b border-[#eee9e3] md:flex md:border-b-0 md:border-r"
              style={{ "--agent-glow": selected.glow }}
            >
              <div className="relative flex h-full min-h-[230px] w-full items-center justify-center">
                <div className="faalak-agent-stage-orbit orbit-a" aria-hidden="true" />
                <div className="faalak-agent-stage-orbit orbit-b" aria-hidden="true" />
                <AgentOrb agent={selected} />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b625b] shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Demo line ready
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-7">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#985236]">
                  {selected.category}
                </span>
                <span className="h-px flex-1 bg-[#eee9e3]" />
                <span className="font-mono text-xs text-[#978d84]">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(agents.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="md:hidden">
                  <AgentOrb agent={selected} compact />
                </span>
                <span
                  className="hidden h-10 w-10 items-center justify-center rounded-2xl text-[#211e1b] md:flex"
                  style={{ backgroundColor: selected.glow }}
                >
                  <SelectedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-2xl">
                  {selected.name}
                </h3>
              </div>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#69645f]">
                {selected.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selected.moments.map((moment) => (
                  <span
                    key={moment}
                    className="rounded-full border border-[#e8e2dc] bg-[#faf8f5] px-3 py-1.5 text-xs font-medium text-[#625c56]"
                  >
                    {moment}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <button
                  type="button"
                  onClick={openCallDialog}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0054a8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004987]"
                  aria-label={`Call the ${selected.name} demo`}
                >
                  <FiPhoneCall className="h-4 w-4" />
                  Call {selected.name}
                </button>
                <span className="text-left text-xs text-[#8e857d]">
                  Hear the live demo on your phone
                </span>
              </div>
            </div>
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
                    Call {selectedAgent.name}
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
              <p className="mt-4 text-sm leading-6 text-[#6d665f]">
                You are viewing the site on a laptop. Use a phone to call this number, or open a phone app configured on this computer.
              </p>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-[#e9e3dc] bg-white px-4 py-3">
                <span className="text-lg font-bold tracking-wide">{selectedAgent.displayNumber}</span>
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
              <a
                href={`tel:${selectedAgent.number}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0054a8] px-5 py-3 font-bold text-white transition hover:bg-[#004987]"
              >
                <FiPhoneForwarded className="h-4 w-4" />
                Dial From Your Phone
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DirectAgentCalls;
