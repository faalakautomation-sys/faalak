import { Helmet } from "react-helmet-async";
import DirectAgentCalls from "../components/DirectAgentCalls";

const LiveDemosPage = () => (
  <>
    <Helmet>
      <title>Live Demos | Faalak</title>
      <meta name="description" content="Call Faalak's live AI receptionist demos for Massage & Spa, Furniture Store, HVAC, Real Estate, and Landscaping." />
      <link rel="canonical" href="https://www.faalak.com/live-demos" />
    </Helmet>
    <div className="pt-24 sm:pt-28">
      <DirectAgentCalls />
    </div>
  </>
);

export default LiveDemosPage;
