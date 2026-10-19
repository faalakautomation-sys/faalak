const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:3001/api";
const apiUrlWithoutTrailingSlash = configuredApiUrl.replace(/\/+$/, "");

export const API_BASE_URL = /\/api$/i.test(apiUrlWithoutTrailingSlash)
  ? apiUrlWithoutTrailingSlash
  : `${apiUrlWithoutTrailingSlash}/api`;
