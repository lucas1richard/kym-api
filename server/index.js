/* eslint consistent-return:0 */
console.time('start');
global.base_dir = __dirname;
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

// require('newrelic');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const winston = include('utils/logger');

winston.log('silly', `numCPUs: ${numCPUs}`);
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
// const setup = require('./middlewares/frontendMiddleware');

const isDev = process.env.NODE_ENV !== 'production';
const conn = require('./db/conn');
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
// const { resolve } = require('path');
const app = require('./app');

const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const env = process.env.NODE_ENV;
const option = env === 'test' ? { force: true } : undefined;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  conn.sync(option)
    .then(() => {
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    })

} else {
  // Start your app.
  console.log(`Worker ${process.pid} started`);
  // conn
  //   .sync(option)
  //   .then(() => {
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
      logger.appStarted(port, prettyHost, url);
    } else {
      logger.appStarted(port, prettyHost);
    }
  });
  console.timeEnd('start');
  // });
}

