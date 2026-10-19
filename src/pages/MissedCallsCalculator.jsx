import { useMemo, useState } from "react";
import { motion } from "motion/react";

const industries = [
  { name: "Physio Therapist", averageRevenue: 350 },
  { name: "HVAC", averageRevenue: 450 },
  { name: "Cannabis", averageRevenue: 100 },
  { name: "Restaurant", averageRevenue: 120 },
];

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const RangeControl = ({ id, label, value, min, max, step, displayValue, onChange }) => (
  <div className="faalak-calculator-control">
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <label htmlFor={id} className="text-sm leading-6 text-[#606a7a] sm:text-base">
        {label}
      </label>
      <output htmlFor={id} className="shrink-0 text-sm font-semibold tabular-nums text-[#24211e] sm:text-base">
        {displayValue}
      </output>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{ "--range-progress": `${((value - min) / (max - min)) * 100}%` }}
      className="faalak-calculator-range w-full"
    />
    <div className="mt-1 flex justify-between text-[11px] text-[#938a81]" aria-hidden="true">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

const MissedCallsCalculator = () => {
  const [industry, setIndustry] = useState(industries[0]);
  const [missedCalls, setMissedCalls] = useState(80);
  const [conversionRate, setConversionRate] = useState(22);
  const [averageRevenue, setAverageRevenue] = useState(350);

  const estimate = useMemo(() => {
    const bookingsLost = Math.round(missedCalls * (conversionRate / 100));
    const monthlyRevenueLost = bookingsLost * averageRevenue;

    return {
      bookingsLost,
      monthlyRevenueLost,
      yearlyRevenueLost: monthlyRevenueLost * 12,
      revenuePerConversionPoint: Math.round(missedCalls * 0.01 * averageRevenue),
    };
  }, [averageRevenue, conversionRate, missedCalls]);

  const handleIndustrySelect = (selectedIndustry) => {
    setIndustry(selectedIndustry);
    setAverageRevenue(selectedIndustry.averageRevenue);
  };

  const handleEmailBreakdown = () => {
    const subject = encodeURIComponent("My missed-call revenue estimate");
    const body = encodeURIComponent(
      [
        "Here is my illustrative missed-call estimate:",
        `Industry: ${industry.name}`,
        `Missed calls per month: ${missedCalls}`,
        `Estimated conversion rate: ${conversionRate}%`,
        `Average revenue per booking: ${currency.format(averageRevenue)}`,
        `Estimated bookings missed per month: ${estimate.bookingsLost}`,
        `Estimated revenue missed per month: ${currency.format(estimate.monthlyRevenueLost)}`,
        `Estimated revenue missed per year: ${currency.format(estimate.yearlyRevenueLost)}`,
        "",
        "This is an estimate, not a guarantee of results.",
      ].join("\n")
    );

    window.location.href = `mailto:info@faalak.com?subject=${subject}&body=${body}`;
  };

  const handleBookDemo = () => {
    window.dispatchEvent(new Event("open-retell-widget"));
  };

  return (
    <section
      id="missed-call-calculator"
      aria-labelledby="missed-calls-heading"
      className="faalak-calculator-page scroll-mt-24 px-4 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="border border-[#ded8d0] bg-[#f5f3ef] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
        >
          <h1
            id="missed-calls-heading"
            className="font-display max-w-2xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
          >
            What are missed calls costing you?
          </h1>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  Industry
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industries.map((item) => {
                    const isSelected = industry.name === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleIndustrySelect(item)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          isSelected
                            ? "border-sky-500 bg-sky-500 text-white"
                            : "border-[#ddd6ce] bg-white text-[#39342f] hover:border-emerald-400"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 space-y-6">
                <RangeControl
                  id="missed-calls-range"
                  label="Missed calls each month"
                  value={missedCalls}
                  min={0}
                  max={500}
                  step={5}
                  displayValue={missedCalls}
                  onChange={setMissedCalls}
                />
                <RangeControl
                  id="conversion-rate-range"
                  label="% of missed calls that may have turned into customers"
                  value={conversionRate}
                  min={1}
                  max={100}
                  step={1}
                  displayValue={`${conversionRate}%`}
                  onChange={setConversionRate}
                />
                <RangeControl
                  id="average-revenue-range"
                  label="Average revenue per booking"
                  value={averageRevenue}
                  min={0}
                  max={1500}
                  step={25}
                  displayValue={currency.format(averageRevenue)}
                  onChange={setAverageRevenue}
                />
              </div>
            </div>

            <div className="border-t border-[#e2ddd6] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-sm text-[#606a7a]">Estimated revenue missed each month</p>
              <motion.p
                key={estimate.monthlyRevenueLost}
                initial={{ opacity: 0.55, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                aria-live="polite"
                className="mt-2 font-display text-5xl font-semibold tracking-[-0.055em] text-[#171717] sm:text-6xl lg:text-7xl"
              >
                {currency.format(estimate.monthlyRevenueLost)}
              </motion.p>
              <span className="mt-3 block h-[2px] w-16 bg-emerald-500" />
              <p className="mt-5 max-w-md text-sm leading-6 text-[#606a7a] sm:text-base">
                About {estimate.bookingsLost} bookings from {missedCalls} missed calls, at{" "}
                {currency.format(averageRevenue)} each.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#e2ddd6] py-5">
                <div>
                  <p className="text-lg font-semibold tabular-nums text-[#24211e] sm:text-xl">
                    {currency.format(estimate.yearlyRevenueLost)}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#82786f]">estimated per year</p>
                </div>
                <div>
                  <p className="text-lg font-semibold tabular-nums text-[#24211e] sm:text-xl">
                    {estimate.bookingsLost}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#82786f]">bookings / month</p>
                </div>
                <div>
                  <p className="text-lg font-semibold tabular-nums text-[#24211e] sm:text-xl">
                    {missedCalls}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#82786f]">calls not answered</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#606a7a]">
                Each additional conversion point represents about{" "}
                <span className="font-semibold text-[#24211e]">
                  {currency.format(estimate.revenuePerConversionPoint)} / month
                </span>
                .
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
                >
                  Book a demo
                </button>
                <button
                  type="button"
                  onClick={handleEmailBreakdown}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#d8d1c9] bg-white px-6 py-3 text-sm font-semibold text-[#24211e] transition hover:-translate-y-0.5 hover:border-[#b9a99a] hover:bg-[#fbfaf8]"
                >
                  Email me the breakdown
                </button>
              </div>
            </div>
          </div>

          <p className="mt-9 text-xs leading-5 text-[#82786f]">
            Estimates are illustrative only and use rounded booking counts. Actual results vary by business, call handling, and deployment.
          </p>
        </motion.section>
      </div>
    </section>
  );
};

export default MissedCallsCalculator;
