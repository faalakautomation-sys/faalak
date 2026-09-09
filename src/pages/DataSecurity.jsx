import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { FiArrowLeft, FiShield } from "react-icons/fi";

const dataFlowRows = [
  {
    layer: "Telephony",
    provider: "Twilio",
    role: "Call routing, phone number provisioning, WhatsApp message delivery",
  },
  {
    layer: "Voice AI",
    provider: "Retell AI",
    role: "Speech-to-text / text-to-speech, conversation handling, call recording and transcript storage",
  },
  {
    layer: "Language model",
    provider: "OpenAI",
    role: "Conversation understanding and response generation",
  },
  {
    layer: "CRM & automation",
    provider: "Faalak (in-house)",
    role: "Lead storage, business logic, and dashboard - fully built and controlled by Faalak",
  },
];

const sections = [
  {
    title: "1. Who Builds and Owns the System",
    body: "Faalak's automation, CRM, and integration layer is built and owned in-house - it is not a resold or white-labeled product. Faalak is a registered business, and incorporation documents and GST registration are available on request.",
  },
];

const laterSections = [
  {
    title: "3. Where Data Is Hosted",
    body: [
      "Twilio, Retell AI, and OpenAI each host their portion of the pipeline on their own managed cloud infrastructure in the United States, and each maintains its own published security and compliance program.",
      "Faalak maintains its own secure data center infrastructure in New Jersey, United States (InterServer, Jersey City - JC1), where our in-house CRM and lead database are hosted. This infrastructure is fully controlled and secured by Faalak - no client data is shared with or processed by any other party beyond what's listed above.",
      "InterServer's New Jersey data center facilities hold SOC 2 Type II and ISO 27001 certifications for their physical infrastructure. Faalak maintains its own operational security practices - including access control, encrypted connections, and regular backups - at the server and application level.",
    ],
  },
  {
    title: "4. Who Has Access",
    body: "Faalak's founder has full administrative access to the CRM and hosting infrastructure. Faalak's developer has access limited to code and configuration needed to build and maintain the system, under a signed confidentiality agreement. No data is sold, shared, or used outside delivering the client's service.",
  },
  {
    title: "5. Compliance",
    body: "Twilio, OpenAI, and Retell AI each publish their own security and compliance documentation (including SOC 2 reporting) - available on request. Faalak can provide a signed NDA and/or Data Processing Agreement (DPA) prior to onboarding.",
  },
  {
    title: "6. Questions",
    body: "Faalak is happy to provide any of the above in writing, along with proof of business registration or a signed NDA/DPA, on request.",
  },
];

const DataSecurity = () => {
  const canonicalUrl = "https://faalak.com/data-security";

  const handleRequestDocs = () => {
    const message = encodeURIComponent(
      "Hi, I'd like to request Faalak's data handling documentation, proof of business registration, and/or a signed NDA/DPA."
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
      className="px-4 pb-24 sm:px-12 lg:px-24 xl:px-40"
    >
      <Helmet>
        <title>Data Handling & Security Overview | Faalak AI Automation</title>
        <meta
          name="description"
          content="How Faalak's AI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Data Handling & Security Overview | Faalak AI Automation" />
        <meta
          property="og:description"
          content="How Faalak's AI voice agent systems handle client and caller data - system ownership, data flow, hosting, access, and compliance."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary dark:text-gray-400"
      >
        <FiArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 max-w-3xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 text-primary dark:from-blue-500/20 dark:to-cyan-400/20">
            <FiShield className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">FAALAK</p>
            <h1 className="font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              Data Handling & Security Overview
            </h1>
          </div>
        </div>
        <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">
          This document explains how client and caller data is handled within Faalak&apos;s AI voice agent systems.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 max-w-3xl space-y-8"
      >
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{section.body}</p>
          </div>
        ))}

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. Data Flow</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-200 shadow-[0_14px_30px_-24px_rgba(30,64,175,0.25)] dark:border-gray-700">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-blue-50/70 dark:bg-blue-500/10">
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Layer</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Provider</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Role</th>
                </tr>
              </thead>
              <tbody>
                {dataFlowRows.map((row, index) => (
                  <tr
                    key={row.layer}
                    className={`border-t border-gray-200 dark:border-gray-700 ${
                      index % 2 === 1 ? "bg-white/60 dark:bg-gray-900/40" : "bg-white/90 dark:bg-gray-900/90"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.layer}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.provider}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {laterSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            {Array.isArray(section.body) ? (
              <div className="mt-2 space-y-3">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{section.body}</p>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={handleRequestDocs}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
        >
          Request Documentation
        </button>
        <Link
          to="/#contact-us"
          className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105 dark:border-gray-600 dark:bg-white/5 dark:text-white"
        >
          Contact Us
        </Link>
      </motion.div>

      <p className="mt-16 max-w-3xl border-t border-gray-200 pt-8 text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
        Faalak &middot; faalak.com &middot; Prepared for client review
      </p>
    </div>
  );
};

export default DataSecurity;
