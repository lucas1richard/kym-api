const sequelize = require('../../conn');
const makeProgramObject = require('./classMethods/makeProgramObject');

const { Sequelize } = sequelize;

const Program = sequelize.define('program', {
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

}, {
  classMethods: {
    makeProgramObject
  }
});

Program.makeProgramObject = makeProgramObject;

module.exports = Program;

