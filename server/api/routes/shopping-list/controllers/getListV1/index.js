const Joi = require('joi');
const { connectDatabase, Op, foreignKeys } = require('@kym/db');
const moment = require('moment');
const { FoodRecord } = connectDatabase();

const getListV1 = async ({ date, numDays = 6, uuid } = {}) => {
  await Joi.string().required().error(() => 'UUID_REQUIRED').validate(uuid);

  const currentDate = moment(date).format('YYYY-MM-DD');
  const laterDate = moment(date).add(numDays, 'days').format('YYYY-MM-DD');

  const rawRecords = await FoodRecord.scope('withMacros').findAll({
    where: {
      date: {
        [Op.gte]: currentDate,
        [Op.lte]: laterDate,
      },
      [foreignKeys.USER]: uuid,
    },
  });

  const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

  return records;
};

module.exports = getListV1;
