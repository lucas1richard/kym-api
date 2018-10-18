const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const FoodGroup = sequelize.define('foodGroup', {
  GroupID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Description: {
    type: Sequelize.STRING
  }
});

module.exports = FoodGroup;
