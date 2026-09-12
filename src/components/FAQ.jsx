import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlus } from "react-icons/fi";
import { faqData } from "../assets/assets";

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      viewport={{ once: true }}
      className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300 ${
        isOpen
          ? "border-primary/60 bg-white/10"
          : "border-white/10 bg-white/5 hover:border-white/25"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white sm:text-[15px]">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            isOpen ? "bg-primary text-white" : "bg-white/10 text-white/70"
          }`}
        >
          <FiPlus className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-xs leading-5 text-white/70 sm:text-sm">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div id="faq" className="relative overflow-hidden bg-primary-deep px-4 py-16 sm:px-12 sm:py-24 lg:px-24 xl:px-40">
      {/* Layered radial glows over the dark gradient base - gives the panel
          depth instead of a flat single color, and keeps it visually tied
          to the primary blue used across the rest of the site. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1a4d] via-primary-deep to-[#050b24]" />
      <div className="pointer-events-none absolute -top-32 left-1/4 z-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 z-0 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-4"
      >
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
          Answers before you even have to ask.
        </span>
        <h2 className="font-elite max-w-2xl text-center text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mb-6 max-w-xl text-center text-sm text-white/70 sm:text-base">
          Everything you need to know before putting an AI voice agent and chatbot to
          work for your business.
        </p>

        <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
