/* eslint consistent-return:0 */
global.base_dir = __dirname;
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

// require('newrelic');
require('dotenv').config();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
// const email = require('./utils/email');
const winston = include('utils/logger');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const conn = require('./db/conn');
const app = require('./app');


// const setup = require('./middlewares/frontendMiddleware');

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const env = process.env.NODE_ENV;
const option = env === 'test' ? { force: true } : { logging: false };

if (cluster.isMaster) {
  // email.sendWithTemplate('welcome', { name: 'Richard' }, {
  //   content: {
  //     from: `testing@${process.env.SPARKPOST_SANDBOX_DOMAIN}`,
  //     subject: 'Welcome!',
  //   },
  //   recipients: [
  //     { address: 'lucas1richard@gmail.com' }
  //   ]
  // });
  winston.silly(`numCPUs: ${numCPUs}`);
  winston.info(`Master ${process.pid} is running`);

  conn.sync(option)
    .then(() => {
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker/* , code, signal */) => {
        winston.info(`worker ${worker.process.pid} died`);
      });
    });
} else {
  winston.info(`Worker ${process.pid} started`);
  // conn.sync().then(({ logging: false }) => {
  app.listen(port, host, async (err) => {
    if (err) {
      return logger.error(err.message);
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      let url;
      try {
        url = await ngrok.connect(port);
      } catch (e) {
        return logger.error(e);
      }
      if (cluster.isMaster) {
        logger.appStarted(port, prettyHost, url);
      } else {
        winston.info(`Worker ${process.pid} listening on ${prettyHost}`);
      }
    } else {
      if (cluster.isMaster) {
        logger.appStarted(port, prettyHost);
      } else {
        winston.info(`Worker ${process.pid} listening on ${prettyHost}:${port}`);
      }
    }
  });
  // });
}

