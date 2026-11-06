import { Link } from "react-router-dom";
import { motion } from "motion/react";
import assets from "../assets/assets";
import HeroWiringEffect from "./HeroWiringEffect";

const Hero = () => {
  const handleConsultationClick = () => {
    const message = encodeURIComponent(
      "Hi, I would like to book a free consultation with Faalak AI Automation."
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="hero"
      style={{
        paddingTop: "calc(var(--navbar-h) + clamp(2.5rem, 8vh, 7rem))",
        minHeight: "min(900px, 100svh)",
      }}
      className="faalak-hero relative flex flex-col justify-center overflow-hidden px-4 pb-20 sm:px-12 sm:pb-24 lg:px-16 xl:px-24"
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

      <div className="relative z-10 mx-auto grid w-full max-w-[1228px] gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="flex flex-col items-center gap-5 text-center text-white sm:items-start sm:text-left">
          <p className="text-sm font-semibold tracking-wide text-white/75 sm:text-base">
            Based in Mississauga · Serving the GTA
          </p>
          <motion.h1
            aria-label="Never miss another customer call"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display w-full max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,4.6vw,4.5rem)]"
          >
            Never miss another{" "}
            <span className="faalak-hero-gradient-text">customer call</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="font-display w-full max-w-2xl text-base font-medium leading-relaxed text-white/85 sm:text-lg md:text-xl"
          >
            Our AI receptionist answers every call 24/7, books appointments, and sends you the details on WhatsApp.
          </motion.p>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="tel:+12896709108"
              className="inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02] sm:w-auto"
            >
              Call our AI now: (289) 670-9108
            </a>
            <button
              type="button"
              onClick={handleConsultationClick}
              className="inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
            >
              Book a free consultation
            </button>
          </div>

          <Link
            to="/#missed-call-calculator"
            className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition hover:text-white/80"
          >
            What are missed calls costing me? →
          </Link>

          <div className="hidden flex-wrap gap-2 text-xs sm:flex">
            {["Answers 24/7", "Sounds natural", "Books appointments and collects job details"].map((chip) => (
              <span
                key={chip}
                className="whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white shadow-sm backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden justify-self-end rounded-3xl border border-white/20 bg-black/40 p-8 text-white shadow-2xl backdrop-blur-xl md:block lg:p-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Live demo line</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
            Hear it yourself.
          </h2>
          <a
            href="tel:+12896709108"
            className="mt-6 block whitespace-nowrap text-2xl font-semibold text-white underline decoration-white/40 underline-offset-4 lg:text-3xl"
          >
            Call (289) 670-9108
          </a>
          <p className="mt-3 text-sm text-white/75">Available 24/7, no signup.</p>
        </motion.aside>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;
