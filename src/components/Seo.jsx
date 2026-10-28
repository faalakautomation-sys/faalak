import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveSeo } from "../seo/site.js";

function matchingMeta(attribute, key) {
  return [...document.head.querySelectorAll("meta")].filter(
    (node) => node.getAttribute(attribute) === key,
  );
}

function upsertMeta(attribute, key, content) {
  const nodes = matchingMeta(attribute, key);
  if (!content) {
    nodes.forEach((node) => node.remove());
    return;
  }
  const primary = nodes[0] || document.createElement("meta");
  primary.setAttribute(attribute, key);
  primary.setAttribute("content", content);
  if (!primary.parentNode) document.head.appendChild(primary);
  nodes.slice(1).forEach((node) => node.remove());
}

function upsertCanonical(href) {
  const nodes = [...document.head.querySelectorAll('link[rel="canonical"]')];
  if (!href) {
    nodes.forEach((node) => node.remove());
    return;
  }
  const primary = nodes[0] || document.createElement("link");
  primary.setAttribute("rel", "canonical");
  primary.setAttribute("href", href);
  if (!primary.parentNode) document.head.appendChild(primary);
  nodes.slice(1).forEach((node) => node.remove());
}

function upsertJsonLd(nodes) {
  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());
  nodes.forEach((node) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(node);
    document.head.appendChild(script);
  });
}

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = resolveSeo(pathname);
    document.title = page.title;
    upsertMeta("name", "description", page.description);
    upsertMeta("name", "robots", page.robots);
    upsertCanonical(page.canonical);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:type", page.ogType);
    upsertMeta("property", "og:url", page.canonical);
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertJsonLd(page.jsonLd);
  }, [pathname]);

  return null;
};

export default Seo;
