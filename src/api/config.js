const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || "/api";
const apiUrlWithoutTrailingSlash = configuredApiUrl.replace(/\/+$/, "");

export const API_BASE_URL = /\/api$/i.test(apiUrlWithoutTrailingSlash)
  ? apiUrlWithoutTrailingSlash
  : `${apiUrlWithoutTrailingSlash}/api`;
