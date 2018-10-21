const sequelize = require('../../conn');
const { config } = require('./config');
const { hooks } = require('./hooks');
const { findAllByUserId } = require('./classMethods/findAllByUserId');

const UserMeasurements = sequelize.define('userMeasurement', config, {
  hooks
});

UserMeasurements.findAllByUserId = findAllByUserId;

module.exports = UserMeasurements;
