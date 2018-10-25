const Sequelize = require('sequelize');
const chalk = require('chalk');

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

const config = require('./config.js')[env];

// eslint-disable-next-line
console.log(
  chalk.magenta('connecting to db'),
  chalk.bold.magenta(config.url)
);
module.exports = new Sequelize(
  config.url,
  config
);

