const { connectDatabase, foreignKeys } = require('@kym/db');

const { USER } = foreignKeys;
const { Day } = connectDatabase();

async function getDays(uuid) {
  if (!uuid) throw new Error('NO_UUID_PROVIDED');

  const days = await Day.findAll({
    where: {
      [USER]: uuid,
    },
    order: [['date', 'DESC']],
    limit: 60,
  });

  return Object.fromEntries(
    days.map(({ date, dayType }) => [date, dayType]),
  );
}

module.exports = getDays;
