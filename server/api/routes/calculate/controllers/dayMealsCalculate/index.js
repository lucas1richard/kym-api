const { connectDatabase } = require('@kym/db');
const { Abbrev, MealGoals } = connectDatabase();

const uuidv1 = require('uuid/v1');
const { bodySchema } = require('./validation');

const dayMealsCalculation = async (body, uuid) => {
  const { error } = bodySchema.validate(body, { allowUnknown: true, abortEarly: false });

  if (error) throw error;
  
  const output = await Abbrev.dayCalculation({ uuid, type: body.type, MealGoals });

  return {
    foods: output,
    type: body.type,
    isConfirmed: false,
    uuid: body.uuid || uuidv1()
  };
};

module.exports = dayMealsCalculation;
