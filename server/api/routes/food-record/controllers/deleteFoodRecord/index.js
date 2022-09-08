const { connectDatabase } = require('@kym/db');
const { USER } = require('@kym/db/dist/foreignKeys');
const { bodySchema } = require('./validation');

const { Meal, FoodRecord } = connectDatabase();

/**
 * Delete a food record
 * {@link http://localhost:3000/api-docs/#/food-record/deleteapi_food_record}
 */
const deleteFoodRecord = async (body, uuid) => {
  await bodySchema.validate(body);

  const { ids } = body;

  const records = await FoodRecord.findAll({ where: { id: ids, [USER]: uuid } });
  const mealIds = records.map((record) => record.meal_id);

  await FoodRecord.destroy({ where: { id: ids }});
  await Meal.update({ public: false }, { where: { id: mealIds } });

  return ids;
};

module.exports = deleteFoodRecord;
