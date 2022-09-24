const { connectDatabase } = require('@kym/db');
const { Abbrev, MealGoals } = connectDatabase();

const dayMealsCalculationV1 = async (body, uuid) => {
  const output = await Abbrev.dayCalculation({ uuid, type: body.type, MealGoals });

  return {
    foods: output,
    type: body.type,
    isConfirmed: false,
    uuid,
  };
};

module.exports = dayMealsCalculationV1;
