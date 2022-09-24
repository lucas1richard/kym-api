const { connectDatabase, foreignKeys, Op } = require('@kym/db');
const assert = require('assert');

const { USER } = foreignKeys;
const { Day } = connectDatabase();

const destroyDays = async (uuid, date) => {
  assert(uuid, 'NO_UUID_PROVIDED');
  assert(date && (Array.isArray(date)), 'DATE_SHOULD_BE_ARRAY');

  await Day.destroy({
    where: {
      [USER]: uuid,
      date: {
        [Op.or]: date,
      },
    },
  });

  return date;
};

module.exports = destroyDays;
