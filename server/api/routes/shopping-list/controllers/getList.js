const { connectDatabase, Op, foreignKeys } = require('@kym/db');
const { FoodRecord } = connectDatabase();

const getList = async (req, res, next) => {
  try {
    const { date } = req.query;
    const { uuid } = res.locals;

    const currentDate = new Date(date);
    const laterDate = new Date(currentDate.getTime() + (86400000 * 6));

    const rawRecords = await FoodRecord.scope('withMacros').findAll({
      where: {
        date: {
          [Op.gte]: currentDate,
          [Op.lte]: laterDate
        },
        [foreignKeys.USER]: uuid
      },
    });

    const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

    res.json(records);
  } catch (err) {
    next(err);
  }
};

module.exports = getList;
