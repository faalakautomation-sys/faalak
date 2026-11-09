import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { caseStudies } from "../assets/assets";

const WorkIndex = () => (
  <div
    style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
    className="px-4 pb-24 sm:px-12 lg:px-24 xl:px-40"
  >
    <Helmet>
      <title>Case Studies | Faalak AI Automation</title>
      <meta
        name="description"
        content="See how Faalak's AI voice agents and automation helped real businesses across retail, real estate, wellness, and more capture more leads and answer faster."
      />
      <link rel="canonical" href="https://faalak.com/work" />
    </Helmet>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Work</p>
      <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
        Case studies
      </h1>
      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
        Real businesses using Faalak AI automation to stop losing leads and start answering every call and chat.
      </p>
    </motion.div>

    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Link
            to={`/work/${study.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900/90"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">{study.industry}</p>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">{study.title}</h2>
            <p className="mt-3 flex-1 text-sm text-gray-600 dark:text-gray-400">{study.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Read case study
              <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default WorkIndex;
