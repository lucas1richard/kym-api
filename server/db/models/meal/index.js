const uuidV1 = require('uuid/v1');
const sequelize = require('../../conn');
const FoodRecord = require('../food-record');
const findByDate = require('./classMethods/findByDate');

const { Sequelize } = sequelize;

const Meal = sequelize.define('meal', {
  date: {
    type: Sequelize.DATEONLY
  },
  meal: {
    type: Sequelize.INTEGER
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  postWorkout: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue() {
      return uuidV1();
    }
  }
}, {
  scopes: {
    records: {
      include: [FoodRecord]
    }
  }
});

Meal.findByDate = findByDate;

module.exports = Meal;
