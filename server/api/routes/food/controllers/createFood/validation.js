const Joi = require('joi');

const numberLikeString = () => Joi.string().regex(/^[0-9]\d*(\.\d+)?$/).required();

const bodySchema = Joi.object().keys({
  calories: numberLikeString(),
  carbohydrates: numberLikeString(),
  protein: numberLikeString(),
  fat: numberLikeString(),
  group: Joi.string().regex(/^\d+$/).required(),
  main: Joi.string().required(),
  sub: Joi.string().required(),
  servingDescription: Joi.string().required(),
  servingSize: numberLikeString(),
  servingWeight: numberLikeString()
});

module.exports = {
  bodySchema
};
