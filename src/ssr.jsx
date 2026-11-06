import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

const SsrRoot = ({ location }) => (
  <HelmetProvider>
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  </HelmetProvider>
);

export default SsrRoot;
