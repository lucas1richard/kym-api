const Joi = require('joi');

const bodySchema = Joi.object().keys({
  id: Joi.number(),
  age: Joi.string().required(),
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date(),
  gender: Joi.string().valid(['MALE', 'FEMALE']),
  goal: Joi.string().valid(['Lose Fat', 'Maintain', 'Gain Muscle']),
  height: Joi.string().alphanum(),
  lifestyle: Joi.string().valid(['Normal', 'Active', 'Sedentary']),
  units: Joi.string().valid(['imperial', 'metric']),
  user_id: Joi.number().integer().required(),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required()
});

module.exports = {
  bodySchema
};
