const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app
    .use(
      '/auth',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        pathRewrite: { '^/auth': '' },
        changeOrigin: true,
      }),
    )
    .use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5002',
        changeOrigin: true,
      }),
    );
};
