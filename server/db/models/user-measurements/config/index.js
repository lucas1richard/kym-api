const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
  age: {
    type: Sequelize.DECIMAL
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  height: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  units: {
    type: Sequelize.ENUM,
    values: ['imperial', 'metric'],
    allowNull: false
  },
  weight: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  bodyfat: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  lifestyle: {
    type: Sequelize.ENUM,
    values: ['Sedentary', 'Normal', 'Active'],
    allowNull: false
  },
  goal: {
    type: Sequelize.ENUM,
    values: ['Lose Fat', 'Gain Muscle', 'Maintain'],
  },
  date: {
    type: Sequelize.DATE,
  },
  bmrTraditional: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bmrBodyFat: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
};

module.exports = {
  config
}
