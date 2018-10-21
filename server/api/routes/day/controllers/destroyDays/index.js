const { USER } = include('db/foreignKeys');
const { Day, sequelize } = include('db');
const assert = require('assert');

const { Op } = sequelize;

const destroyDays = async (uuid, date) => {
  assert(uuid, 'No uuid provided');
  assert(date && (Array.isArray(date)), 'date should be an array');

  await Day.destroy({
    where: {
      [USER]: uuid,
      date: {
        [Op.or]: date
      }
    }
  });

  return date;
};

module.exports = destroyDays;
