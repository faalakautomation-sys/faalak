import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GSC_VERIFICATION, OG_IMAGE_URL, indexablePages, renderSitemap } from "../src/seo/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function routeFile(routePath) {
  const relative = routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`;
  return path.join(distDir, relative);
}

function read(file) {
  assert(fs.existsSync(file), `Missing ${path.relative(root, file)}`);
  return fs.readFileSync(file, "utf8");
}

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function extract(html, pattern, label) {
  const match = html.match(pattern);
  assert(match, `${label} missing`);
  return decodeHtml(match[1]);
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
}

function walk(value, visit) {
  if (Array.isArray(value)) {
    value.forEach((entry) => walk(entry, visit));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      visit(key, entry);
      walk(entry, visit);
    }
  }
}

function checkHtml(file, page) {
  const html = read(file);
  const title = extract(html, /<title[^>]*>([^<]*)<\/title>/, `${page.path} title`);
  const description = extract(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/, `${page.path} description`);
  const h1 = extract(html, /<h1>([^<]*)<\/h1>/, `${page.path} h1`);
  assert(title === page.title, `${page.path} title mismatch: ${title}`);
  assert(description === page.description, `${page.path} description mismatch`);
  assert(h1 === page.h1, `${page.path} h1 mismatch: ${h1}`);
  assert(!html.includes('<div id="root"></div>'), `${page.path} root is empty`);
  assert(html.includes(GSC_VERIFICATION), `${page.path} missing GSC meta`);
  assert(html.includes(OG_IMAGE_URL), `${page.path} OG image is not ${OG_IMAGE_URL}`);
  assert(!html.includes("/favicon.png\"") || html.includes('rel="icon"'), `${page.path} unexpectedly uses the favicon as social image`);
  assert(!html.includes('property="og:image" content="https://www.faalak.com/favicon.png"'), `${page.path} still uses favicon as og:image`);
  assert(!html.includes("https://faalak.com"), `${page.path} contains apex canonical host`);
  assert(!html.includes("http://"), `${page.path} contains http://`);
  assert(!html.includes("SearchAction"), `${page.path} contains SearchAction`);
  assert(!html.includes("streetAddress"), `${page.path} contains streetAddress`);
  assert(!html.includes("postalCode"), `${page.path} contains postalCode`);
  assert(!html.includes("Worldwide"), `${page.path} contains Worldwide areaServed`);

  for (const paragraph of page.paragraphs) {
    assert(
      html.includes(escapeHtml(paragraph)),
      `${page.path} is missing body copy`,
    );
  }

  if (page.canonical) {
    const canonical = extract(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/, `${page.path} canonical`);
    assert(canonical === page.canonical, `${page.path} canonical is ${canonical}`);
    const ogUrl = extract(html, /<meta[^>]*property="og:url"[^>]*content="([^"]+)"/, `${page.path} og:url`);
    assert(ogUrl === page.canonical, `${page.path} og:url is ${ogUrl}`);
  }

  const blocks = jsonLdBlocks(html);
  assert(blocks.length > 0, `${page.path} missing JSON-LD`);
  const types = blocks.map((block) => block["@type"]);
  assert(types.includes("Organization"), `${page.path} missing Organization`);
  if (page.path === "/") {
    assert(types.includes("LocalBusiness"), "Homepage missing LocalBusiness");
    assert(types.includes("WebSite"), "Homepage missing WebSite");
    const localBusiness = blocks.find((block) => block["@type"] === "LocalBusiness");
    assert(localBusiness.telephone === "+1-416-910-4547", "LocalBusiness phone mismatch");
    assert(localBusiness.address.addressLocality === "Toronto", "LocalBusiness locality mismatch");
    assert(localBusiness.address.addressRegion === "ON", "LocalBusiness region mismatch");
    assert(localBusiness.address.addressCountry === "CA", "LocalBusiness country mismatch");
    assert(!("streetAddress" in localBusiness.address), "LocalBusiness invented a street");
    const website = blocks.find((block) => block["@type"] === "WebSite");
    assert(!website.potentialAction, "WebSite still has a SearchAction");
  }

  for (const block of blocks) {
    walk(block, (key, value) => {
      assert(key !== "streetAddress" && key !== "postalCode", `${page.path} schema includes ${key}`);
      assert(key !== "potentialAction", `${page.path} schema includes potentialAction`);
      assert(value !== "SearchAction", `${page.path} schema includes SearchAction`);
      assert(value !== "Worldwide", `${page.path} schema area is Worldwide`);
    });
  }

  return title;
}

function contentType(filePath) {
  if (filePath.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function resolveAsset(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  assert(!decoded.includes("\0"), "Invalid path");
  const rel = decoded.replace(/^\/+/, "");
  const candidates = rel === "" ? ["index.html"] : [rel, `${rel}.html`, path.join(rel, "index.html")];
  for (const candidate of candidates) {
    const full = path.resolve(distDir, candidate);
    if (!full.startsWith(`${distDir}${path.sep}`) && full !== distDir) continue;
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return null;
}

function startServer() {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    const file = resolveAsset(url.pathname);
    if (!file) {
      const body = fs.readFileSync(path.join(distDir, "404.html"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : body);
      return;
    }
    const body = fs.readFileSync(file);
    response.writeHead(200, { "Content-Type": contentType(file) });
    response.end(request.method === "HEAD" ? undefined : body);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function request(port, method, urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path: urlPath, method }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        resolve({
          status: response.statusCode,
          type: response.headers["content-type"] || "",
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function checkStaticFiles() {
  const robots = read(path.join(distDir, "robots.txt"));
  assert(robots.startsWith("# Faalak.com"), "robots.txt does not start with the production header");
  assert(robots.includes("User-agent: *"), "robots.txt missing User-agent");
  assert(robots.includes("Allow: /"), "robots.txt missing Allow");
  assert(robots.includes("Sitemap: https://www.faalak.com/sitemap.xml"), "robots.txt missing sitemap");
  assert(!/<html|<!doctype/i.test(robots), "robots.txt contains HTML");

  const sitemap = read(path.join(distDir, "sitemap.xml"));
  assert(sitemap.startsWith("<?xml"), "sitemap.xml is not XML");
  assert(sitemap.includes("<urlset"), "sitemap.xml missing urlset");
  assert(!/<html|<!doctype html/i.test(sitemap), "sitemap.xml contains HTML");
  assert(sitemap === renderSitemap(), "dist sitemap drifted from the route list");
  assert(read(path.join(root, "public", "sitemap.xml")) === sitemap, "public sitemap drifted from dist");
  for (const page of indexablePages) {
    assert(sitemap.includes(`<loc>${page.canonical}</loc>`), `sitemap missing ${page.canonical}`);
  }
  assert(!sitemap.includes("this-page-does-not-exist"), "sitemap includes an unknown URL");

  const verification = read(path.join(distDir, "google87073849cdc3c38f.html")).trim();
  assert(
    verification === "google-site-verification: google87073849cdc3c38f.html",
    "GSC HTML file body mismatch",
  );
  assert(fs.existsSync(path.join(distDir, "og-image.jpg")), "og-image.jpg was not copied to dist");

  const wrangler = read(path.join(root, "wrangler.jsonc"));
  assert(wrangler.includes('"not_found_handling": "404-page"'), "wrangler still soft-404s unknown paths");
  assert(wrangler.includes('"html_handling": "drop-trailing-slash"'), "wrangler does not serve extensionless HTML");
  assert(!wrangler.includes("single-page-application"), "wrangler still uses SPA fallback");

  const netlify = read(path.join(root, "netlify.toml"));
  assert(!netlify.includes('to = "/index.html"'), "netlify.toml still rewrites every path to index.html");
}

async function checkServer() {
  const server = await startServer();
  const { port } = server.address();
  try {
    const home = await request(port, "GET", "/");
    const receptionist = await request(port, "GET", "/services/ai-receptionist");
    const voice = await request(port, "GET", "/services/voice-agents");
    const unknown = await request(port, "HEAD", "/this-page-does-not-exist-seo-test");
    const unknownBody = await request(port, "GET", "/this-page-does-not-exist-seo-test");
    const robots = await request(port, "GET", "/robots.txt");
    const sitemap = await request(port, "GET", "/sitemap.xml");
    const gsc = await request(port, "GET", "/google87073849cdc3c38f.html");

    assert(home.status === 200 && home.body.includes("<h1>AI voice agents and virtual receptionists for Toronto businesses</h1>"), "Homepage HTML missing H1");
    assert(receptionist.status === 200, "AI receptionist route did not return 200");
    assert(voice.status === 200, "Voice agents route did not return 200");
    const titles = [home, receptionist, voice].map((response) => extract(response.body, /<title[^>]*>([^<]*)<\/title>/, "title"));
    assert(new Set(titles).size === 3, `Money-page titles are not unique: ${titles.join(" | ")}`);
    assert(receptionist.body.includes('rel="canonical" href="https://www.faalak.com/services/ai-receptionist"'), "Receptionist canonical is not www");
    assert(unknown.status === 404, `Unknown path returned ${unknown.status}`);
    assert(unknownBody.status === 404 && unknownBody.body.includes("<h1>Page not found</h1>"), "Unknown path body is not the 404 page");
    assert(!unknownBody.body.includes("<title>AI Voice Agents"), "Unknown path returned the homepage title");
    assert(robots.status === 200 && robots.type.startsWith("text/plain"), `robots content-type is ${robots.type}`);
    assert(!robots.body.includes("<html"), "robots response contains HTML");
    assert(sitemap.status === 200 && sitemap.type.startsWith("application/xml"), `sitemap content-type is ${sitemap.type}`);
    assert(sitemap.body.startsWith("<?xml"), "sitemap response is not XML");
    assert(gsc.status === 200 && gsc.body.includes("google-site-verification: google87073849cdc3c38f.html"), "GSC file is not served");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

const titles = indexablePages.map((page) => checkHtml(routeFile(page.path), page));
assert(new Set(titles).size === titles.length, "Indexable titles are not unique");
const descriptions = indexablePages.map((page) => page.description);
assert(new Set(descriptions).size === descriptions.length, "Indexable descriptions are not unique");
checkHtml(path.join(distDir, "404.html"), {
  path: "404",
  title: "Page Not Found | Faalak",
  description: "This page does not exist on the Faalak site.",
  h1: "Page not found",
  paragraphs: ["The page you requested is not on faalak.com. Use the links below to reach the homepage, services, or contact details."],
  canonical: null,
});
const notFoundHtml = read(path.join(distDir, "404.html"));
assert(notFoundHtml.includes('content="noindex, follow"'), "404 page is indexable");
assert(!/rel="canonical"/i.test(notFoundHtml), "404 page publishes a canonical");
checkStaticFiles();
await checkServer();
console.log(`Verified ${indexablePages.length} prerendered routes, 404, robots.txt, and sitemap.xml.`);
