const { Day, sequelize } = include('db');
const assert = require('assert');

const { Op } = sequelize;

const destroyDays = async (user_id, date) => {
  assert(user_id, 'No user_id provided');
  assert(date && (Array.isArray(date)), 'date should be an array');

  await Day.destroy({
    where: {
      user_id,
      date: {
        [Op.or]: date
      }
    }
  });

  return date;
};

module.exports = destroyDays;
