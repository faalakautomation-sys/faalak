import { faqData } from "../assets/assets";
import Hero from "../components/Hero";
import DirectAgentCalls from "../components/DirectAgentCalls";
import PageMeta from "../components/PageMeta";
import MissedCallsCalculator from "./MissedCallsCalculator";
import Pricing from "../components/Pricing";
import Services from "../components/Services";
import WhoItsFor, { HowItWorks } from "../components/OurWork";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import OurTeam from "../components/OurTeam";
import SecurityHighlights from "../components/SecurityHighlights";
import { homeJsonLd, homeSeo } from "../seo/meta";

const Home = () => (
  <>
    <PageMeta {...homeSeo} jsonLd={homeJsonLd(faqData)} />
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
