import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <div
    style={{ paddingTop: "calc(var(--navbar-h) + 1.5rem)" }}
    className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
  >
    <Helmet>
      <title>Page Not Found | Faalak AI Automation</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">404</p>
    <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Page not found</h1>
    <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
      The page you&apos;re looking for doesn&apos;t exist or may have moved.
    </p>
    <Link
      to="/"
      className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
    >
      Back to home
    </Link>
  </div>
);

export default NotFound;
