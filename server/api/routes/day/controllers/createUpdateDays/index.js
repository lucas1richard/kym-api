const { Day } = include('db');
const assert = require('assert');

const createUpdateDays = async (user_id, date) => {
  assert(user_id, 'No user_id provided');
  assert(date && typeof date === 'string', 'date should be a string');

  await Day.findOrCreate({
    where: {
      user_id,
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
