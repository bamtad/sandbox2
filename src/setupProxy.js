const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/apis",
    createProxyMiddleware({
      target: "https://potion.dev.gumisofts.com",
      changeOrigin: true,
      secure: false
    })
  );
};