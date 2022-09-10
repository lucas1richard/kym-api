const { connectDatabase, foreignKeys } = require('@kym/db');
const { USER } = foreignKeys;
const {
  Day,
  Op,
} = connectDatabase();
const assert = require('assert');
const moment = require('moment');

const noUserId = 'No uuid provided';

class DayModel {
  validateCreateUpdateDays(uuid, date) {
    assert(uuid, noUserId);
    assert(date && typeof date === 'string', 'date should be a string');
  }

  async createUpdateDays(uuid, date) {
    this.validateCreateUpdateDays(uuid, date);
    await Day.findOrCreate({
      where: {
        [USER]: uuid,
        date,
      },
      defaults: {
        dayType: true,
      },
    });

    return {
      [date]: true,
    };
  }

  validateDestroyDays(uuid, date) {
    assert(uuid, noUserId);
    assert(date && (Array.isArray(date)), 'Date should be an array');
  }

  async destroyDays(uuid, date) {
    this.validateDestroyDays(uuid, date);
    await Day.destroy({
      where: {
        [USER]: uuid,
        date: {
          [Op.or]: date,
        },
      },
    });
    return {
      status: 'OK',
    };
  }

  validateGetDays(uuid) {
    if (!uuid) {
      throw new Error(noUserId);
    }
  }

  async getDays(uuid) {
    this.validateGetDays(uuid);
    const days = await Day.findAll({
      where: {
        [USER]: uuid,
      },
      order: [['date', 'DESC']],
      limit: 60,
    });

    return days.reduce(daysReduce, {});
  }
}

module.exports = DayModel;

function daysReduce(memo, day) {
  const formattedDate = moment(day.date).format('YYYY-MM-DD');

  // eslint-disable-next-line no-param-reassign
  memo[formattedDate] = day.dayType;
  return memo;
}
