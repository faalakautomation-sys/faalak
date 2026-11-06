import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import OurWork from "../components/OurWork";
import MissedCallsCalculator from "./MissedCallsCalculator";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

const Home = () => (
  <>
    <Helmet>
      <title>AI Receptionist for GTA Businesses | Faalak</title>
      <meta name="description" content="Faalak's AI receptionist answers every call 24/7, books appointments and sends you the details on WhatsApp. Based in Mississauga, serving the GTA." />
      <meta name="keywords" content="AI receptionist, AI voice agent, AI answering service Mississauga, AI receptionist Toronto, WhatsApp automation" />
      <link rel="canonical" href="https://www.faalak.com/" />
      <meta property="og:site_name" content="Faalak" />
      <meta property="og:title" content="AI Receptionist for GTA Businesses | Faalak" />
      <meta property="og:description" content="Faalak's AI receptionist answers every call 24/7, books appointments and sends you the details on WhatsApp. Based in Mississauga, serving the GTA." />
      <meta property="og:url" content="https://www.faalak.com/" />
      <meta property="og:image" content="https://www.faalak.com/og-banner.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Receptionist for GTA Businesses | Faalak" />
      <meta name="twitter:description" content="Faalak's AI receptionist answers every call 24/7, books appointments and sends you the details on WhatsApp. Based in Mississauga, serving the GTA." />
      <meta name="twitter:image" content="https://www.faalak.com/og-banner.png" />
    </Helmet>
    <Hero />
    <HowItWorks />
    <OurWork />
    <MissedCallsCalculator />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
