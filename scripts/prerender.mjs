import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  GSC_VERIFICATION,
  OG_IMAGE_URL,
  PHONE_DISPLAY,
  indexablePages,
  notFoundSeo,
  renderSitemap,
} from "../src/seo/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceTag(html, pattern, tag, label) {
  if (!pattern.test(html)) {
    throw new Error(`Built index.html is missing ${label}`);
  }
  return html.replace(pattern, tag);
}

function replaceMeta(html, attribute, name, content) {
  const pattern = new RegExp(`<meta\\b[^>]*\\b${attribute}=(["'])${name}\\1[^>]*>`, "i");
  const tag = `<meta data-rh="true" ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  return replaceTag(html, pattern, tag, `meta ${attribute}=${name}`);
}

function replaceTitle(html, title) {
  return replaceTag(
    html,
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    `<title data-rh="true">${escapeHtml(title)}</title>`,
    "title",
  );
}

function replaceCanonical(html, href) {
  const pattern = /<link\b[^>]*\brel=(["'])canonical\1[^>]*>/i;
  if (!href) {
    return html.replace(pattern, "");
  }
  return replaceTag(
    html,
    pattern,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(href)}" />`,
    "canonical",
  );
}

function replaceBlock(html, start, end, inner) {
  const startIndex = html.indexOf(start);
  const endIndex = html.indexOf(end);
  if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
    throw new Error(`Built index.html is missing ${start} marker`);
  }
  return `${html.slice(0, startIndex + start.length)}${inner}${html.slice(endIndex)}`;
}

function renderJsonLd(nodes) {
  return nodes
    .map(
      (node) =>
        `\n    <script data-rh="true" type="application/ld+json">${JSON.stringify(node)}</script>`,
    )
    .join("");
}

function renderBody(page, pages) {
  const paragraphs = page.paragraphs
    .map((paragraph) => `      <p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
  const links = pages
    .map(
      (entry) =>
        `        <li><a href="${escapeHtml(entry.path)}">${escapeHtml(entry.h1)}</a></li>`,
    )
    .join("\n");

  return `
    <main>
      <h1>${escapeHtml(page.h1)}</h1>
${paragraphs}
      <p>Faalak · Toronto, ON, Canada · ${escapeHtml(PHONE_DISPLAY)} · info@faalak.com</p>
      <nav aria-label="Site">
        <ul>
${links}
        </ul>
      </nav>
    </main>`;
}

function applyPage(template, page, pages) {
  let html = template;
  html = replaceTitle(html, page.title);
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(html, "name", "robots", page.robots);
  html = replaceCanonical(html, page.canonical);
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:type", page.ogType);
  if (page.canonical) {
    html = replaceMeta(html, "property", "og:url", page.canonical);
  } else {
    html = html.replace(/<meta\b[^>]*\bproperty=(["'])og:url\1[^>]*>/i, "");
  }
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);
  html = replaceBlock(html, "<!--seo:jsonld:start-->", "<!--seo:jsonld:end-->", renderJsonLd(page.jsonLd));
  html = replaceBlock(html, "<!--seo:body:start-->", "<!--seo:body:end-->", renderBody(page, pages));

  if (!html.includes(GSC_VERIFICATION)) {
    throw new Error("Google site verification meta missing from prerendered HTML");
  }
  if (!html.includes(OG_IMAGE_URL)) {
    throw new Error("Open Graph image is not the www social image");
  }
  if (html.includes("http://")) {
    throw new Error(`Prerendered HTML for ${page.path || "404"} contains an http:// URL`);
  }
  if (html.includes("https://faalak.com")) {
    throw new Error(`Prerendered HTML for ${page.path || "404"} uses the apex host`);
  }
  if (html.includes("SearchAction") || html.includes("streetAddress") || html.includes("Worldwide")) {
    throw new Error(`Prerendered HTML for ${page.path || "404"} contains disallowed schema`);
  }
  return html;
}

function writeRoute(routePath, html) {
  const relative = routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`;
  const destination = path.join(distDir, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}

function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html was not found. Run vite build before prerender.");
  }

  const template = fs.readFileSync(templatePath, "utf8");
  for (const page of indexablePages) {
    writeRoute(page.path, applyPage(template, page, indexablePages));
  }
  fs.writeFileSync(path.join(distDir, "404.html"), applyPage(template, notFoundSeo, indexablePages));
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), renderSitemap());
  fs.writeFileSync(path.join(root, "public", "sitemap.xml"), renderSitemap());

  const robots = fs.readFileSync(path.join(distDir, "robots.txt"), "utf8");
  if (!robots.includes("Sitemap: https://www.faalak.com/sitemap.xml") || /<html/i.test(robots)) {
    throw new Error("dist/robots.txt is missing the sitemap line or contains HTML");
  }
}

main();
