import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Public backend already embedded in the live www.faalak.com bundle.
// Workers Builds gives VITE_API_URL to the production trigger only, so a
// preview build of a non-production branch does not receive it.
const PUBLISHED_API_URL = "https://limeade-detention-zen.ngrok-free.dev/api";

function envIsSet(name) {
  const value = process.env[name]?.trim();
  return value === "1" || value === "true";
}

// Workers Builds documents CI=true and WORKERS_CI=1, plus WORKERS_CI_* ids.
// Those defaults are per trigger and can be overridden, so accept any of them.
function cloudflareBuildSignals() {
  const flags = ["CI", "WORKERS_CI", "CF_PAGES"].filter((name) => envIsSet(name));
  const present = [
    "WORKERS_CI_BUILD_UUID",
    "WORKERS_CI_COMMIT_SHA",
    "WORKERS_CI_BRANCH",
    "CF_PAGES_BRANCH",
    "CF_PAGES_COMMIT_SHA",
  ].filter((name) => Boolean(process.env[name]?.trim()));
  return [...flags, ...present];
}

function isProductionBranch() {
  const branch = (process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH || "").trim();
  return branch === "main" || branch === "master";
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  let apiUrl = env.VITE_API_URL?.trim();
  let usedPublishedFallback = false;

  if (mode === "production") {
    const signals = cloudflareBuildSignals();
    if (!apiUrl && signals.length > 0 && !isProductionBranch()) {
      apiUrl = PUBLISHED_API_URL;
      usedPublishedFallback = true;
      process.env.VITE_API_URL = PUBLISHED_API_URL;
      console.warn(
        `[vite] VITE_API_URL is unset (${signals.join(", ")}). Embedding the public backend URL already shipped in the live bundle.`,
      );
    }

    if (!apiUrl) {
      throw new Error("VITE_API_URL must be set to the public Faalak backend URL for production builds.");
    }

    let parsedApiUrl;
    try {
      parsedApiUrl = new URL(apiUrl);
    } catch {
      throw new Error("VITE_API_URL must be an absolute HTTPS URL for production builds.");
    }

    if (parsedApiUrl.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(parsedApiUrl.hostname)) {
      throw new Error("VITE_API_URL must use a public HTTPS backend URL; localhost is not reachable by website visitors.");
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    define: usedPublishedFallback
      ? { "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl) }
      : undefined,
    build: {
      manifest: true,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  };
});
