const { connectDatabase } = require('@kym/db');
const { Abbrev, MealGoals } = connectDatabase();

const { v1: uuidv1 } = require('uuid');

const dayMealsCalculationV1 = async (body, uuid) => {
  const output = await Abbrev.dayCalculation({ uuid, type: body.type, MealGoals });

  return {
    foods: output,
    type: body.type,
    isConfirmed: false,
    uuid: uuid || uuidv1(),
  };
};

module.exports = dayMealsCalculationV1;
