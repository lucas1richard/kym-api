const Joi = require('joi');


const mealSchema = Joi.object().keys({
  protein: Joi.number().required(),
  carbs: Joi.number().required(),
  fat: Joi.number().required()
});

const typeSchema = Joi.array().items(mealSchema).required();

const bodySchema = Joi.object().keys({
  train: typeSchema,
  rest: typeSchema
});

module.exports = {
  mealSchema,
  typeSchema,
  bodySchema
};
