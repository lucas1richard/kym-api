const { Day } = include('db');
const moment = require('moment');

async function getDays(user_id) {
  if (!user_id) {
    throw new Error('No user_id provided');
  }
  const days = await Day.findAll({
    where: {
      user_id
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
