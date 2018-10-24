const { FoodRecord } = include('db');
const { handleRouteError } = include('utils/handleRouteError');

const getFoodRecordsByDate = async (req, res, next) => {
  try {
    const rawRecords = await FoodRecord.findAll();

    const records = await Promise.all(rawRecords.map(function makeWithMacros(record) {
      return record.calMacros();
    }));
    
    res.json(records);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get all records');
    next(err);
  }
};

module.exports = getFoodRecordsByDate;
