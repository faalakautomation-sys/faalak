import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const LegalPageLayout = ({ title, description, canonicalUrl, children }) => (
  <main
    style={{ paddingTop: "calc(var(--navbar-h) + 2rem)" }}
    className="min-h-[65vh] px-4 pb-20 sm:px-8 lg:px-16"
  >
    <Helmet>
      <title>{`${title} | Faalak`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={`${title} | Faalak`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>

    <article className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#756b62] transition hover:text-[#985236]"
      >
        <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
      <header className="mt-8 border-b border-[#ded8d0] pb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#985236]">
          Based in Mississauga, serving the GTA
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#24211e] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[#68635d]">Last updated: November 11, 2026</p>
      </header>
      <div className="mt-8 space-y-8 text-sm leading-7 text-[#514b45] sm:text-base">
        {children}
      </div>
    </article>
  </main>
);

export default LegalPageLayout;
