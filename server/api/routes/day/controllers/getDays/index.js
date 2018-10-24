const { USER } = include('db/foreignKeys');
const { Day } = include('db');
const moment = require('moment');

async function getDays(uuid) {
  if (!uuid) {
    throw new Error('No uuid provided');
  }
  const days = await Day.findAll({
    where: {
      [USER]: uuid
    },
    order: [['date', 'DESC']],
    limit: 60
  });

  return days.reduce(daysReduce, {});
}

function daysReduce(memo, day) {
  const formattedDate = moment(day.date).format('YYYY-MM-DD');

  // eslint-disable-next-line no-param-reassign
  memo[formattedDate] = day.dayType;
  return memo;
}

module.exports = {
  getDays,
  daysReduce
};