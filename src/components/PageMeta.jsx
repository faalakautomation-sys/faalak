import { Helmet } from "react-helmet-async";
import { INDEX_ROBOTS, OG_IMAGE_URL, canonicalUrl } from "../seo/meta";

const PageMeta = ({
  title,
  description,
  path = "/",
  indexable = true,
  type = "website",
  jsonLd = null,
}) => {
  const url = canonicalUrl(path);
  const robots = indexable ? INDEX_ROBOTS : "noindex, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {indexable ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {indexable ? <meta property="og:url" content={url} /> : null}
      <meta property="og:site_name" content="Faalak" />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Faalak - Never miss another customer call" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default PageMeta;
