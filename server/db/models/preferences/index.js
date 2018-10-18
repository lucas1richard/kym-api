/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const Preferences = sequelize.define('preferences', {
  preferences: Sequelize.JSON
}, {
});

module.exports = Preferences;
