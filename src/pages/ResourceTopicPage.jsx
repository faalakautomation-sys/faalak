import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { resourceTopics } from "../data/resourceTopics";

const ResourceTopicPage = () => {
  const { slug } = useParams();
  const topic = resourceTopics[slug];

  if (!topic) return <Navigate to="/not-found" replace />;

  const canonicalUrl = `https://www.faalak.com/resources/${slug}`;
  const pageTitle = `${topic.title} | Faalak Resources`;
  const description = topic.description;

  return (
    <main
      style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
      className="px-4 pb-24 sm:px-12 lg:px-24 xl:px-40"
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#756b62] transition hover:text-[#0054a8]"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
            Resources · {topic.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#171717] sm:text-5xl">
            {topic.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#68635d] sm:text-lg">{topic.description}</p>
        </motion.header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {topic.articles.map((article, index) => (
            <motion.article
              key={article.title}
              id={`article-${index + 1}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="scroll-mt-28 border border-[#ded8d0] bg-white/80 p-6 sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0054a8]">
                {topic.title} · Article {index + 1}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#201e1c]">
                {article.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[#68635d] sm:text-base">
                {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </motion.article>
          ))}
        </div>

        <Link
          to="/#contact-us"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0054a8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003f80]"
        >
          Talk with our team
          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
};

export default ResourceTopicPage;
