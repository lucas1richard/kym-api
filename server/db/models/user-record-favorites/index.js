const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const RecordFavorite = sequelize.define('recordFavorite', {
  meal: {
    type: Sequelize.INTEGER
  }
});

module.exports = RecordFavorite;
