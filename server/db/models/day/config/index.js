const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
  dayType: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
};

module.exports = {
  config
};
