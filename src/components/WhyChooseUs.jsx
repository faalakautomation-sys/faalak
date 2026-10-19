import { whyChooseUsData } from "../assets/assets";
import { motion } from "motion/react";

const WhyChooseUs = () => (
  <section
    id="about"
    aria-labelledby="why-faalak-title"
    className="px-4 py-10 sm:px-12 sm:py-12 lg:px-16 xl:px-24"
  >
    <div className="mx-auto max-w-7xl border-x border-t border-[#ded8d0] bg-[#f5f3ef] px-5 pb-0 pt-8 sm:px-10 sm:pt-10 lg:px-12">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#0054a8]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
          Why Faalak
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <h2
          id="why-faalak-title"
          className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
        >
          Why businesses trust Faalak.
        </h2>
        <p className="max-w-xl pb-1 text-sm leading-6 text-[#68635d] sm:text-base lg:justify-self-end">
          We are a Canada-based AI/SI automation company helping businesses answer customers, capture leads, and keep support moving—day and night.
        </p>
      </div>

      <div className="mt-7 grid border-l border-t border-[#e2ddd6] sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="flex min-h-[190px] flex-col items-center border-b border-r border-[#e2ddd6] px-5 py-6 text-center sm:min-h-[200px] sm:px-7"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${item.iconColorClass}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-[#201e1c]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-[1.55] text-[#687184]">
                {item.description}
              </p>
            </motion.article>
          );
        })}
      </div>
      <div className="border-b border-[#ded8d0]" />
    </div>
  </section>
);

export default WhyChooseUs;
