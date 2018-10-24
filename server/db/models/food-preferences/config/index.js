const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
  preference: {
    type: Sequelize.ENUM,
    values: [
      'like',
      'dislike'
    ],
    allowNull: false
  }
};

module.exports = {
  config
};
