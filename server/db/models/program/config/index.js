const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
  startWeight: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  endGoal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  endWeight: {
    type: Sequelize.DECIMAL
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['In Progress', 'Compete'],
    allowNull: false,
    defaultValue: 'In Progress'
  },
  result: {
    type: Sequelize.ENUM,
    values: ['TBD', 'Success', 'Failure'],
    allowNull: false
  },

};

module.exports = {
  config
};
