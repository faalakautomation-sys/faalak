import assets from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";
import HeroWiringEffect from "./HeroWiringEffect";

const Hero = () => {
  const navigate = useNavigate();
  const buttonsScroll = useHorizontalScroll();
  const badgesScroll = useHorizontalScroll();

  const handleConsultationClick = () => {
    const message = encodeURIComponent(
      "Hi, I would like to book a free consultation with Faalak AI/SI Automation."
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleCalculatorClick = () => {
    navigate("/#missed-call-calculator");
  };

  return (
    <section
      id="hero"
      style={{
        paddingTop: "calc(var(--navbar-h) + clamp(2.5rem, 8vh, 7rem))",
        minHeight: "min(900px, 100svh)",
      }}
      className="faalak-hero relative flex flex-col justify-center overflow-hidden px-4 pb-24 sm:px-12 sm:pb-28 lg:px-16 xl:px-24"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={assets.hero_video} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/60 to-black/15 sm:from-black/85 sm:via-black/45" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-transparent to-[#05070c]" />

      <svg
        aria-hidden="true"
        className="faalak-hero-waves pointer-events-none absolute inset-x-[-18%] top-[2%] z-[2] h-[58%] w-[136%]"
        viewBox="0 0 1600 620"
        preserveAspectRatio="none"
        fill="none"
      >
        {Array.from({ length: 24 }, (_, index) => {
          const offset = index * 14;
          return (
            <path
              key={index}
              d={`M-120 ${190 + offset} C 180 ${40 + offset}, 310 ${40 + offset}, 470 ${190 + offset} S 730 ${370 + offset}, 870 ${190 + offset} S 1120 ${20 + offset}, 1300 ${180 + offset} S 1510 ${330 + offset}, 1730 ${115 + offset}`}
              stroke="white"
              strokeOpacity={0.1 + (index % 5) * 0.012}
              strokeWidth="1"
            />
          );
        })}
      </svg>

      <HeroWiringEffect />

      <div className="relative z-10 mx-auto flex w-full max-w-[1228px] flex-col items-center gap-5 text-center text-white sm:items-start sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-display w-full max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,4.6vw,4.5rem)]"
        >
          Handle 100% of your
          <br className="hidden sm:block" />
          customer phone calls
          <br className="hidden sm:block" />
          24/7 with an
          <br className="hidden sm:block" />
          <span className="faalak-hero-gradient-text">AI voice agent</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="font-display w-full max-w-3xl text-base font-medium leading-relaxed text-white/85 sm:text-lg md:text-xl lg:text-2xl"
        >
          
          Customer Support AI/SI Voice Agents that work 24/7 Generate Leads, Send Instant WhatsApp Notifications, and hand you Qualified Leads
          
                  </motion.p>

        {/* The signature tagline - flat (no tilt), boxed in a simple rounded
            rectangle so it reads as a defined badge/callout rather than
            free-floating text. */}
        
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          viewport={{ once: true }}
          className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 p-1 pr-3 backdrop-blur-md"
        >
          <img className="w-16" src={assets.group_profile} alt="group-profile" />
          <p className="text-[11px] font-medium">Trusted by 10k+ people</p>
        </motion.div> */}

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
              className="shrink-0 snap-center whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105"
            >
              Book Free Consultation
            </button>
            <button
              type="button"
              onClick={handleCalculatorClick}
              className="shrink-0 snap-center whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-white/20"
            >
              Calculate my missed-call earnings
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
              "Answer Every Call 24/7.",
              "Voice Like a Human.",
              "Book Lead and Give you Final Quote.",
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
      <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;
