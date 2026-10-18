import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { faqData } from "../assets/assets";

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  const answerId = `faq-answer-${index}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
      viewport={{ once: true }}
      className="border-b border-[#e5dfd8]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
      >
        <span className="text-base font-semibold leading-snug tracking-[-0.02em] text-[#24211e] sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-7 w-7 shrink-0 items-center justify-center text-[#a34d2c]"
          aria-hidden="true"
        >
          <FiPlus className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[#626b7b] sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  const openVoiceDemo = () => {
    window.dispatchEvent(new Event("open-retell-widget"));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden border-t border-[#e5dfd8] bg-[#f5f3ef] px-5 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24"
    >
      <div className="faalak-demo-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="faalak-faq-layout relative mx-auto grid max-w-7xl gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="h-fit lg:sticky lg:top-32"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#985236]" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#985236]">
              Common questions
            </span>
          </div>
          <h2
            id="faq-heading"
            className="font-display mt-4 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#171717] sm:text-5xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#68635d] sm:text-base">
            We&apos;ve shared answers to some of the questions businesses ask us most. If you need more detail, our team is happy to help.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/#contact-us"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0054a8] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#004987]"
            >
              Talk to our team
            </Link>
            <button
              type="button"
              onClick={openVoiceDemo}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#d8d1c9] bg-white px-6 py-3 text-sm font-semibold text-[#24211e] transition hover:-translate-y-0.5 hover:border-[#b9a99a] hover:bg-[#fbfaf8]"
            >
              Hear a live call
            </button>
          </div>
        </motion.div>

        <div className="border-t border-[#e5dfd8]">
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
      </div>
    </section>
  );
};

export default FAQ;
