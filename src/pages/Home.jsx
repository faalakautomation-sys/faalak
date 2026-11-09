import Hero from "../components/Hero";
import DirectAgentCalls from "../components/DirectAgentCalls";
import MissedCallsCalculator from "./MissedCallsCalculator";
import Pricing from "../components/Pricing";
import Services from "../components/Services";
import WhoItsFor, { HowItWorks } from "../components/OurWork";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import OurTeam from "../components/OurTeam";
import SecurityHighlights from "../components/SecurityHighlights";

const Home = () => (
  <>
    <Hero />
    <HowItWorks />
    <DirectAgentCalls />
    <MissedCallsCalculator />
    <WhoItsFor />
    <Pricing />
    <Services />
    <WhyChooseUs />
    <SecurityHighlights detailsLink />
    <Testimonials />
    <OurTeam />
    <FAQ />
  </>
);

export default Home;
