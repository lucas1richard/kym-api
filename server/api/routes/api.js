/**
 * @fileOverview This is where all available api routes are defined, including
 * open vs protected routes. There is a redisClient used to save the user token
 * and id to allow caching to reduce unnecessary database pings to authenticate
 * a user.
 */

const router = require('express').Router();
const nodepath = require('path');
const jwt = require('jwt-simple');
const { User } = require('../../db');
// const redisClient = require('../../configure/redis-client');

// Routers
const calculateRouter = require('./calculate');
const databaseRouter = require('./database');
const dayRouter = require('./day');
const favoritesRouter = require('./favorites');
const fitbitRouter = require('./fitbit');
const foodRouter = require('./food');
const foodGroupsRouter = require('./food-groups');
const foodmicroRouter = require('./foodmicro');
const foodRecordRouter = require('./food-record');
const generateRouter = require('./generate');
const goalsRouter = require('./goals');
const mealRouter = require('./meal');
const mealGoalsRouter = require('./meal-goals');
const programsRouter = require('./programs');
const sessionRouter = require('./session');
const shoppingListRouter = require('./shopping-list');
const userRouter = require('./user');
const userMeasurementsRouter = require('./user-measurements');

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
      // const key = `user:token:${token}`;
      // const redisStored = await redisClient.hgetAllAsync(key);
      // redisClient.expire(key, 86400); // expire in 24 hours

      // let user_id;
      // if (redisStored && redisStored.user_id) {
      //   user_id = redisStored.user_id; // eslint-disable-line
      // } else {
      const user_id = await checkSecureRoute(token);
      // }
      Object.assign(res.locals, { user_id });
    } else {
      // For testing, always use user_id 1
      Object.assign(res.locals, { user_id: req.headers.user_id || 1 });
    }
    next();
  } catch (err) {
    console.log(err.message);
    console.log(err);
    if (req.method === 'GET') {
      res.sendFile(nodepath.join(__dirname, '..', '..', 'public', 'unauthorized.html'));
    } else {
      res.status(401).send(err.message);
    }
  }
});

// securedRoutes.forEach(pth => router.use(`/${pth}`, require(`./${pth}`))); // eslint-disable-line
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
router.use('/user', userRouter);
router.use('/user-measurements', userMeasurementsRouter);


module.exports = router;

/**
 * If a valid token is provided, return the `user_id`, otherwise **throw an error**
 * @param {string} token jwt token
 * @param {string} path request path
 */
async function checkSecureRoute(token) {
  if (!token || token === '[object Object]') {
    throw Error('You must have an account and be logged in');
  }

  const secret = process.env.SECRET || '1701-Flex-NY';
  const user_id = jwt.decode(token, secret).id || jwt.decode(token, secret).token;
  const user = await User.findById(user_id);

  if (!user) {
    throw Error('You must have an account and be logged in');
  }

  // redisClient.hsetAsync(`user:token:${token}`, 'user_id', user_id);
  return user_id;
}
