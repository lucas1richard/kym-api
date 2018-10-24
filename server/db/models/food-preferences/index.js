const sequelize = require('../../conn');
const { config } = require('./config');
const { USER, ABBREV } = require('../../foreignKeys');

const FoodPreferences = sequelize.define('foodPreference', config, {
  indexes: [
    {
      unique: true,
      fields: [USER, ABBREV]
    }
  ]
});

module.exports = FoodPreferences;
