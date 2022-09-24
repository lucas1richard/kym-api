/* eslint consistent-return:0 */
global.base_dir = __dirname;
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));
require('dotenv').config();
const cluster = require('cluster');
const winston = include('utils/logger');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const app = require('./app');
const redisClient = require('./configure/redis-client');
const AppError = require('./configure/appError');

global.AppError = AppError;

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

if (cluster.isMaster) {
  winston.silly(`numWorkers: ${WORKERS}`);
  winston.info(`Master ${process.pid} is running`);

  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker/* , code, signal */) => {
    winston.info(`worker ${worker.process.pid} died`);
    winston.info('forking a new worker');
    cluster.fork();
  });
} else {
  winston.info(`Worker ${process.pid} started`);
  app.listen(port, host, async (err) => {
    if (err) {
      return logger.error(err.message);
    }

    await redisClient.connect();

    if (cluster.isMaster) {
      logger.appStarted(port, prettyHost);
    } else {
      winston.info(`Worker ${process.pid} listening on ${prettyHost}:${port}`);
    }
  });
}
