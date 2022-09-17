const redisClient = include('configure/redis-client');
const logger = include('utils/logger');

async function redisCounter(foodname) {
  const key = `food:search:${foodname}`;
  /* istanbul ignore next */
  if (redisClient.isConnected) {
    await redisClient.incr(key);
    const numberTimesSearched = await redisClient.get(key);
    logger.verbose(`"${foodname}" has been searched ${numberTimesSearched} times`);
  }
}

module.exports = redisCounter;
