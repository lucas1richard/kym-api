const { FoodRecord } = include('db');
const { handleRouteError } = include('utils/handleRouteError');

const getFoodRecordsByDate = async (req, res, next) => {
  try {
    const records = await FoodRecord.findAll();

    res.json(records.map((record) => record.calMacros()));
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get all records');
    next(err);
  }
};

module.exports = getFoodRecordsByDate;
