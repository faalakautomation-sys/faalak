import { readFile, unlink, writeFile } from "node:fs/promises";
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
  await unlink(manifestPath);
} finally {
  await server.close();
}
