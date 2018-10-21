const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const decimalType = () => ({
  type: Sequelize.DECIMAL
});

const stringType = () => ({
  type: Sequelize.STRING
});

const textType = () => ({
  type: Sequelize.TEXT
});

const config = {
  Long_Desc: textType(),
  Short_Desc: stringType(),
  ComName: stringType(),
  ManufacName: stringType(),
  Survey: stringType(),
  Ref_desc: stringType(),
  Refuse: {
    type: Sequelize.INTEGER
  },
  SciName: textType(),
  N_Factor: decimalType(),
  Pro_Factor: decimalType(),
  Fat_Factor: decimalType(),
  CHO_Factor: decimalType()
};

module.exports = {
  config,
  decimalType,
  stringType,
  textType
};
