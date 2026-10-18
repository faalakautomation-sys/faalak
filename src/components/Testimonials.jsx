import { motion } from "motion/react";
import { FiStar } from "react-icons/fi";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => (
  <section
    id="testimonials"
    aria-labelledby="testimonials-title"
    className="px-4 py-10 sm:px-12 sm:py-12 lg:px-16 xl:px-24"
  >
    <div className="mx-auto max-w-7xl border-x border-t border-[#ded8d0] bg-[#f5f3ef] px-5 pb-0 pt-8 sm:px-10 sm:pt-10 lg:px-12">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#0054a8]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
          Client stories
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <h2
          id="testimonials-title"
          className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
        >
          What Our Clients Say
        </h2>
        <p className="max-w-xl pb-1 text-sm leading-6 text-[#68635d] sm:text-base lg:justify-self-end">
          Real businesses share how Faalak voice agents and automation support their customers and teams.
        </p>
      </div>

      <div className="mt-7 grid border-l border-t border-[#e2ddd6] sm:grid-cols-2">
        {testimonialsData.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            viewport={{ once: true }}
            className="flex min-h-[230px] flex-col border-b border-r border-[#e2ddd6] px-5 py-5 sm:min-h-[245px] sm:px-7 sm:py-6"
          >
            <div
              className="flex items-center gap-1 text-[#0054a8]"
              aria-label={`${item.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <FiStar
                  key={starIndex}
                  aria-hidden="true"
                  className={`h-4 w-4 ${starIndex < item.rating ? "fill-current" : "text-[#c9c4bc]"}`}
                />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-6 text-[#4e4a45]">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            {item.detail && (
              <p className="mt-2 border-t border-[#e2ddd6] pt-2 text-xs leading-5 text-[#77716a]">
                {item.detail}
              </p>
            )}
            <div className="mt-auto flex items-center gap-3 pt-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b9b4ae] bg-[#f8f7f4] text-sm font-semibold text-[#24211e]">
                {item.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#201e1c]">{item.name}</p>
                <p className="text-xs text-[#687184]">{item.role}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="border-b border-[#ded8d0]" />
    </div>
  </section>
);

export default Testimonials;
