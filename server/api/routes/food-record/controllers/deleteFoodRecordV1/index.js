const Joi = require('joi');
const { connectDatabase, /* Sequelize, */ foreignKeys } = require('@kym/db');

const { /* Meal, */ FoodRecord } = connectDatabase();

/**
 * Delete food records
 * {@link http://localhost:3000/api-docs/#/food-record/deleteapi_food_record}
 */
const deleteFoodRecord = async ({ ids, uuid }) => {
  await Joi.array().items(Joi.number().integer().required()).required().validate(ids);

  // const records = await FoodRecord.findAll({
  //   attributes: [
  //     [Sequelize.fn('DISTINCT', Sequelize.col('meal_id')), 'meal_id'],
  //   ],
  //   where: { id: ids, [foreignKeys.USER]: uuid },
  // });
  // const mealIds = records.map((record) => record.meal_id).filter(Boolean);

  await FoodRecord.destroy({ where: { id: ids, [foreignKeys.USER]: uuid } });
  // if (mealIds.length > 0) { // support legacy data
  //   await Meal.update({ public: false }, { where: { id: mealIds } });
  // }

  return ids;
};

module.exports = deleteFoodRecord;
