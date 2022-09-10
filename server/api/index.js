/**
 * @fileOverview This is where all available api routes are defined, including
 * open vs protected routes. There is a redisClient used to save the user token
 * and id to allow caching to reduce unnecessary database pings to authenticate
 * a user.
 */

const logger = include('utils/logger');
const router = require('express').Router();
const nodepath = require('path');
const jwt = require('jwt-simple');
const chalk = require('chalk');
const { connectDatabase } = require('@kym/db');
const redisClient = require('../configure/redis-client');

const { User } = connectDatabase();

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
const mealGoalsRouter = require('./routes/meal-goals');
const programsRouter = require('./routes/programs');
const sessionRouter = require('./routes/session');
const shoppingListRouter = require('./routes/shopping-list');
const userRouter = require('./routes/user');
const userMeasurementsRouter = require('./routes/user-measurements');

/**
 * These routes do not require a token
 */
const openRoutes = [
  '/user/signup',
  '/session'
];

router.use(async function authMiddleware(req, res, next) {
  try {
    res.locals = {
      jwtSecret: process.env.JWT_SECRET
    };

    /**
     * If the route is open, move along
     */
    if (openRoutes.includes(req.path)) {
      next();
      return;
    }

    const { token } = req.headers;
    if (process.env.NODE_ENV !== 'test') {
      const { user_id, uuid } = await checkSecureRoute(token);
      Object.assign(res.locals, { user_id, uuid });
    } else {
      Object.assign(res.locals, { user_id: req.headers.user_id || 1 });
    }
    next();
  } catch (err) {
    logger.error(chalk.yellow(err.message));
    if (req.method === 'GET') {
      res.sendFile(
        nodepath.join(
          __dirname, '..', 'public', 'unauthorized.html'
        )
      );
    } else {
      res.status(401).send(err.message);
    }
  }
});

router.use((req, res, next) => {
  logger.silly(`Worker ${process.pid} handling`);
  next();
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
router.use('/meal-goals', mealGoalsRouter);
router.use('/programs', programsRouter);
router.use('/session', sessionRouter);
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
  const redisStored = await redisClient.hgetAllAsync(key);
  logger.verbose(`redisStored: ${JSON.stringify(redisStored)}`);
  if (redisStored && redisStored.user_id) {
    return redisStored;
  }

  redisClient.expire(key, 86400); // expire in 24 hours
  if (!token || token === '[object Object]') {
    throw Error('NO_ACCOUNT_LOGGED_IN');
  }

  const secret = process.env.JWT_SECRET;
  const decoded = jwt.decode(token, secret);

  logger.verbose(`decoded: ${JSON.stringify(decoded)}`);

  const user_id = decoded.id || decoded.token;
  const { uuid } = decoded;
  const user = await User.findByPk(uuid);

  if (!user) {
    throw Error('NO_ACCOUNT_LOGGED_IN');
  }

  redisClient.hmsetAsync(key, { user_id, uuid });
  return decoded;
}
