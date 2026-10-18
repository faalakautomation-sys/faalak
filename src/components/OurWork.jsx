import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import notificationWorkflow from "../assets/faalak-notification-workflow.svg";
import receptionistImage from "../assets/category/cat-ai-receptionist.png";
import propertyImage from "../assets/category/cat-real-estate.jpg";
import businessTeamImage from "../assets/category/cat-medium-to-big-business.png";
import Title from "./Title";

const featuredCapabilities = [
  { icon: FiPhoneCall, label: "Calls answered around the clock" },
  { icon: FiCalendar, label: "Appointment requests captured" },
  { icon: FiMessageCircle, label: "Lead details sent to your team" },
];

const industryCards = [
  {
    name: "Canadian real estate teams",
    emphasis: "Be ready for the next inquiry.",
    description: "Capture buyer and seller calls, even when agents are out showing homes.",
    image: propertyImage,
    imageAlt: "A real estate professional reviewing a model home",
    href: "/work/real-estate-agency",
  },
  {
    name: "Canadian professional teams",
    emphasis: "Keep conversations moving.",
    description: "Collect new requests and appointment details while your team is with a client.",
    image: businessTeamImage,
    imageAlt: "Two professionals discussing a project at a table",
    href: "/work/massage-therapy-studio",
  },
];

const OurWork = () => (
  <>
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="our-work"
      className="relative flex flex-col items-center gap-7 px-4 pt-24 text-gray-800 sm:px-12 lg:px-16"
    >
      <Title
        title="Built for the businesses Canada calls"
        desc="From the first hello to the next booked appointment, Faalak helps Canadian teams stay responsive without adding more to their plate."
      />

      <div className="faalak-work-grid w-full max-w-[1340px]">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="faalak-work-featured group relative isolate flex flex-col overflow-hidden rounded-2xl bg-[#14202b] p-6 text-white sm:p-9"
        >
          <img
            src={receptionistImage}
            alt="A customer reviewing an appointment notification from an AI voice agent"
            className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold tracking-wide">Canadian clinics &amp; service teams</p>
            <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              Made for Canada
            </span>
          </div>

          <div className="mt-auto max-w-3xl pb-8 pt-24 sm:pb-10">
            <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Every call gets a helpful first response.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              Faalak voice agents answer customer questions, capture what callers need, and help move appointment requests forward—even when your team is busy.
            </p>

            <ul className="mt-7 grid gap-4 border-t border-white/35 pt-5 sm:grid-cols-3 sm:gap-5">
              {featuredCapabilities.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm leading-5 text-white/90">
                  <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#9fc8ed]" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/work/dental-clinic"
            className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Explore Faalak's approach for dental clinics"
          />
          <span className="pointer-events-none absolute bottom-7 right-7 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#14202b] sm:bottom-9 sm:right-9">
            <FiArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </span>
        </motion.article>

        <div className="faalak-work-sidecards">
          {industryCards.map((card, index) => (
            <motion.article
              key={card.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="faalak-work-card group relative isolate flex flex-col overflow-hidden rounded-2xl bg-[#14202b] p-6 text-white"
            >
              <img
                src={card.image}
                alt={card.imageAlt}
                className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/15 to-black/80" />

              <p className="text-sm font-semibold tracking-wide">{card.name}</p>
              <div className="mt-auto max-w-sm pt-20">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {card.emphasis}
                </h3>
                <p className="mt-2 text-sm leading-5 text-white/85">{card.description}</p>
              </div>
              <Link
                to={card.href}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Explore Faalak for ${card.name.toLowerCase()}`}
              />
              <span className="pointer-events-none absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#14202b]">
                <FiArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      aria-labelledby="notification-workflow-title"
      className="px-4 pb-16 pt-8 sm:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-5xl border border-[#ded8d0] bg-[#f8f7f4] p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0054a8]">
              From call to follow-up
            </p>
            <h2
              id="notification-workflow-title"
              className="mt-1 text-xl font-semibold tracking-tight text-[#201e1c] sm:text-2xl"
            >
              See how Faalak keeps your team in the loop.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-5 text-[#68635d]">
            Calls, lead alerts, and appointment updates—connected in one simple workflow.
          </p>
        </div>
        <img
          src={notificationWorkflow}
          alt="Faalak workflow showing a customer call answered, a new lead sent to the business owner's WhatsApp, and an appointment confirmed"
          className="mx-auto block h-auto w-full rounded-xl border border-[#e2ddd6] bg-white"
          loading="lazy"
        />
      </div>
    </motion.section>
  </>
);

export default OurWork;
