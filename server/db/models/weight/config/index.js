const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const config = {
  Seq: {
    type: Sequelize.INTEGER
  },
  Amount: {
    type: Sequelize.DECIMAL
  },
  Description: {
    type: Sequelize.STRING
  },
  Gr_Wgt: {
    type: Sequelize.DECIMAL
  }
};

module.exports = {
  config
};
