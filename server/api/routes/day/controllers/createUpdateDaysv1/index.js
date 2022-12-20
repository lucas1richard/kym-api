const { DayApi } = require('@kym/db');
const assert = require('assert');

const createUpdateDays = async ({ uuid, days }) => {
  assert(uuid, 'NO_UUID_PROVIDED');
  assert(days, 'NO_DAYS_PROVIDED');

  return DayApi.createUpdateDays({ uuid, days });
};

module.exports = createUpdateDays;
