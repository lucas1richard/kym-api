// const redisClient = include('configure/redis-client');

async function redisCounter(foodname) {
  // const key = `food:search:${foodname}`;
  // redisClient.incr(key);
  // const numberTimesSearched = await redisClient.getAsync(key);
  // console.log(`"${foodname}" has been searched ${numberTimesSearched} times`);
}

module.exports = redisCounter;
