const router = require('express').Router();
const redisClient = require('../../../configure/redis-client');
const getFoodGroupsController = require('./controllers/getFoodGroups');

const key = 'food:groups:cache';

router.get('/', async function getFoodGroupsRoute(req, res, next) {
  try {
    if (redisClient.isConnected) {
      const cachedGroups = await redisClient.hGetAll(key);
      console.log({ cachedGroups });
      if (Object.keys(cachedGroups).length) return res.json(cachedGroups);
    }

    const groups = await getFoodGroupsController();

    const groupsObject = Object.fromEntries(
      groups.map((group) => [group.get('groupid'), group.get('description')]),
    );

    if (redisClient.isConnected) {
      await redisClient.hSet(key, groupsObject);
    }

    res.json(groupsObject);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
