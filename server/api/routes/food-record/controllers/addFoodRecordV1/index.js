const { connectDatabase, foreignKeys } = require('@kym/db');
const { dataSchema } = require('./validation');
const { FoodRecord, Meal, Abbrev, Weight } = connectDatabase();

/**
 * Add a food record
 * {@link http://localhost:3000/api-docs/#/food-record/postapi_food_record}
 */
const addFoodRecord = async ({ uuid, data }) => {
  await dataSchema.validate(data, { allowUnknown: true, abortEarly: false });
  const createRecordArray = data.map(function addRecord(item) {
    return FoodRecord.createWithMeal({
      instance: {
        [foreignKeys.ABBREV]: item.abbrevId,
        date: item.date,
        meal: item.meal,
        quantity: item.quantity,
        unit: item.unit,
        confirmed: item.confirmed,
        uuid,
      },
      Meal,
      Abbrev,
      Weight,
    });
  });

  // Create records
  const foods = await Promise.all(createRecordArray);

  return foods;
};

module.exports = addFoodRecord;
