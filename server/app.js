/* eslint consistent-return:0 */
global.base_dir = __dirname;
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));
const logger = include('utils/logger');
const express = require('express');
const Raven = require('raven');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const setupGoogleOauth = require('./oauth-google');
const setupFitbitOauth = require('./oauth-fitbit');
const makeAppVariables = require('./configure/app-variables');
// const setup = require('./middlewares/frontendMiddleware');
// const { resolve } = require('path');


/**
 * - Make routes for static assets to be loaded
 * - Set app variables
 * - Setup Google oauth
 * - Setup Facebook oauth
 */
const app = express();

app.use(function allowOrigin(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});


const DSN = 'https://f3ce03f31c85417db55bee6dfeaf2533@sentry.io/1278573';
Raven.config(DSN).install();

// setup(app, {
//   outputPath: resolve(process.cwd(), 'build'),
//   publicPath: '/',
// });

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;


/**
 * This must be called before setting up oauth just below
 */
makeAppVariables(app);

/**
 * Setup passport for Fitbit and Google
 * Setup routes to login/signup with Google and Fitbit oauth
 */
setupGoogleOauth(app);
setupFitbitOauth(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Static assets to be loaded
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/images', express.static(path.join(__dirname, 'images')));


/** API routes */
app.use('/api', require('./api'));

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== 'test') {
    logger.error(err);
  }
  if (err.isJoi) {
    res.status(400).send(err.toSend);
  } else {
    res.status(err.commonType || err.status || 500).send(err.message);
  }
});
