import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Public backend already baked into the committed production bundle.
// Workers Builds applies dashboard build variables to the production trigger only,
// so preview builds of non-production branches do not receive VITE_API_URL.
const PUBLISHED_API_URL = "https://limeade-detention-zen.ngrok-free.dev/api";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  let apiUrl = env.VITE_API_URL?.trim();

  if (mode === "production") {
    if (!apiUrl && process.env.WORKERS_CI === "1") {
      apiUrl = PUBLISHED_API_URL;
      process.env.VITE_API_URL = PUBLISHED_API_URL;
      console.warn(
        "[vite] VITE_API_URL is unset for this Workers Build. Embedding the public backend URL already shipped in the production bundle.",
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
