const Joi = require('joi');

const mealSchema = Joi.object().keys({
  protein: Joi.number().required(),
  carbs: Joi.number().required(),
  fat: Joi.number().required(),
});

const typeSchema = Joi.array().length(6).items(mealSchema).required();

const bodySchema = Joi.object().keys({
  TRAIN: typeSchema,
  REST: typeSchema,
});

module.exports = {
  mealSchema,
  typeSchema,
  bodySchema,
};
