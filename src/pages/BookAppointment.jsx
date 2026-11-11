import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";
import { API_BASE_URL } from "../api/config";

const TIME_ZONE = "America/Toronto";
const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const labelFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "UTC",
  weekday: "long",
  month: "long",
  day: "numeric",
});
const getTorontoToday = () => {
  const parts = dateFormatter.formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
};

const getBookableDates = (today, numberOfDays = 60) => {
  const [year, month, day] = today.split("-").map(Number);
  const baseDate = new Date(Date.UTC(year, month - 1, day));
  const dates = [];

  for (let offset = 0; offset < numberOfDays; offset += 1) {
    const date = new Date(baseDate);
    date.setUTCDate(baseDate.getUTCDate() + offset);
    if (date.getUTCDay() === 0) continue;

    const value = date.toISOString().slice(0, 10);
    dates.push({
      value,
      label: labelFormatter.format(date),
    });
  }
  return dates;
};

const BookAppointment = () => {
  const availableDates = useMemo(() => getBookableDates(getTorontoToday()), []);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.value || "");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", note: "" });

  useEffect(() => {
    if (!selectedDate) return undefined;
    const controller = new AbortController();
    setLoadingSlots(true);
    setAvailabilityError("");
    setSelectedSlot("");
    setConfirmation(null);

    fetch(`${API_BASE_URL}/appointments/availability?date=${encodeURIComponent(selectedDate)}`, {
      signal: controller.signal,
      headers: API_BASE_URL.includes("ngrok") ? { "ngrok-skip-browser-warning": "true" } : {},
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || "Could not load appointment times.");
        setSlots(result.slots || []);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setSlots([]);
        setAvailabilityError(error.message || "Could not load appointment times.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingSlots(false);
      });

    return () => controller.abort();
  }, [selectedDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const selectedDateLabel = availableDates.find((date) => date.value === selectedDate)?.label || selectedDate;
  const selectedTimeLabel = slots.find((slot) => slot.start === selectedSlot)?.label || "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSlot) {
      toast.error("Choose an available appointment time.");
      return;
    }

    setBooking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(API_BASE_URL.includes("ngrok") ? { "ngrok-skip-browser-warning": "true" } : {}),
        },
        body: JSON.stringify({ ...formData, start: selectedSlot }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to book your appointment.");

      setConfirmation(result);
      setSlots((current) => current.filter((slot) => slot.start !== selectedSlot));
      setSelectedSlot("");
      setFormData({ name: "", email: "", phoneNumber: "", note: "" });
      if (!result.ownerNotificationSent) {
        toast.error("Your appointment is booked, but the team notification email could not be sent.");
      } else {
        toast.success("Your appointment is confirmed.");
      }
    } catch (error) {
      toast.error(error.message || "Unable to book your appointment.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <main
      style={{ paddingTop: "calc(var(--navbar-h) + 2rem)" }}
      className="min-h-[65vh] px-4 pb-20 sm:px-8 lg:px-16"
    >
      <Helmet>
        <title>Book an Appointment | Faalak</title>
        <meta name="description" content="Choose a time to book a 15-minute consultation with Faalak. Available Monday through Saturday in Toronto time." />
        <link rel="canonical" href="https://www.faalak.com/book-appointment" />
      </Helmet>

      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0054a8]">Book an appointment</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
            Let&apos;s talk about your business.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68635d] sm:text-base">
            Choose a time for a free 15-minute consultation. Appointments are available Monday through Saturday, 9:00 AM to 12:00 AM midnight, Toronto time.
          </p>
        </div>

        {confirmation ? (
          <section aria-live="polite" className="border border-emerald-200 bg-white p-6 sm:p-8">
            <FiCheckCircle className="h-9 w-9 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-[#171717]">Your appointment is booked.</h2>
            <p className="mt-2 text-sm leading-6 text-[#68635d]">
              We&apos;ll meet on {confirmation.date} at {confirmation.time} Toronto time.
            </p>
            {confirmation.visitorConfirmationSent && (
              <p className="mt-2 text-sm text-[#68635d]">A confirmation email was sent to your email address.</p>
            )}
            {!confirmation.ownerNotificationSent && (
              <p className="mt-3 text-sm text-amber-700">
                Your booking is saved, but we couldn&apos;t send the team notification. Please contact info@faalak.com to make sure we see it.
              </p>
            )}
            {!confirmation.visitorConfirmationSent && (
              <p className="mt-2 text-sm text-amber-700">
                Your booking is saved, but the confirmation email could not be sent. Please save the appointment details above.
              </p>
            )}
            <button type="button" onClick={() => setConfirmation(null)} className="mt-6 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#24211e] hover:bg-gray-50">
              Book another appointment
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8 border border-[#ded8d0] bg-white/90 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section>
              <label htmlFor="appointment-date" className="flex items-center gap-2 text-sm font-semibold text-[#24211e]">
                <FiCalendar className="h-4 w-4 text-[#0054a8]" aria-hidden="true" />
                Select a date
              </label>
              <select
                id="appointment-date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary"
              >
                {availableDates.map((date) => (
                  <option key={date.value} value={date.value}>{date.label}</option>
                ))}
              </select>

              <h2 className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#24211e]">
                <FiClock className="h-4 w-4 text-[#0054a8]" aria-hidden="true" />
                Available times
              </h2>
              {loadingSlots ? (
                <p className="mt-3 text-sm text-[#77716a]">Checking calendar availability…</p>
              ) : availabilityError ? (
                <p role="alert" className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-5 text-amber-800">{availabilityError}</p>
              ) : slots.length ? (
                <div className="mt-3 grid max-h-80 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
                  {slots.map((slot) => {
                    const selected = selectedSlot === slot.start;
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedSlot(slot.start)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${selected ? "border-[#0054a8] bg-blue-50 text-[#0054a8]" : "border-gray-200 text-[#39342f] hover:border-blue-300"}`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 rounded-xl bg-[#f5f3ef] p-3 text-sm text-[#68635d]">
                  No available times on {selectedDateLabel}. Please choose another date.
                </p>
              )}
              <p className="mt-3 text-xs leading-5 text-[#82786f]">All times are shown in Toronto time (America/Toronto).</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-[#24211e]">Your details</h2>
              {selectedSlot && (
                <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-[#0054a8]">
                  {selectedDateLabel} · {selectedTimeLabel} · 15 minutes
                </p>
              )}
              <div className="mt-4 grid gap-3">
                <label className="sr-only" htmlFor="booking-name">Name</label>
                <input id="booking-name" name="name" value={formData.name} onChange={handleChange} required maxLength={100} autoComplete="name" placeholder="Name" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                <label className="sr-only" htmlFor="booking-email">Email</label>
                <input id="booking-email" name="email" type="email" value={formData.email} onChange={handleChange} required maxLength={254} autoComplete="email" placeholder="Email" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                <label className="sr-only" htmlFor="booking-phone">Phone number (optional)</label>
                <input id="booking-phone" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} maxLength={40} autoComplete="tel" placeholder="Phone number (optional)" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                <label className="sr-only" htmlFor="booking-note">What would you like to discuss?</label>
                <textarea id="booking-note" name="note" value={formData.note} onChange={handleChange} required maxLength={2000} rows="4" placeholder="What would you like to discuss?" className="resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
                <button type="submit" disabled={!selectedSlot || loadingSlots || booking || Boolean(availabilityError)} className="mt-1 inline-flex items-center justify-center rounded-xl bg-[#0054a8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004987] disabled:cursor-not-allowed disabled:opacity-50">
                  {booking ? "Booking…" : "Book appointment"}
                </button>
              </div>
            </section>
          </form>
        )}
      </div>
    </main>
  );
};

export default BookAppointment;
