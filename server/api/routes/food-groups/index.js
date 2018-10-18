const redisClient = include('configure/redis-client');
const router = require('express').Router();
const getFoodGroupsController = require('./controllers/getFoodGroups');

const key = 'food:groups:cache';

router.get('/', async function getFoodGroupsRoute(req, res, next) {
  try {
    const cachedGroups = await redisClient.hgetAllAsync(key);

    if (cachedGroups) {
      res.json(cachedGroups);
      return;
    }

    const groups = await getFoodGroupsController();

    redisClient.hmset(key, groups.reduce(groupsReduce, {}));

    res.json(groups);
  } catch (err) {
    next(err);
  }
});

function groupsReduce(memo, groupObj) {
  // eslint-disable-next-line no-param-reassign
  memo[groupObj.GroupID] = groupObj.Description;
  return memo;
}

module.exports = router;
