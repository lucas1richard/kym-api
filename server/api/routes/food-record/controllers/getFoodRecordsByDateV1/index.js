const { connectDatabase } = require('@kym/db');
const { dateSchema, userIdSchema } = require('./validation');

const { FoodRecord, Meal } = connectDatabase();

/**
 * {@link http://localhost:3000/api-docs/#/food-record/get_api_food_record__date_}
 */
const getFoodRecordsByDateV1 = async ({ date, uuid } = {}) => {
  await dateSchema.validate(date);
  await userIdSchema.validate(uuid);

  const rawRecords = await FoodRecord.scope('withMacros').findByDate({
    date,
    uuid,
    Meal,
  });

  const records = await Promise.all(rawRecords.map((record) => record.calMacros()));

  return records;
};

module.exports = getFoodRecordsByDateV1;
