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
      style={{ paddingTop: "calc(var(--navbar-h) + clamp(1rem, 4vw, 3rem))" }}
      className="relative flex flex-col overflow-hidden px-4 pb-28 sm:px-12 sm:pb-36 lg:px-24 xl:px-40"
    >
      {/* Full-bleed background video - replaces the old static AI-receptionist
          photo. muted+playsInline+autoPlay is required for autoplay to be
          allowed on mobile browsers (iOS Safari in particular refuses
          autoplay with sound or without playsInline). */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src={assets.hero_video} type="video/mp4" />
      </video>

      {/* Dark scrim over the video so white text stays readable regardless of
          what's playing underneath it. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center text-white sm:mr-auto sm:ml-0 sm:items-start sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-elite w-full max-w-lg text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Faalak AI Agenc<span className="text-blue-400" style={
            {
              fontWeight: 700
            }
          }>y</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="font-display w-full max-w-xl text-base font-bold leading-snug text-white sm:text-lg md:text-xl lg:text-2xl"
        >
          We build intelligent voice agents and automated chatbots that speak like humans and scale like software.
        </motion.p>

        {/* The signature tagline - flat (no tilt), boxed in a simple rounded
            rectangle so it reads as a defined badge/callout rather than
            free-floating text. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full max-w-md rounded-2xl border border-white/30 bg-white/5 px-4 py-3 backdrop-blur-sm"
        >
          <p className="font-display text-base font-semibold leading-snug tracking-tight text-white-400 sm:text-lg">
            &ldquo;Never Miss A Call, Never Miss A Lead.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          viewport={{ once: true }}
          className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 p-1 pr-3 backdrop-blur-sm"
        >
          <img className="w-16" src={assets.group_profile} alt="group-profile" />
          <p className="text-[11px] font-medium">Trusted by 10k+ people</p>
        </motion.div>

        <div className="relative w-full sm:w-auto">
          <motion.div
            ref={buttonsScroll.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            <button
              type="button"
              onClick={handleConsultationClick}
              className="shrink-0 snap-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
            >
              Book Free Consultation
            </button>
            <button
              type="button"
              onClick={handleWatchDemoClick}
              className="shrink-0 snap-center whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-white/20"
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
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto px-4 pb-1 text-xs sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {[
              "Continuous workflows.",
              "Flawless communication.",
              "Never miss a call. Never lose a lead.",
            ].map((badge) => (
              <span
                key={badge}
                className="shrink-0 snap-center whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white shadow-sm backdrop-blur-sm"
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
      </div>
    </div>
  );
};

export default Hero;
