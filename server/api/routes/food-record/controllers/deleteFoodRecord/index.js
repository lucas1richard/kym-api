const { connectDatabase } = require('@kym/db');
const { bodySchema } = require('./validation');

const { Meal, FoodRecord } = connectDatabase();

/**
 * Delete a food record
 * {@link http://localhost:3000/api-docs/#/food-record/deleteapi_food_record}
 */
const deleteFoodRecord = async (body) => {
  try {
    await bodySchema.validate(body);

    const { ids } = body;

    const records = await Promise.all(ids.map((id) => {
      return FoodRecord.findById(id, { include: [Meal] });
    }));

    const [{ meal }] = records;

    await Promise.all(records.map((record) => {
      return record.destroy();
    }));

    const storedMeal = await Meal.findById(meal.id);
    storedMeal.public = false;

    await storedMeal.save();
  } catch (err) {
    throw err;
  }
};

module.exports = deleteFoodRecord;
