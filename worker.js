export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "faalak.com" || url.hostname === "www.faalak.com") {
      if (url.protocol !== "https:" || url.hostname !== "www.faalak.com") {
        url.protocol = "https:";
        url.hostname = "www.faalak.com";
        url.port = "";
        return Response.redirect(url.toString(), 301);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
