const { connectDatabase } = require('@kym/db');
const { FoodRecord } = connectDatabase();

const getFoodRecordsByDate = async () => {
  const rawRecords = await FoodRecord.scope('withMacros').findAll();
  const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

  return records;
};

module.exports = getFoodRecordsByDate;
