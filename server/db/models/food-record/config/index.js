const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
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
};

module.exports = {
  config
};
