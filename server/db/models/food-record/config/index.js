const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const foodRecordKeys = {
  DATE: 'Date',
  MEAL: 'Meal',
  QUANTITY: 'Quantity',
  UNIT: 'Unit',
  FROM_PROGRAM: 'fromProgram',
  CONFIRMED: 'confirmed',
};

const config = {
  [foodRecordKeys.DATE]: {
    type: Sequelize.DATEONLY,
  },
  [foodRecordKeys.MEAL]: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  [foodRecordKeys.QUANTITY]: {
    type: Sequelize.DECIMAL,
  },
  [foodRecordKeys.UNIT]: {
    type: Sequelize.INTEGER
  },
  [foodRecordKeys.FROM_PROGRAM]: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  [foodRecordKeys.CONFIRMED]: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
};

module.exports = {
  config,
  foodRecordKeys
};
