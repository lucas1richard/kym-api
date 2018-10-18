const redis = require('redis');
const { promisify } = require('util');

function safeFunction(func) {
  if (process.env.NODE_ENV !== 'test') {
    return func;
  }
  return func;
}

const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(safeFunction(client.get)).bind(client);
const hgetAsync = promisify(safeFunction(client.hget)).bind(client);
const hsetAsync = promisify(safeFunction(client.hset)).bind(client);
const hgetAllAsync = promisify(safeFunction(client.hgetall)).bind(client);

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

client.getAsync = getAsync;
client.hgetAsync = hgetAsync;
client.hsetAsync = hsetAsync;
client.hgetAllAsync = hgetAllAsync;

module.exports = client;
