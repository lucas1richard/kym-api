const router = require('express').Router();
const redisClient = require('../../../configure/redis-client');
const getFoodGroupsControllerV1 = require('./controllers/getFoodGroupsV1');

const key = 'food:groups:cache';

router.get('/v1', async function getFoodGroupsRoute(req, res, next) {
  /* istanbul ignore next */
  if (redisClient.isConnected) {
    const cachedGroups = await redisClient.hGetAll(key);
    if (Object.keys(cachedGroups).length) return res.json(cachedGroups);
  }

  const groups = await getFoodGroupsControllerV1();

  const groupsObject = Object.fromEntries(
    groups.map((group) => [group.get('groupid'), group.get('description')]),
  );

  /* istanbul ignore next */
  if (redisClient.isConnected) {
    await redisClient.hSet(key, groupsObject);
  }

  res.json(groupsObject);
});

module.exports = router;
