const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const stringType = () => ({
  type: Sequelize.STRING,
});

const config = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstname: stringType(),
  lastname: stringType(),
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true
    },
    unique: {
      args: true,
      msg: 'This email is already taken'
    }
  },
  password: stringType(),
  birthdate: {
    type: Sequelize.DATEONLY
  },
  googleId: stringType(),
  fitbitId: stringType(),
  fitbitToken: stringType(),
  fitbitRefreshToken: stringType()
};

module.exports = {
  config,
  stringType
};
