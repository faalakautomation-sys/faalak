import Title from "./Title";
import { caseStudies } from "../assets/assets";
import { motion } from "motion/react";

const OurWork = () => {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="our-work"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Case Studies"
        desc="See how Faalak AI Automation helps service businesses capture more leads, answer faster, and turn conversations into booked calls."
      />

      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            key={study.title}
            className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900/90"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-200">{study.industry}</p>
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">{study.title}</h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{study.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
              {study.metrics.map((metric) => (
                <li key={metric} className="rounded-xl bg-gray-100/80 px-3 py-2 dark:bg-gray-800/80">{metric}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default OurWork;