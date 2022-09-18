const { connectDatabase } = require('@kym/db');
const { dateSchema, userIdSchema } = require('./validation');

const {
  Abbrev, AbbrevMicro, FoodRecord, Meal, Weight,
} = connectDatabase();

/**
 * {@link http://localhost:3000/api-docs/#/food-record/get_api_food_record__date_}
 */
const getFoodRecordsByDate = async ({ uuid, date }) => {
  await dateSchema.validate(date);
  await userIdSchema.validate(uuid);

  const rawRecords = await FoodRecord.findMicroByDate({
    Abbrev,
    AbbrevMicro,
    Meal,
    Weight,
    date,
    uuid,
  });

  const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

  return records;
};

module.exports = getFoodRecordsByDate;
