const Pricing = () => (
  <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-24 bg-[#090b0e] px-4 py-14 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9ae80]">Pricing</p>
        <h2 id="pricing-heading" className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple monthly plans.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-white/70">
          Book a free consultation for a quote.
        </p>
        {/* TODO: Add confirmed monthly plan pricing. */}
      </div>
      <a
        href="#contact-us"
        className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#0054a8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1269bd]"
      >
        Book a free consultation
      </a>
    </div>
  </section>
);

export default Pricing;
