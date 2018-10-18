const Sequelize = require('sequelize');
const chalk = require('chalk');
/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

const config = require('./config.js')[env];
/* istanbul ignore next */
if (config.use_env_variable) {
  module.exports = new Sequelize(process.env[config.use_env_variable]);
} else {
  // eslint-disable-next-line
  console.log(
    chalk.magenta('connecting to db'),
    chalk.bold.magenta(config.database)
  );
  module.exports = new Sequelize(config.database, config.username, config.password, config);
}

