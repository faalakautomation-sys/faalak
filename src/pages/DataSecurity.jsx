import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { FiArrowLeft } from "react-icons/fi";
import SecurityHighlights from "../components/SecurityHighlights";

const dataFlowRows = [
  {
    layer: "Telephony",
    provider: "Twilio",
    role: "Call routing, phone number provisioning, WhatsApp message delivery",
  },
  {
    layer: "Voice AI/SI",
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
      "Faalak's in-house CRM and lead database are hosted at InterServer's New Jersey data center (Jersey City - JC1). The service providers listed in the data-flow table may process data as part of delivering the system; no other processors are identified in the described pipeline.",
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
  {
    title: "7. Scope and regulated data",
    body: "SOC 2 Type II and ISO 27001 references on this page apply to the hosting provider's data-center infrastructure, not to an independent Faalak certification. Compliance obligations depend on the services, configuration, contracts, and data involved. If your use case involves health, financial, or other regulated information, contact Faalak before sharing that data so the applicable safeguards and provider terms can be reviewed.",
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
      className="px-4 pb-24 sm:px-12 lg:px-16 xl:px-24"
    >
      <Helmet>
        <title>Data Handling & Security Overview | Faalak AI/SI Automation</title>
        <meta
          name="description"
          content="How Faalak's AI/SI voice agent systems handle client and caller data - who builds and owns the system, where data is hosted, who has access, and compliance details."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Data Handling & Security Overview | Faalak AI/SI Automation" />
        <meta
          property="og:description"
          content="How Faalak's AI/SI voice agent systems handle client and caller data - system ownership, data flow, hosting, access, and compliance."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#756b62] transition hover:text-[#985236]"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-8">
          <SecurityHighlights
            title="Committed to security, privacy and responsible data handling."
            headingLevel="h1"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-12 max-w-6xl space-y-10"
      >
        <div className="grid gap-8 border-b border-[#ded8d0] pb-10 lg:grid-cols-[0.65fr_1.35fr]">
          {sections.map((section) => (
            <section key={section.title}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#985236]">About Faalak</p>
              <h2 className="mt-3 text-xl font-semibold text-[#24211e]">{section.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#68635d]">{section.body}</p>
            </section>
          ))}

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#985236]">How information moves</p>
            <h2 className="mt-3 text-xl font-semibold text-[#24211e]">2. Data Flow</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ddd6] bg-white shadow-[0_14px_30px_-24px_rgba(30,64,175,0.25)]">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#f3f0ec]">
                    <th className="px-4 py-3 font-semibold text-[#24211e]">Layer</th>
                    <th className="px-4 py-3 font-semibold text-[#24211e]">Provider</th>
                    <th className="px-4 py-3 font-semibold text-[#24211e]">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {dataFlowRows.map((row, index) => (
                    <tr key={row.layer} className={`border-t border-[#e9e4dd] ${index % 2 ? "bg-[#fbfaf8]" : "bg-white"}`}>
                      <td className="px-4 py-3 font-medium text-[#24211e]">{row.layer}</td>
                      <td className="px-4 py-3 text-[#514b45]">{row.provider}</td>
                      <td className="px-4 py-3 text-[#68635d]">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {laterSections.map((section) => (
            <section key={section.title} className="border-t border-[#ded8d0] pt-6">
              <h2 className="text-lg font-semibold text-[#24211e]">{section.title}</h2>
              {Array.isArray(section.body) ? (
                <div className="mt-2 space-y-3">
                  {section.body.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-6 text-[#68635d]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm leading-6 text-[#68635d]">{section.body}</p>
              )}
            </section>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center gap-4"
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
          className="rounded-full border border-[#d8d1c9] bg-white px-6 py-3 text-sm font-semibold text-[#514b45] shadow-sm transition hover:scale-105 hover:border-[#b9a99a]"
        >
          Contact Us
        </Link>
      </motion.div>

      <p className="mx-auto mt-16 max-w-6xl border-t border-[#ded8d0] pt-8 text-xs text-[#8b8076]">
        Faalak &middot; faalak.com &middot; Prepared for client review
      </p>
    </div>
  );
};

export default DataSecurity;
