const Joi = require('joi');
const { USER, USER_VALIDATION } = include('db/foreignKeys');

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
  [USER]: USER_VALIDATION,
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required()
});

module.exports = {
  bodySchema
};
