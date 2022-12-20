const { DayApi } = require('@kym/db');

async function getDays(uuid) {
  if (!uuid) throw new Error('NO_UUID_PROVIDED');

  const days = await DayApi.findAllForUser({ uuid });

  return Object.fromEntries(
    days.map(({ date, dayType }) => [date, dayType]),
  );
}

module.exports = getDays;
