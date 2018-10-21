const redisClient = include('configure/redis-client');
const logger = include('utils/logger');

async function redisCounter(foodname) {
  const key = `food:search:${foodname}`;
  redisClient.incr(key);
  const numberTimesSearched = await redisClient.getAsync(key);
  logger.verbose(`"${foodname}" has been searched ${numberTimesSearched} times`);
}

module.exports = redisCounter;
