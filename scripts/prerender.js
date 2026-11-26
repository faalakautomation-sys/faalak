import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import React, { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const NOT_FOUND_PATH = "/this-page-does-not-exist-seo-test";
const distDir = resolve("dist");
const templatePath = resolve(distDir, "index.html");

const server = await createServer({
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

function stripSeo(html) {
  return html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*\bname=(["'])description\1[^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname=(["'])robots\1[^>]*>/gi, "")
    .replace(/<link\b[^>]*\brel=(["'])canonical\1[^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bproperty=(["'])og:[^"']+\1[^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname=(["'])twitter:[^"']+\1[^>]*>/gi, "")
    .replace(/<script\b[^>]*\btype=(["'])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi, "");
}

function rewriteAssets(html, manifest) {
  let next = html;
  for (const [source, asset] of Object.entries(manifest)) {
    if (source.startsWith("src/assets/") && asset.file) {
      next = next.replaceAll(`/${source}`, `/${asset.file}`);
    }
  }
  return next;
}

function renderLocation(App, location) {
  // React 19 hoists <title>, <meta> and <link> to the front of the SSR string.
  // Keep that prefix for <head> and put only the app markup in #root so hydration matches.
  const markup = renderToString(
    React.createElement(
      StrictMode,
      null,
      React.createElement(
        HelmetProvider,
        null,
        React.createElement(StaticRouter, { location }, React.createElement(App)),
      ),
    ),
  );
  const splitAt = markup.search(/<div\b/);
  if (splitAt < 0) {
    throw new Error(`SSR markup for ${location} has no root element`);
  }
  return { head: markup.slice(0, splitAt), body: markup.slice(splitAt) };
}

function applyPage(template, rendered, manifest) {
  let html = stripSeo(template).replace("</head>", `    ${rendered.head}\n  </head>`);
  if (!html.includes('<div id="root"></div>')) {
    throw new Error("Could not find the empty #root mount point in dist/index.html.");
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${rendered.body}</div>`);
  html = rewriteAssets(html, manifest);
  return html;
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function tagText(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1].trim()) : "";
}

function metaContent(html, attribute, name) {
  const pattern = new RegExp(
    `<meta\\b[^>]*\\b${attribute}=(["'])${name}\\1[^>]*\\bcontent=(["'])([\\s\\S]*?)\\2[^>]*>`,
    "i",
  );
  const reversed = new RegExp(
    `<meta\\b[^>]*\\bcontent=(["'])([\\s\\S]*?)\\1[^>]*\\b${attribute}=(["'])${name}\\3[^>]*>`,
    "i",
  );
  const match = html.match(pattern);
  if (match) return decode(match[3].trim());
  const reverseMatch = html.match(reversed);
  return reverseMatch ? decode(reverseMatch[2].trim()) : "";
}

function canonicalHref(html) {
  const match = html.match(/<link\b[^>]*\brel=(["'])canonical\1[^>]*>/i);
  if (!match) return "";
  const href = match[0].match(/\bhref=(["'])([\s\S]*?)\1/i);
  return href ? decode(href[2]) : "";
}

function outputPath(routePath) {
  if (routePath === "/") return resolve(distDir, "index.html");
  return resolve(distDir, routePath.slice(1), "index.html");
}

function assertPage(html, routePath, indexable) {
  const titles = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) ?? [];
  if (titles.length !== 1) {
    throw new Error(`${routePath} has ${titles.length} title tags`);
  }

  const title = tagText(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, "name", "description");
  const h1s = html.match(/<h1\b/gi) ?? [];
  if (!title) throw new Error(`Missing title for ${routePath}`);
  if (!description) throw new Error(`Missing meta description for ${routePath}`);
  if (h1s.length !== 1) throw new Error(`${routePath} has ${h1s.length} h1 tags`);
  if (html.includes("/src/assets/")) throw new Error(`Unresolved asset URL in ${routePath}`);
  if (html.includes("SearchAction") || html.includes('"Worldwide"')) {
    throw new Error(`${routePath} still contains SearchAction or Worldwide schema`);
  }
  if (/Retell/i.test(title) || /Retell/i.test(description)) {
    throw new Error(`${routePath} head tags name a vendor`);
  }

  const canonical = canonicalHref(html);
  if (indexable) {
    const expected = routePath === "/" ? "https://www.faalak.com/" : `https://www.faalak.com${routePath}`;
    if (canonical !== expected) {
      throw new Error(`${routePath} canonical is "${canonical}", expected "${expected}"`);
    }
    const ogTitle = metaContent(html, "property", "og:title");
    const ogDescription = metaContent(html, "property", "og:description");
    const ogUrl = metaContent(html, "property", "og:url");
    if (ogTitle !== title || ogDescription !== description || ogUrl !== expected) {
      throw new Error(`${routePath} Open Graph tags do not match title, description, and canonical`);
    }
    if (!html.includes("https://www.faalak.com/og-banner.jpg")) {
      throw new Error(`${routePath} is missing the Open Graph image`);
    }
  } else if (canonical) {
    throw new Error(`${routePath} is noindex and must not advertise a canonical`);
  } else if (!/noindex/i.test(metaContent(html, "name", "robots"))) {
    throw new Error(`${routePath} must be noindex`);
  }

  return { title, description };
}

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { NOINDEX_PATHS, indexablePaths, renderSitemap } = await server.ssrLoadModule("/src/seo/routes.js");
  const template = await readFile(templatePath, "utf8");
  const manifestPath = resolve(distDir, ".vite/manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const paths = indexablePaths();
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const pages = [];

  for (const routePath of paths) {
    const rendered = applyPage(template, renderLocation(App, routePath), manifest);
    const meta = assertPage(rendered, routePath, true);
    if (seenTitles.has(meta.title)) {
      throw new Error(`Duplicate title "${meta.title}" on ${routePath} and ${seenTitles.get(meta.title)}`);
    }
    if (seenDescriptions.has(meta.description)) {
      throw new Error(
        `Duplicate description on ${routePath} and ${seenDescriptions.get(meta.description)}`,
      );
    }
    if (meta.description.length > 160) {
      console.warn(`${routePath} description is ${meta.description.length} characters`);
    }
    if (meta.title.length > 60) {
      console.warn(`${routePath} title is ${meta.title.length} characters`);
    }
    if (meta.title.includes("Faalak AI Automation")) {
      throw new Error(`${routePath} still uses the Faalak AI Automation title template`);
    }
    seenTitles.set(meta.title, routePath);
    seenDescriptions.set(meta.description, routePath);
    pages.push({ routePath, ...meta, canonical: routePath === "/" ? "https://www.faalak.com/" : `https://www.faalak.com${routePath}` });

    const destination = outputPath(routePath);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, rendered);
  }

  for (const routePath of NOINDEX_PATHS) {
    const rendered = applyPage(template, renderLocation(App, routePath), manifest);
    assertPage(rendered, routePath, false);
    if (routePath === "/blog/superintelligence" && !rendered.includes("What Is Superintelligence?")) {
      throw new Error("Superintelligence page was not prerendered");
    }
    const destination = outputPath(routePath);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, rendered);
  }

  const notFound = applyPage(template, renderLocation(App, NOT_FOUND_PATH), manifest);
  assertPage(notFound, NOT_FOUND_PATH, false);
  if (!notFound.includes("Page not found")) {
    throw new Error("404 HTML is not the app 404 page");
  }
  await writeFile(resolve(distDir, "404.html"), notFound);

  const home = await readFile(outputPath("/"), "utf8");
  for (const required of ["LocalBusiness", "ProfessionalService", "FAQPage", "BreadcrumbList", "Mississauga"]) {
    if (!home.includes(required)) {
      throw new Error(`Homepage JSON-LD is missing ${required}`);
    }
  }
  if (home.includes("SearchAction") || home.includes("Worldwide")) {
    throw new Error("Homepage JSON-LD still contains SearchAction or Worldwide");
  }
  if (!home.includes("Mississauga AI receptionist provider")) {
    throw new Error("Homepage description is missing the Mississauga provider line");
  }
  if (!home.includes('href="/services/voice-agents"') || home.includes('href="/blog/superintelligence"')) {
    throw new Error("Homepage is missing the voice-agents link or still links to the superintelligence article");
  }
  if (!home.includes('href="/ai-voice-agents-canada"')) {
    throw new Error("Homepage is missing the Canada pillar link");
  }

  const sitemap = renderSitemap(paths);
  const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocs = pages.map((page) => page.canonical);
  if (sitemapLocs.join("\n") !== expectedLocs.join("\n")) {
    throw new Error("sitemap.xml does not match the indexable routes");
  }
  if (!sitemap.startsWith("<?xml")) {
    throw new Error("sitemap.xml is not XML");
  }
  await writeFile(resolve(distDir, "sitemap.xml"), sitemap);
  await writeFile(resolve("public/sitemap.xml"), sitemap);

  const robots = await readFile(resolve(distDir, "robots.txt"), "utf8");
  if (!robots.includes("Sitemap: https://www.faalak.com/sitemap.xml") || /<html/i.test(robots)) {
    throw new Error("dist/robots.txt is missing the sitemap line or contains HTML");
  }

  await unlink(manifestPath);

  console.log(`Prerendered ${pages.length} routes plus 404.html`);
  for (const page of pages) {
    console.log(`${page.routePath}\t${page.title}\t${page.canonical}`);
  }
} finally {
  await server.close();
}
