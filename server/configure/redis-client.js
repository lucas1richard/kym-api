const { createClient } = require('redis');

const redisClient = createClient();
redisClient.isConnected = false;

redisClient.on('error', () => {
  redisClient.isConnected = false;
});

redisClient.on('ready', () => {
  redisClient.isConnected = true;
});

module.exports = redisClient;
