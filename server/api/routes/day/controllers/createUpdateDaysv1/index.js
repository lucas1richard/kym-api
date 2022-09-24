const { connectDatabase, foreignKeys } = require('@kym/db');
const assert = require('assert');

const { USER } = foreignKeys;
const { Day } = connectDatabase();

const createUpdateDays = async ({ uuid, days }) => {
  assert(uuid, 'NO_UUID_PROVIDED');
  assert(days, 'NO_DAYS_PROVIDED');

  const data = await Promise.all(Object.entries(days).map(([date, dayType]) => Day.findOrCreate({
    where: {
      [USER]: uuid,
      date,
      dayType,
    },
    defaults: {
      dayType,
    },
  })));

  return data.map(([val, isNewRecord]) => ({
    data: val,
    isNewRecord,
  }));
};

module.exports = createUpdateDays;
