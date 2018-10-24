const { USER } = include('db/foreignKeys');
const {
  FoodRecord,
  sequelize
} = include('db');

const { Op } = sequelize;

const getList = async (req, res, next) => {
  try {
    const { date } = req.query;
    const { uuid } = res.locals;

    const currentDate = new Date(date);
    const laterDate = new Date(currentDate.getTime() + (86400000 * 6));

    const rawRecords = await FoodRecord.findAll({
      where: {
        Date: {
          [Op.gte]: currentDate,
          [Op.lte]: laterDate
        },
        [USER]:uuid
      }
    });

    const records = await Promise.all(rawRecords.map((record) => {
      return record.calMacros();
    }));

    res.json(records);
  } catch (err) {
    next(err);
  }
};

module.exports = getList;
