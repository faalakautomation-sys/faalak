import { Link } from "react-router-dom";
import {
  FiDatabase,
  FiFileText,
  FiGlobe,
  FiLock,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const securityHighlights = [
  {
    title: "SOC 2 Type II",
    icon: FiShield,
    iconColorClass: "border-blue-200 bg-blue-50 text-blue-800",
    description:
      "Our New Jersey data-center provider reports SOC 2 Type II controls for its facility infrastructure. This is a provider certification, not a Faalak certification.",
  },
  {
    title: "ISO 27001",
    icon: FiLock,
    iconColorClass: "border-green-200 bg-green-50 text-green-800",
    description:
      "The hosting facility provider also reports ISO 27001 certification for its infrastructure. Ask us for provider documentation and scope details.",
  },
  {
    title: "Controlled access",
    icon: FiUsers,
    iconColorClass: "border-indigo-200 bg-indigo-50 text-indigo-800",
    description:
      "Administrative access is limited to designated team members. Developer access is restricted to the code and configuration needed for maintenance.",
  },
  {
    title: "Encrypted connections",
    icon: FiGlobe,
    iconColorClass: "border-teal-200 bg-teal-50 text-teal-800",
    description:
      "Encrypted connections are part of Faalak's operational security practices for protecting data in transit between systems.",
  },
  {
    title: "Regular backups",
    icon: FiDatabase,
    iconColorClass: "border-orange-200 bg-orange-50 text-orange-800",
    description:
      "Regular backups support the in-house CRM and lead database. Specific retention and recovery requirements should be agreed before onboarding.",
  },
  {
    title: "Privacy documentation",
    icon: FiFileText,
    iconColorClass: "border-violet-200 bg-violet-50 text-violet-800",
    description:
      "Request a Data Processing Agreement, NDA, business registration details, and available provider security documentation before onboarding.",
  },
];

const SecurityHighlights = ({
  eyebrow = "Security",
  title = "Committed to security, privacy and responsible data handling.",
  description = "A clear overview of how Faalak's AI/SI systems handle client and caller data, where safeguards apply, and what documentation is available.",
  detailsLink = false,
  headingLevel = "h2",
}) => {
  const Heading = headingLevel;

  return (
    <section aria-labelledby="security-highlights-title" className="px-4 py-14 sm:px-12 sm:py-18 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl border-x border-t border-[#ded8d0] bg-[#f5f3ef] px-5 pb-0 pt-8 sm:px-10 sm:pt-10 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#985236]" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#985236]">{eyebrow}</p>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <Heading
            id="security-highlights-title"
            className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
          >
            {title}
          </Heading>
          <p className="max-w-xl pb-1 text-sm leading-6 text-[#68635d] sm:text-base lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-9 grid border-l border-t border-[#e2ddd6] sm:grid-cols-2 lg:grid-cols-3">
          {securityHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex min-h-[220px] flex-col items-center border-b border-r border-[#e2ddd6] px-5 py-7 text-center sm:min-h-[230px] sm:px-7 sm:py-8"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full border ${item.iconColorClass}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em] text-[#201e1c]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-[1.55] text-[#687184]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {detailsLink && (
          <div className="flex justify-center border-b border-[#ded8d0] py-7">
            <Link
              to="/data-security"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,84,168,0.18)] transition hover:-translate-y-0.5 hover:bg-[#004987]"
            >
              Explore security details
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecurityHighlights;
