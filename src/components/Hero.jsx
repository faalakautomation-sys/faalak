import assets from "../assets/assets";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Hero = () => {
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
      className="flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full"
      >
        <img className="w-20" src={assets.group_profile} alt="group-profile" />
        <p className="text-xs font-medium">Trusted by 10k+ people</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl"
      >
        <span className="block whitespace-nowrap">Faalak AI: Never Miss A Call,</span>
        <span className="block whitespace-nowrap">Never Miss A Lead.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3"
      >
        We build intelligent voice agents and automated chatbots that speak like humans and scale like software.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={handleConsultationClick}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
        >
          Book Free Consultation
        </button>
        <button
          type="button"
          onClick={handleWatchDemoClick}
          className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
        >
          Watch Demo
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-3 text-sm"
      >
        {[
          "Continuous workflows.",
          "Flawless communication.",
          "Bringing the universe of conversational AI to your business.",
          "Never miss a call. Never lose a lead.",
        
        ].map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
          >
            {badge}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        viewport={{ once: true }}
        className="relative"
      >
        <img src={assets.hero_img} alt="hero" className="w-full max-w-6xl" />
        <img
          src={assets.bgImage1}
          alt="gradient-bg"
          className="absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 dark:hidden"
        />
      </motion.div>
    </div>
  );
};

export default Hero;