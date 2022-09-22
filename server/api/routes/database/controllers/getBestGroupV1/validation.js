const Joi = require('joi');

const foodSchema = Joi.array().items(Joi.string().required()).required();

const querySchema = Joi.object().keys({
  food: foodSchema,
});

module.exports = {
  querySchema,
  foodSchema,
};
