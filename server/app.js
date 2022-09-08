/* eslint consistent-return:0 */
global.base_dir = __dirname;
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));
const logger = include('utils/logger');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const makeAppVariables = require('./configure/app-variables');
const configureRaven = require('./configure/raven');

/**
 * - Make routes for static assets to be loaded
 * - Set app variables
 * - Setup Google oauth
 * - Setup Facebook oauth
 */
const app = express();

configureRaven(app);

app.use(cors({
  exposedHeaders: 'Authorization, token',
}));

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
// setupGoogleOauth(app);
// setupFitbitOauth(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Static assets to be loaded
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
    const { toSend: { devmessage } } = err;
    if (process.env.NODE_ENV !== 'production') console.log(devmessage);
  
    // joi can send an object if only a single validation error, array if multiple validation errors
    // just set all joi errors to be arrays so we don't have to worry about it
    const body = Array.isArray(devmessage) ? devmessage : [devmessage];

    res.status(400).send(body);
  } else {
    res.status(err.commonType || err.status || 500).send(err.message);
  }
});
