import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FaCouch, FaSpa } from "react-icons/fa";
import { FiArrowUpRight, FiHome, FiWind } from "react-icons/fi";
import { GTA_INDUSTRIES } from "../data/industries";

const INDUSTRY_DETAILS = {
  "massage-and-spa": {
    icon: FaSpa,
    description: "Capture appointment requests and answer treatment questions while your team is with a client.",
    tone: "bg-[#f3e8ee] text-[#88536f]",
  },
  "furniture-store": {
    icon: FaCouch,
    description: "Answer product questions, check what shoppers need, and arrange showroom visits.",
    tone: "bg-[#f1eadf] text-[#806648]",
  },
  hvac: {
    icon: FiWind,
    description: "Capture urgent repair details and help customers request a service appointment.",
    tone: "bg-[#e2eff2] text-[#3d7785]",
  },
  "real-estate": {
    icon: FiHome,
    description: "Respond to property inquiries and capture buyer, seller, and viewing requests.",
    tone: "bg-[#e9e9f4] text-[#5b5f91]",
  },
  landscaping: {
    icon: FiWind,
    description: "Collect project details and arrange estimate requests while you are on a job.",
    tone: "bg-[#e8efe5] text-[#52734b]",
  },
};

const OurWork = () => (
  <section id="industries" aria-labelledby="industries-heading" className="px-4 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#985236]">Who it&apos;s for</p>
        <h2 id="industries-heading" className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
          Built for busy GTA businesses
        </h2>
        <p className="mt-4 text-base leading-7 text-[#68635d]">
          Keep customer conversations moving, even while you are focused on the work.
        </p>
      </div>
      {/* TODO: Replace these neutral illustrations with real local photos. */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GTA_INDUSTRIES.map((industry, index) => {
          const { icon: Icon, description, tone } = INDUSTRY_DETAILS[industry.slug];
          return (
            <motion.article
              key={industry.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e0da] bg-white p-5 shadow-[0_8px_24px_rgba(43,36,30,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(43,36,30,0.09)]"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}>
                <Icon aria-hidden="true" className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#201e1c]">{industry.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#68635d]">{description}</p>
              <Link
                to={`/industries/${industry.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0054a8] outline-offset-4"
                aria-label={`Learn about Faalak for ${industry.name}`}
              >
                Explore industry <FiArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default OurWork;
