import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { servicesMenu, industriesMenu, findMenuItem } from "../data/menuData";

// One shared template for both /services/:slug and /industries/:slug -
// content shape (tagline, description, highlights) is identical between the
// two, so a single page keeps behavior/SEO structure consistent instead of
// two near-duplicate components drifting apart over time.
const CategoryDetail = ({ kind }) => {
  const { slug } = useParams();
  const list = kind === "service" ? servicesMenu : industriesMenu;
  const otherList = kind === "service" ? industriesMenu : servicesMenu;
  const item = findMenuItem(list, slug);

  const basePath = kind === "service" ? "/services" : "/industries";
  const sectionLabel = kind === "service" ? "Service" : "Industry";
  const crossLabel = kind === "service" ? "Industries we serve" : "Explore our services";
  const crossBasePath = kind === "service" ? "/industries" : "/services";

  if (!item) {
    return <Navigate to="/" replace />;
  }

  const canonicalUrl = `https://faalak.com${basePath}/${item.slug}`;
  const pageTitle = `${item.name} | Faalak AI Automation`;

  const handleConsultationClick = () => {
    const message = encodeURIComponent(
      `Hi, I'd like to talk about ${item.name} for my business.`
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
        <meta name="description" content={item.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={item.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": kind === "service" ? "Service" : "WebPage",
            name: item.name,
            description: item.metaDescription,
            url: canonicalUrl,
            ...(kind === "service"
              ? { provider: { "@type": "Organization", name: "Faalak AI Automation" } }
              : {}),
          })}
        </script>
      </Helmet>

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary dark:text-gray-400"
      >
        <FiArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="mt-6 grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {sectionLabel}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 text-primary dark:from-blue-500/20 dark:to-cyan-400/20">
              <item.icon className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              {item.name}
            </h1>
          </div>
          <p className="mt-5 text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-300">{item.tagline}</p>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">{item.description}</p>
        </motion.div>

        {item.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-3xl border border-gray-200 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.25)] dark:border-gray-700"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-56 w-full object-cover sm:h-72 lg:h-full"
            />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
      >
        {item.highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-[0_14px_30px_-24px_rgba(30,64,175,0.25)] dark:border-gray-700 dark:bg-gray-900/90"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiCheck className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
          </div>
        ))}
      </motion.div>

      {item.whoFor && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-100"
        >
          <strong className="font-semibold">Built for:</strong> {item.whoFor}
        </motion.p>
      )}

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

      {/* Cross-links to the other menu - keeps every page reachable within a
          couple of clicks and gives crawlers a dense internal link graph. */}
      <div className="mt-16 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-700">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{crossLabel}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {otherList.map((entry) => (
            <Link
              key={entry.slug}
              to={`${crossBasePath}/${entry.slug}`}
              className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-white/5 dark:text-gray-300"
            >
              {entry.name}
            </Link>
          ))}
        </div>

        <h2 className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          More {kind === "service" ? "services" : "industries"}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {list
            .filter((entry) => entry.slug !== item.slug)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`${basePath}/${entry.slug}`}
                className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-white/5 dark:text-gray-300"
              >
                {entry.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
