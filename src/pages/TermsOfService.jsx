import LegalPageLayout from "../components/LegalPageLayout";

const TermsOfService = () => (
  <LegalPageLayout
    title="Terms of Service"
    description="Read the terms that apply when using Faalak's AI receptionist, call answering, appointment booking, messaging, and chatbot services."
    canonicalUrl="https://www.faalak.com/terms"
  >
    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">About the services</h2>
      <p className="mt-2">
        Faalak is based in Mississauga and serves the Greater Toronto Area (GTA). We provide AI receptionist and call-answering services, appointment booking, WhatsApp and SMS notifications, and chatbots. These terms apply when you visit our website, make a booking, or use a Faalak service.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Using our services</h2>
      <p className="mt-2">
        You agree to provide accurate information, use the services lawfully, and not misuse or interfere with them. If you configure a service for your business, you are responsible for having the rights and permissions needed to provide caller information to the service and for giving any notices or obtaining any consents required for call recording, transcription, or messaging.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Appointments and cancellations</h2>
      <p className="mt-2">
        Appointment times are subject to availability and are not confirmed until the booking process confirms them. Please provide accurate booking details. To cancel or reschedule, contact Faalak as soon as possible at{" "}
        <a className="font-medium text-[#985236] hover:underline" href="mailto:info@faalak.com">info@faalak.com</a>
        {" "}or{" "}
        <a className="font-medium text-[#985236] hover:underline" href="tel:+14169104547">+1 (416) 910-4547</a>.
        Any service-specific cancellation or payment terms agreed with you also apply.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">No guarantees</h2>
      <p className="mt-2">
        We work to keep our services useful and available, but they may be interrupted, delayed, or produce inaccurate results. AI systems can misunderstand callers or messages. We do not guarantee uninterrupted availability, error-free operation, a particular business outcome, or that every call, lead, message, or appointment will be successfully handled. Do not rely on an automated service for emergencies or other situations requiring immediate human judgment.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Limitation of liability</h2>
      <p className="mt-2">
        To the extent permitted by applicable law, Faalak is not liable for indirect, incidental, special, or consequential loss, or for lost profits, revenue, business opportunities, data, or goodwill arising from use of the services. To the extent permitted by law, Faalak&apos;s total liability for a claim relating to a service will not exceed the amount you paid Faalak for that service in the three months before the event giving rise to the claim. Nothing in these terms limits liability where it cannot legally be limited.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Governing law</h2>
      <p className="mt-2">
        These terms are governed by the laws of Ontario, Canada, and applicable federal laws of Canada. Disputes are subject to the courts located in Ontario, unless applicable law requires otherwise.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Contact</h2>
      <p className="mt-2">
        Questions about these terms? Email{" "}
        <a className="font-medium text-[#985236] hover:underline" href="mailto:info@faalak.com">info@faalak.com</a>
        {" "}or call{" "}
        <a className="font-medium text-[#985236] hover:underline" href="tel:+14169104547">+1 (416) 910-4547</a>.
      </p>
    </section>
  </LegalPageLayout>
);

export default TermsOfService;
