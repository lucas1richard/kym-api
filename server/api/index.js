/**
 * @fileOverview This is where all available api routes are defined, including
 * open vs protected routes. There is a redisClient used to save the user token
 * and id to allow caching to reduce unnecessary database pings to authenticate
 * a user.
 */

const logger = include('utils/logger');
const router = require('express').Router();
const jwt = require('jwt-simple');
const chalk = require('chalk');
const { UserApi } = require('@kym/db');
const redisClient = require('../configure/redis-client');

// Routers
const calculateRouter = require('./routes/calculate');
const databaseRouter = require('./routes/database');
const dayRouter = require('./routes/day');
const favoritesRouter = require('./routes/favorites');
const fitbitRouter = require('./routes/fitbit');
const foodRouter = require('./routes/food');
const foodGroupsRouter = require('./routes/food-groups');
const foodmicroRouter = require('./routes/foodmicro');
const foodRecordRouter = require('./routes/food-record');
const generateRouter = require('./routes/generate');
const goalsRouter = require('./routes/goals');
const mealRouter = require('./routes/meal');
const programsRouter = require('./routes/programs');
const sessionRouter = require('./routes/session');
const shoppingListRouter = require('./routes/shopping-list');
const userRouter = require('./routes/user');
const userMeasurementsRouter = require('./routes/user-measurements');

router.use(function setJwtSecret(req, res, next) {
  res.locals = {
    jwtSecret: process.env.JWT_SECRET,
  };
  next();
});

// this route does not require a token check middleware
router.use('/session', sessionRouter);

router.use(async function authMiddleware(req, res, next) {
  try {
    const { token } = req.headers;
    const uuid = await checkSecureRoute(token);
    Object.assign(res.locals, { uuid });
    next();
  } catch (err) {
    logger.error(chalk.yellow(err.message));
    res.status(401).send(err.message);
  }
});

router.use((req, res, next) => {
  logger.silly(`Worker ${process.pid} handling`);
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      next();
    }, 600);
  } else {
    next();
  }
});

router.use('/user', userRouter);
router.use('/calculate', calculateRouter);
router.use('/database', databaseRouter);
router.use('/day', dayRouter);
router.use('/favorites', favoritesRouter);
router.use('/fitbit', fitbitRouter);
router.use('/food', foodRouter);
router.use('/food-groups', foodGroupsRouter);
router.use('/foodmicro', foodmicroRouter);
router.use('/food-record', foodRecordRouter);
router.use('/generate', generateRouter);
router.use('/goals', goalsRouter);
router.use('/meal', mealRouter);
router.use('/programs', programsRouter);
router.use('/shopping-list', shoppingListRouter);
router.use('/user-measurements', userMeasurementsRouter);

module.exports = router;

/**
 * If a valid token is provided, return the `user_id`, otherwise **throw an error**
 * @param {string} token jwt token
 * @param {string} path request path
 */
async function checkSecureRoute(token) {
  logger.verbose(`token: ${token}`);
  const key = `user:token:${token}`;
  logger.verbose(`redisClient.isConnected: ${redisClient.isConnected}`);
  if (redisClient.isConnected) {
    const redisStored = await redisClient.get(key);
    logger.verbose(`redisStored: ${JSON.stringify(redisStored)}`);
    if (redisStored) {
      redisClient.expire(key, 86400); // expire in 24 hours
      return redisStored;
    }
  }
  if (!token || token === '[object Object]') throw Error('NO_ACCOUNT_LOGGED_IN');

  const secret = process.env.JWT_SECRET;
  const uuid = jwt.decode(token, secret);

  logger.verbose(`decoded: ${JSON.stringify(uuid)}`);

  const user = await UserApi.findByUuid(uuid);

  if (!user) throw Error('NO_ACCOUNT_LOGGED_IN');

  if (redisClient.isConnected) await redisClient.set(key, uuid);

  return uuid;
}
