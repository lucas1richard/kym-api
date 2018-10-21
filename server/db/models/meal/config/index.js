const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
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
    defaultValue: Sequelize.UUIDV4
  }
};

module.exports = {
  config
};
