const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const Day = sequelize.define('day', {
  dayType: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

module.exports = Day;
