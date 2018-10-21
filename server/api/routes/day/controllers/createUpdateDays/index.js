const { USER } = include('db/foreignKeys');
const { Day } = include('db');
const assert = require('assert');

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
