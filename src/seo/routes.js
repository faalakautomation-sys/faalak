import { caseStudies } from "../assets/assets";
import { industriesMenu, servicesMenu } from "../data/menuData";
import { resourceTopics } from "../data/resourceTopics";
import { SITEMAP_LASTMOD, canonicalUrl } from "./meta.js";

export function indexablePaths() {
  const paths = [
    "/",
    ...servicesMenu.map((item) => `/services/${item.slug}`),
    ...industriesMenu.map((item) => `/industries/${item.slug}`),
    "/work",
    ...caseStudies.map((study) => `/work/${study.slug}`),
    "/data-security",
    ...Object.keys(resourceTopics).map((slug) => `/resources/${slug}`),
    "/book-appointment",
    "/privacy",
    "/terms",
    "/blog/superintelligence",
  ];

  const seen = new Set();
  for (const path of paths) {
    if (seen.has(path)) {
      throw new Error(`Duplicate indexable path: ${path}`);
    }
    seen.add(path);
  }

  return paths;
}

export function renderSitemap(paths = indexablePaths()) {
  const urls = paths
    .map((path) => {
      const loc = canonicalUrl(path);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITEMAP_LASTMOD}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
