const { connectDatabase } = require('@kym/db');
const { FoodRecord } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');

const getFoodRecordsByDate = async (req, res, next) => {
  try {
    const rawRecords = await FoodRecord.scope('withMacros').findAll();
    const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

    res.json(records);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get all records');
    next(err);
  }
};

module.exports = getFoodRecordsByDate;
