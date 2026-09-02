import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlus } from "react-icons/fi";
import { faqData } from "../assets/assets";
import Title from "./Title";

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className={`overflow-hidden rounded-xl border bg-white/90 shadow-[0_12px_28px_-22px_rgba(30,64,175,0.18)] transition-colors duration-300 dark:bg-gray-900/90 ${
        isOpen
          ? "border-blue-300 dark:border-blue-700"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-[15px] dark:text-white">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            isOpen
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
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
            <p className="px-4 pb-4 text-xs leading-5 text-gray-600 sm:text-sm dark:text-gray-300">
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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="faq"
      className="relative flex flex-col items-center gap-4 px-4 sm:px-12 lg:px-24 xl:px-40 pt-16 text-gray-700 dark:text-white"
    >
      <div className="absolute inset-x-0 top-6 -z-10 h-48 rounded-full bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-sky-500/10 blur-3xl" />

      <Title
        compact
        title="Frequently Asked Questions"
        desc="Everything you need to know before putting an AI voice agent and chatbot to work for your business."
      />

      <div className="flex w-full max-w-2xl flex-col gap-2.5">
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
  );
};

export default FAQ;
