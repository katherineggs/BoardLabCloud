const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.226.213.131:3001/',
      changeOrigin: true,
    })
  );
};