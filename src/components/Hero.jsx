import assets from "../assets/assets";
import { motion } from "motion/react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";
import HeroWiringEffect from "./HeroWiringEffect";

const Hero = () => {
  const buttonsScroll = useHorizontalScroll();
  const badgesScroll = useHorizontalScroll();

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

      <div className="relative z-10 mx-auto grid w-full max-w-[1228px] grid-cols-1 items-center gap-8 text-white lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex w-full flex-col items-center gap-5 text-center sm:items-start sm:text-left">
          <p className="text-xs font-semibold tracking-[0.12em] text-white/75 sm:text-sm">
          Based in Mississauga · Serving the GTA
          </p>
          <motion.h1
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-display w-full max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,4.6vw,4.5rem)]"
        >
          Never miss another{" "}
          <span className="text-[#66b5ff]">customer call</span>
          </motion.h1>

          <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="font-display w-full max-w-3xl text-base font-medium leading-relaxed text-white/85 sm:text-lg md:text-xl lg:text-2xl"
        >
          
          Our AI receptionist answers every call 24/7, books appointments, and sends you the details on WhatsApp.
          </motion.p>

          <div className="relative w-full sm:w-auto">
          <motion.div
            ref={buttonsScroll.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory flex-col items-stretch gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            <a
              href="tel:+12896709108"
              className="w-full shrink-0 snap-center whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 sm:w-auto"
            >
              Call our AI now: (289) 670-9108
            </a>
            <a
              href="https://wa.me/14169104547?text=Hi%2C%20I%20would%20like%20to%20book%20a%20free%20consultation%20with%20Faalak%20AI%2FSI%20Automation."
              target="_blank"
              rel="noreferrer"
              className="w-full shrink-0 snap-center whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-white/20 sm:w-auto"
            >
              Book a free consultation
            </a>
          </motion.div>
          <ScrollArrows
            canScrollLeft={buttonsScroll.canScrollLeft}
            canScrollRight={buttonsScroll.canScrollRight}
            onLeft={() => buttonsScroll.scrollByStep(-1)}
            onRight={() => buttonsScroll.scrollByStep(1)}
          />
          <a
            href="/#missed-call-calculator"
            className="mt-3 inline-block text-sm font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
          >
            What are missed calls costing me? →
          </a>
          </div>

          <div className="relative w-full sm:w-auto">
          <motion.div
            ref={badgesScroll.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory flex-wrap items-center justify-center gap-2 overflow-x-auto px-4 pb-1 text-xs sm:mx-0 sm:w-auto sm:justify-start sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {[
              "Answers 24/7",
              "Sounds natural",
              "Books appointments and collects job details",
            ].map((badge) => (
              <span
                key={badge}
                className="shrink-0 snap-center whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white shadow-sm backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </motion.div>
          <div className="sm:hidden">
            <ScrollArrows
              canScrollLeft={false}
              canScrollRight={false}
              onLeft={() => badgesScroll.scrollByStep(-1)}
              onRight={() => badgesScroll.scrollByStep(1)}
            />
          </div>
          <div className="hidden sm:block">
            <ScrollArrows
              canScrollLeft={badgesScroll.canScrollLeft}
              canScrollRight={badgesScroll.canScrollRight}
              onLeft={() => badgesScroll.scrollByStep(-1)}
              onRight={() => badgesScroll.scrollByStep(1)}
            />
            </div>
          </div>
        </div>

      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;
