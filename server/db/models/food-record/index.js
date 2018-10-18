const sequelize = require('../../conn');
const Abbrev = require('../abbrev');

const { Sequelize } = sequelize;

const { calMacros, updateQuantity } = require('./instanceMethods');
const {
  createWithMeal,
  findByDate,
  findMicroByDate,
  makeHistoricalArray
} = require('./classMethods');

const FoodRecord = sequelize.define('foodRecord', {
  Date: {
    type: Sequelize.DATEONLY,
  },
  Meal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  Quantity: {
    type: Sequelize.DECIMAL,
  },
  Unit: {
    type: Sequelize.INTEGER
  },
  fromProgram: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  defaultScope: {
    include: [
      Abbrev,
    ]
  },
  scopes: {
    micro: {
      include: [
        Abbrev.scope('micro', 'weight')
      ]
    },
    description: {
      include: [
        Abbrev.scope('all')
      ]
    },
  }
});

FoodRecord.createWithMeal = createWithMeal;
FoodRecord.findByDate = findByDate;
FoodRecord.findMicroByDate = findMicroByDate;
FoodRecord.makeHistoricalArray = makeHistoricalArray;

FoodRecord.prototype.calMacros = calMacros;
FoodRecord.prototype.updateQuantity = updateQuantity;

module.exports = FoodRecord;
