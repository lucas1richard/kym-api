const { connectDatabase, foreignKeys } = require('@kym/db');
const assert = require('assert');

const { USER } = foreignKeys;
const { Day } = connectDatabase();

const createUpdateDays = async (uuid, date) => {
  assert(uuid, 'No uuid provided');
  assert(date && typeof date === 'string', 'date should be a string');

  await Day.findOrCreate({
    where: {
      [USER]: uuid,
      date
    },
    defaults: {
      dayType: true
    }
  });

  return {
    [date]: true
  };
};

module.exports = createUpdateDays;
