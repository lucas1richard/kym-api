/**
 * @fileOverview This is where all available api routes are defined, including
 * open vs protected routes. There is a redisClient used to save the user token
 * and id to allow caching to reduce unnecessary database pings to authenticate
 * a user.
 */

const logger = require('utils/logger');
const router = require('express').Router();
const nodepath = require('path');
const jwt = require('jwt-simple');
const chalk = require('chalk');
const { User } = require('../db');
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
      jwtSecret: process.env.SECRET || '1701-Flex-NY'
    };

    /**
     * If the route is open, move along
     */
    if (openRoutes.reduce((memo, route) => memo || req.path === route, false)) {
      next();
      return;
    }

    const { token } = req.headers;
    if (process.env.NODE_ENV !== 'test') {
      const user_id = await checkSecureRoute(token);
      Object.assign(res.locals, { user_id });
    } else {
      Object.assign(res.locals, { user_id: req.headers.user_id || 1 });
    }
    next();
  } catch (err) {
    logger.log(chalk.yellow(err.message));
    logger.log(err);
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
  console.log(`Worker ${process.pid} handling`);
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
  console.log(chalk.inverse('token', token));
  const key = `user:token:${token}`;
  const redisStored = await redisClient.hgetAllAsync(key);
  if (redisStored && redisStored.user_id) {
    return redisStored.user_id;
  }

  redisClient.expire(key, 86400); // expire in 24 hours
  if (!token || token === '[object Object]') {
    throw Error('You must have an account and be logged in');
  }

  const secret = process.env.SECRET || '1701-Flex-NY';
  const user_id = jwt.decode(token, secret).id || jwt.decode(token, secret).token;
  console.log(user_id);
  const user = await User.findById(user_id);

  if (!user) {
    throw Error('You must have an account and be logged in');
  }

  redisClient.hsetAsync(`user:token:${token}`, 'user_id', user_id);
  return user_id;
}

// curl 'http://localhost:3001/api/food/chicken' -H 'Pragma: no-cache' -H 'Origin: http://localhost:3000' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36' -H 'Accept: application/json, text/plain, */*' -H 'Cache-Control: no-cache' -H 'Referer: http://localhost:3000/dashboard' -H 'Connection: keep-alive' -H 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDZ9.rKsUmOtGUXXuCorUcE-qka8S1GwTQ1RCGSeCqxaoFjY' --compressed
