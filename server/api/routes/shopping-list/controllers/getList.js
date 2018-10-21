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

    const records = await FoodRecord.findAll({
      where: {
        Date: {
          [Op.gte]: currentDate,
          [Op.lte]: laterDate
        },
        [USER]:uuid
      }
    });

    res.json(records.map((record) => {
      return record.calMacros();
    }));
  } catch (err) {
    next(err);
  }
};

module.exports = getList;
