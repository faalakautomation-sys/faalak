import { motion } from "motion/react";
import { servicesData } from "../assets/assets";

const Services = () => (
  <section
    id="services"
    aria-labelledby="services-title"
    className="px-4 py-10 sm:px-12 sm:py-12 lg:px-16 xl:px-24"
  >
    <div className="mx-auto max-w-7xl border-x border-t border-[#ded8d0] bg-[#f5f3ef] px-5 pb-0 pt-8 sm:px-10 sm:pt-10 lg:px-12">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#0054a8]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
          Customer support voice agents
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <h2
          id="services-title"
          className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
        >
          More conversations handled. Less for your team to juggle.
        </h2>
        <p className="max-w-xl pb-1 text-sm leading-6 text-[#68635d] sm:text-base lg:justify-self-end">
          Voice, chat, and workflow automations capture leads, book appointments, and keep your customer support moving 24/7.
        </p>
      </div>

      <div className="mt-7 grid border-l border-t border-[#e2ddd6] sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="flex min-h-[190px] flex-col border-b border-r border-[#e2ddd6] px-5 py-5 sm:min-h-[200px] sm:px-6 sm:py-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b9b4ae] bg-[#f8f7f4] text-[#24211e]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#201e1c]">
                  {service.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-[1.55] text-[#687184]">
                {service.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-full border border-[#d8d3cb] px-2.5 py-1 text-[11px] font-medium text-[#55514b]"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
      <div className="border-b border-[#ded8d0]" />
    </div>
  </section>
);

export default Services;
