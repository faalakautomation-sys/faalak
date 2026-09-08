import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { caseStudies } from "../assets/assets";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  const canonicalUrl = `https://faalak.com/work/${study.slug}`;
  const pageTitle = `${study.title} Case Study | Faalak AI Automation`;
  const metaDescription = `${study.summary} See how Faalak's AI voice agent and automation helped this ${study.industry.toLowerCase()} business.`;

  const handleConsultationClick = () => {
    const message = encodeURIComponent(
      `Hi, I saw the ${study.title} case study and would like results like that for my business.`
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleTalkToMaya = () => {
    window.dispatchEvent(new Event("open-retell-widget"));
    toast.success("Your Retell voice agent is ready in the bottom-right corner.");
  };

  return (
    <div
      style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
      className="px-4 pb-24 sm:px-12 lg:px-24 xl:px-40"
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary dark:text-gray-400"
      >
        <FiArrowLeft className="h-4 w-4" /> Back to case studies
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 max-w-3xl"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{study.industry}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
          {study.title}
        </h1>
        <p className="mt-5 text-lg text-gray-700 dark:text-gray-300">{study.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3"
      >
        {study.metrics.map((metric) => (
          <div
            key={metric}
            className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-center text-sm font-semibold text-blue-900 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-100"
          >
            {metric}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 max-w-3xl space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">The challenge</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{study.challenge}</p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-[0_14px_30px_-24px_rgba(30,64,175,0.25)] dark:border-gray-700 dark:bg-gray-900/90">
          <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">The Faalak solution</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{study.solution}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center gap-4"
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
          onClick={handleTalkToMaya}
          className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105 dark:border-gray-600 dark:bg-white/5 dark:text-white"
        >
          Talk to Maya
        </button>
      </motion.div>

      <div className="mt-16 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-700">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">More case studies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudies
            .filter((entry) => entry.slug !== study.slug)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`/work/${entry.slug}`}
                className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-white/5 dark:text-gray-300"
              >
                {entry.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
