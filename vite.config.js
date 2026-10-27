import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const apiUrl = env.VITE_API_URL?.trim();

  if (mode === "production") {
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
