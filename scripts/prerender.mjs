import { createElement } from "react";
import { renderToString } from "react-dom/server";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "dist");
const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(path.join(outputDirectory, ".vite", "manifest.json"), "utf8"));
const vite = await createServer({
  root,
  configFile: false,
  plugins: [react()],
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [{ default: SsrRoot }, { servicesMenu, industriesMenu }, { GTA_INDUSTRIES }, { caseStudies }] =
    await Promise.all([
      vite.ssrLoadModule("/src/ssr.jsx"),
      vite.ssrLoadModule("/src/data/menuData.js"),
      vite.ssrLoadModule("/src/data/industries.js"),
      vite.ssrLoadModule("/src/assets/assets.js"),
  ]);

  const routes = new Set([
    "/",
    "/live-demos",
    "/work",
    "/data-security",
    "/blog/superintelligence",
    ...servicesMenu.map(({ slug }) => `/services/${slug}`),
    ...industriesMenu.map(({ slug }) => `/industries/${slug}`),
    ...GTA_INDUSTRIES.map(({ slug }) => `/industries/${slug}`),
    ...caseStudies.map(({ slug }) => `/work/${slug}`),
  ]);

  for (const route of routes) {
    const application = createElement(SsrRoot, { location: route });
    const renderedBody = renderToString(application);
    const headTags = [];
    // React 19 hoists Helmet tags into the render output; place those tags in the actual document head.
    const body = renderedBody.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>|<script\b[^>]*>[\s\S]*?<\/script>/gi,
      (tag) => {
        headTags.push(tag);
        return "";
      },
    );
    const seoMarkup = headTags.join("");
    if (!/<title\b/i.test(seoMarkup)) {
      throw new Error(`Missing page title during prerender: ${route}`);
    }

    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["'](?:description|keywords|twitter:[^"']+)["'][^>]*\/?>/gi, "")
      .replace(/<meta\s+property=["']og:[^"']+["'][^>]*\/?>/gi, "")
      .replace(/<link\s+rel=["']canonical["'][^>]*\/?>/gi, "")
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
      .replace("</head>", `${seoMarkup}</head>`);

    for (const [source, entry] of Object.entries(manifest)) {
      if (entry.file && source.startsWith("src/")) {
        html = html.replaceAll(`/${source}`, `/${entry.file}`);
      }
    }

    const destination =
      route === "/" ? path.join(outputDirectory, "index.html") : path.join(outputDirectory, route.slice(1), "index.html");
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html, "utf8");
    console.log(`Prerendered ${route}`);
  }
} finally {
  await vite.close();
}
