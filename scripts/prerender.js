import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React, { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const server = await createServer({
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const legalPages = [
  {
    path: "/privacy",
    title: "Privacy Policy | Faalak",
    description: "Learn how Faalak collects, uses, and protects information when providing AI receptionist, appointment booking, notifications, and chatbot services.",
  },
  {
    path: "/terms",
    title: "Terms of Service | Faalak",
    description: "Read the terms that apply when using Faalak's AI receptionist, call answering, appointment booking, messaging, and chatbot services.",
  },
];

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const markup = renderToString(
    React.createElement(
      StrictMode,
      null,
      React.createElement(
        HelmetProvider,
        null,
        React.createElement(
          StaticRouter,
          { location: "/" },
          React.createElement(App),
        ),
      ),
    ),
  );
  const indexPath = resolve("dist/index.html");
  const manifestPath = resolve("dist/.vite/manifest.json");
  const html = await readFile(indexPath, "utf8");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const rootMarkup = `<div id="root">${markup}</div>`;

  if (!html.includes('<div id="root"></div>')) {
    throw new Error("Could not find the empty #root mount point in dist/index.html.");
  }

  let prerenderedHtml = html.replace('<div id="root"></div>', rootMarkup);
  for (const [source, asset] of Object.entries(manifest)) {
    if (source.startsWith("src/assets/") && asset.file) {
      prerenderedHtml = prerenderedHtml.replaceAll(`/${source}`, `/${asset.file}`);
    }
  }
  if (prerenderedHtml.includes("/src/assets/")) {
    throw new Error("Prerendered HTML contains an unresolved source asset URL.");
  }

  await writeFile(indexPath, prerenderedHtml);

  for (const page of legalPages) {
    const pageMarkup = renderToString(
      React.createElement(
        StrictMode,
        null,
        React.createElement(
          HelmetProvider,
          null,
          React.createElement(
            StaticRouter,
            { location: page.path },
            React.createElement(App),
          ),
        ),
      ),
    );
    let pageHtml = html.replace('<div id="root"></div>', `<div id="root">${pageMarkup}</div>`);
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);
    pageHtml = pageHtml.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${page.title}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1https://www.faalak.com${page.path}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1https://www.faalak.com${page.path}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${page.title}$2`,
    );
    pageHtml = pageHtml.replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    );

    const outputDirectory = resolve("dist", page.path.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(resolve(outputDirectory, "index.html"), pageHtml);
  }

  await unlink(manifestPath);
} finally {
  await server.close();
}
