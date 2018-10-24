const { USER } = include('db/foreignKeys');
const sequelize = require('../../../conn');
const { Sequelize } = sequelize;

const macroType = () => ({
  type: Sequelize.DECIMAL,
  allowNull: false,
  validate: {
    min: 0
  }
});

const titleType = () => ({
  type: Sequelize.TEXT,
  allowNull: false
});

const config = {
  Main: titleType(),
  Sub: titleType(),
  Calories: macroType(),
  Protein: macroType(),
  Fat: macroType(),
  Carbohydrates: macroType(),
  GmWt_1: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc1: {
    type: Sequelize.STRING
  },
  GmWt_2: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc2: {
    type: Sequelize.STRING
  },
  [USER]: {
    type: Sequelize.UUID
  },
  photo: {
    type: Sequelize.STRING
  },
};

module.exports = {
  config,
  macroType,
  titleType
};
