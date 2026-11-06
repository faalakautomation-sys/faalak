import { motion } from "motion/react";
import { FiCalendar, FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const HowItWorks = () => (
  <section
    id="how-it-works"
    aria-labelledby="how-it-works-heading"
    className="bg-[#090b0e] px-4 py-14 text-white sm:px-10 sm:py-18 lg:px-16 lg:py-20 xl:px-24"
  >
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-[330px] rounded-[2rem] border border-white/15 bg-[#111b20] p-3 shadow-2xl sm:max-w-sm"
      >
        <div className="rounded-[1.5rem] bg-[#0b1419] p-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e4652] text-[#7bd5e7]">F</span>
            <div>
              <p className="font-semibold">Faalak AI</p>
              <p className="text-xs text-white/55">online</p>
            </div>
            <span className="ml-auto whitespace-nowrap text-xs text-white/65">(416) 555-0147</span>
          </div>
          <div className="mt-4 rounded-xl bg-[#1b292f] px-3 py-2 text-center text-xs leading-5 text-amber-200">
            Messages stay private to your business.
          </div>
          <div className="mt-4 space-y-3">
            <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-[#087b63] p-3 text-sm leading-5">
              Could you book me for tomorrow morning at 11 AM?
              <p className="mt-1 text-right text-[11px] text-white/65">9:41 AM</p>
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-[#1b292f] p-3 text-sm leading-5">
              <p className="flex items-center gap-2 font-semibold">
                <FiCalendar className="text-emerald-300" /> Appointment confirmed
              </p>
              <p className="mt-1">Tomorrow, 11:00 AM</p>
              <p className="mt-1 text-right text-[11px] text-white/45">9:42 AM</p>
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-[#1b292f] p-3 text-sm leading-5">
              <p className="font-semibold">New lead alert</p>
              <p className="mt-1 text-white/75">Name: Daniel Brooks</p>
              <p className="whitespace-nowrap text-white/75">Phone: (416) 555-0147</p>
              <p className="mt-1 text-white/90">Furnace stopped working. Wants a technician today.</p>
              <p className="mt-1 text-right text-[11px] text-white/45">9:43 AM</p>
            </div>
          </div>
          <div className="mt-4 rounded-full bg-[#1b292f] px-4 py-3 text-sm text-white/55">Message</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9ae80]">How it works</p>
        <h2 id="how-it-works-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Every call answered. Every lead on WhatsApp.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
          Faalak AI answers, qualifies and books, then alerts you instantly.
        </p>
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d9ae80] text-[#171717]">
              <FiPhoneCall className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">Call answered by Faalak AI</p>
              <p className="text-sm text-white/60">Inbound call · 1m 52s · Lead captured</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d9ae80] text-[#171717]">
              <FaWhatsapp className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">Lead sent to WhatsApp</p>
              <p className="text-sm text-white/60">Lead details delivered to your team.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d9ae80] text-[#171717]">
              <FiCalendar className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">Appointment confirmed</p>
              <p className="whitespace-nowrap text-sm text-white/60">Tomorrow, 11:00 AM</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
