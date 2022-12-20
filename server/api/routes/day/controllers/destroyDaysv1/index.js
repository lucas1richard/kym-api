const { DayApi } = require('@kym/db');
const assert = require('assert');

const destroyDays = async (uuid, date) => {
  assert(uuid, 'NO_UUID_PROVIDED');
  assert(date && (Array.isArray(date)), 'DATE_SHOULD_BE_ARRAY');

  await DayApi.destroyDays({ uuid, date });

  return date;
};

module.exports = destroyDays;
