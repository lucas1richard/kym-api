const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev');

const addDevMiddlewares = (app) => {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(express.static('../dist'));
};

// Production middlewares
const addProdMiddlewares = (app) => {
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'build');
  app.use(publicPath, express.static(outputPath));
  // app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
  return app;
};

module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  console.log(isProd, process.env.NODE_ENV);
  if (isProd) {
    addProdMiddlewares(app, options);
  } else if (process.env.NODE_ENV !== 'test') {
    addDevMiddlewares(app);
  }
  return app;
};
