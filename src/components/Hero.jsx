import assets from "../assets/assets";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

const Hero = () => {
  const buttonsScroll = useHorizontalScroll();
  const badgesScroll = useHorizontalScroll();

  const handleConsultationClick = () => {
    const message = encodeURIComponent(
      "Hi, I would like to book a free consultation with Faalak AI Automation."
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleWatchDemoClick = (event) => {
    event.preventDefault();
    window.dispatchEvent(new Event("open-retell-widget"));
    toast.success("Your Retell voice agent is ready in the bottom-right corner.");
  };

  return (
    <div
      id="hero"
      className="relative flex flex-col overflow-hidden px-4 py-16 text-gray-700 sm:px-12 sm:py-20 lg:px-24 xl:px-40 dark:text-white"
    >
      {/* Creative animated background - layered, slowly drifting gradient blobs
          behind everything, plus a faint dot grid for depth. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#075bd8]/25 via-[#3b82f6]/15 to-transparent blur-3xl dark:from-[#075bd8]/30"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#9b7cff]/25 via-[#ff4b9b]/15 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[#24d5ff]/20 via-[#075bd8]/10 to-transparent blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.35) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#075bd8] dark:text-[#5b9dff]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#075bd8] dark:bg-[#5b9dff]" />
          Faalak AI Agency
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-2xl text-sm font-medium text-gray-500 sm:text-lg dark:text-white/70"
        >
          We build intelligent voice agents and automated chatbots that speak like humans and scale like software.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl md:text-6xl xl:text-[76px] xl:leading-[1.08]"
        >
          &ldquo;Never Miss A Call,
          <br />
          Never Miss A Lead.&rdquo;
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 p-1.5 pr-4 dark:border-gray-700"
        >
          <img className="w-20" src={assets.group_profile} alt="group-profile" />
          <p className="text-xs font-medium">Trusted by 10k+ people</p>
        </motion.div>

        <div className="relative w-full sm:w-auto">
          <motion.div
            ref={buttonsScroll.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            <button
              type="button"
              onClick={handleConsultationClick}
              className="shrink-0 snap-center whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              Book Free Consultation
            </button>
            <button
              type="button"
              onClick={handleWatchDemoClick}
              className="shrink-0 snap-center whitespace-nowrap rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
            >
              Watch Demo
            </button>
          </motion.div>
          <ScrollArrows
            canScrollLeft={buttonsScroll.canScrollLeft}
            canScrollRight={buttonsScroll.canScrollRight}
            onLeft={() => buttonsScroll.scrollByStep(-1)}
            onRight={() => buttonsScroll.scrollByStep(1)}
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <motion.div
            ref={badgesScroll.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto px-4 pb-1 text-sm sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {[
              "Continuous workflows.",
              "Flawless communication.",
              "Never miss a call. Never lose a lead.",
            ].map((badge) => (
              <span
                key={badge}
                className="shrink-0 snap-center whitespace-nowrap rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
              >
                {badge}
              </span>
            ))}
          </motion.div>
          <ScrollArrows
            canScrollLeft={badgesScroll.canScrollLeft}
            canScrollRight={badgesScroll.canScrollRight}
            onLeft={() => badgesScroll.scrollByStep(-1)}
            onRight={() => badgesScroll.scrollByStep(1)}
          />
        </div>

        {/* Hero cover image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mt-6 w-full max-w-5xl"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-[#075bd8]/25 via-[#9b7cff]/20 to-[#ff4b9b]/15 blur-2xl sm:-inset-8" />

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_70px_-20px_rgba(7,91,216,0.35)] sm:rounded-3xl dark:border-white/10">
            <img
              src={assets.hero_cover}
              alt="Faalak AI receptionist answering calls at a futuristic front desk"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Floating call UI, glassmorphic - reinforces "AI attending calls" */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute left-2 top-3 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.14)] backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2.5 sm:text-xs dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Incoming call...
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 1.2 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute bottom-3 right-2 flex items-end gap-[3px] rounded-2xl border border-white/40 bg-white/80 px-3 py-2.5 shadow-[0_14px_34px_rgba(15,23,42,0.14)] backdrop-blur-md sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-slate-900/70"
          >
            {[6, 14, 9, 18, 7, 12].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [h, h * 1.8, h] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                style={{ height: h }}
                className="w-[3px] rounded-full bg-gradient-to-t from-[#075bd8] to-[#24d5ff]"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
