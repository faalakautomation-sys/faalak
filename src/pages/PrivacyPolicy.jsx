import LegalPageLayout from "../components/LegalPageLayout";

const PrivacyPolicy = () => (
  <LegalPageLayout
    title="Privacy Policy"
    description="Learn how Faalak collects, uses, and protects information when providing AI receptionist, appointment booking, notifications, and chatbot services."
    canonicalUrl="https://www.faalak.com/privacy"
  >
    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">About this policy</h2>
      <p className="mt-2">
        Faalak is based in Mississauga and serves the Greater Toronto Area (GTA). We provide AI receptionist and call-answering services, appointment booking, WhatsApp and SMS notifications, and chatbots. This policy explains what information we handle and how we use it when you contact us or interact with these services.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Information we collect</h2>
      <p className="mt-2">Depending on how you use our services, we may handle:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Your name, phone number, and email address.</li>
        <li>Call recordings and transcripts, where call recording or transcription is enabled.</li>
        <li>Appointment details, such as requested dates and times, contact details, and notes you provide.</li>
        <li>Messages and information you choose to provide through a chatbot or follow-up conversation.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">How we use information</h2>
      <p className="mt-2">
        We use information to answer and route calls, respond to questions, qualify inquiries, book and manage appointments, and send requested service notifications. We send follow-up messages by WhatsApp or SMS only where appropriate consent has been provided. You can opt out of text follow-ups by replying STOP; you can also contact us to request that we stop other follow-up communications.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Google Calendar</h2>
      <p className="mt-2">
        Faalak uses Google Calendar access only to create and manage appointment bookings on Faalak&apos;s own calendar. Google user data is not sold or shared. We do not use Google user data for advertising, and our use of Google API data complies with the Google API Services User Data Policy, including its Limited Use requirements.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Service providers</h2>
      <p className="mt-2">
        We may use third-party providers for hosting, communications, calendar scheduling, and AI-powered call or chatbot features. These providers process information as needed to provide or support the services. We do not sell personal information.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Retention and security</h2>
      <p className="mt-2">
        We keep information only for as long as it is reasonably needed to provide and support the service, meet business or legal requirements, and resolve disputes. Retention periods may differ by information type and service configuration. When information is no longer needed, we take reasonable steps to delete or de-identify it. We use reasonable safeguards to protect information, but no online service can guarantee absolute security.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Your choices and requests</h2>
      <p className="mt-2">
        You may ask to access or correct personal information we hold about you, request its deletion, or withdraw consent where applicable. Some information may need to be retained to complete a booking, meet legal obligations, or resolve a dispute. Contact us using the details below, and we will review and respond to your request.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#24211e]">Contact</h2>
      <p className="mt-2">
        For privacy questions or requests, email{" "}
        <a className="font-medium text-[#985236] hover:underline" href="mailto:info@faalak.com">info@faalak.com</a>
        {" "}or call{" "}
        <a className="font-medium text-[#985236] hover:underline" href="tel:+14169104547">+1 (416) 910-4547</a>.
      </p>
    </section>
  </LegalPageLayout>
);

export default PrivacyPolicy;
