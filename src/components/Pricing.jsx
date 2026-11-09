import { Link } from "react-router-dom";

const Pricing = () => (
  <section
    id="pricing"
    aria-labelledby="pricing-title"
    className="scroll-mt-24 px-4 py-10 sm:px-12 sm:py-12 lg:px-16 xl:px-24"
  >
    <div className="mx-auto grid max-w-7xl gap-8 border border-[#ded8d0] bg-[#f5f3ef] p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-12">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#0054a8]" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
            Pricing
          </p>
        </div>
        <h2
          id="pricing-title"
          className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
        >
          A plan tailored to your business.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#68635d] sm:text-base">
          Pricing depends on your call volume and use case. Talk with our team to find the right plan for your business.
        </p>
      </div>

      <div className="border border-[#ded8d0] bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold text-[#171717]">Get a custom plan</p>
        <p className="mt-2 text-sm leading-6 text-[#68635d]">
          Tell us what your business needs, and we’ll walk you through the options and pricing.
        </p>
        <Link
          to="/#contact-us"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0054a8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003f80]"
        >
          Book a free consultation
        </Link>
      </div>
    </div>
  </section>
);

export default Pricing;
