const logger = require('./logger');

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'kym',
    host: 'localhost',
    dialect: 'postgres',
    logging: logger,
    operatorsAliases: false
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'kym_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: process.env.RDS_USERNAME || 'postgres',
    password: process.env.RDS_PASSWORD || null,
    database: process.env.RDS_DB_NAME || 'kym',
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: process.env.RDS_PORT || '5432',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false
  }
};
