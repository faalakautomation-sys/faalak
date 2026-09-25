import { useState } from "react";
import { motion } from "motion/react";
import { FiCheck, FiCopy, FiPhoneCall, FiPhoneForwarded, FiX } from "react-icons/fi";

const agents = [
  { name: "Physio Therapist", number: "+12893676052", displayNumber: "+1 289 367 6052" },
  { name: "Faalak", number: "+12896709108", displayNumber: "+1 289 670 9108" },
  { name: "Cannabis", number: "+12897685945", displayNumber: "+1 289 768 5945" },
  { name: "Restaurant", number: "+12893675561", displayNumber: "+1 289 367 5561" },
];

const DirectAgentCalls = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [copied, setCopied] = useState(false);

  const openCallDialog = (agent) => {
    setSelectedAgent(agent);
    setCopied(false);
  };

  const copyNumber = async () => {
    if (!selectedAgent) return;
    await navigator.clipboard.writeText(selectedAgent.number).catch(() => {});
    setCopied(true);
  };

  return (
  <section className="relative px-4 pb-8 pt-2 sm:px-12 sm:pb-12 lg:px-24 xl:px-40" aria-labelledby="direct-agent-calls-heading">
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-r from-cyan-500/10 via-blue-400/10 to-orange-400/10 blur-3xl" />
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Try an agent</span>
          </div>
          <h2 id="direct-agent-calls-heading" className="font-elite mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Call a live demo directly.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Choose an industry and call the agent from your phone to hear a real conversation flow.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent, index) => (
          <motion.article
            key={agent.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            viewport={{ once: true }}
            className="group flex min-h-48 flex-col justify-between rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_18px_45px_-28px_rgba(30,64,175,0.5)] ring-1 ring-blue-100/70 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(30,64,175,0.5)]"
          >
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary transition group-hover:bg-primary group-hover:text-white">
                <FiPhoneCall className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900">{agent.name}</h3>
              <p className="mt-2 text-sm tracking-wide text-gray-500">{agent.displayNumber}</p>
            </div>

            <p className="text-xs font-medium text-gray-500 mt-2">Dial from your phone</p>
            <a
              href={`tel:${agent.number}`}
              onClick={(event) => {
                event.preventDefault();
                openCallDialog(agent);
              }}
              className="relative z-10 mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
              aria-label={`Call the ${agent.name} live demo at ${agent.displayNumber}`}
            >
            
              <FiPhoneCall className="h-4 w-4" />
              Call Now
            </a>
          </motion.article>
        ))}
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 z-9998 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="presentation" onClick={() => setSelectedAgent(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="direct-call-dialog-title" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Live demo call</p>
                <h2 id="direct-call-dialog-title" className="mt-2 text-2xl font-bold">Call {selectedAgent.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedAgent(null)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close call dialog">
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">You are viewing the site on a laptop. Use a phone to call this number, or open a phone app configured on this computer.</p>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
              <span className="text-lg font-bold tracking-wide">{selectedAgent.displayNumber}</span>
              <button type="button" onClick={copyNumber} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary shadow-sm hover:bg-blue-50" aria-label="Copy phone number">
                {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <a href={`tel:${selectedAgent.number}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-blue-700">
              <FiPhoneForwarded className="h-4 w-4" /> Dial From Your Phone
            </a>
          </div>
        </div>
      )}
    </div>
  </section>
  );
};

export default DirectAgentCalls;
