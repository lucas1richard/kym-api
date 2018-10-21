const Joi = require('joi');
const { USER, USER_VALIDATION } = include('db/foreignKeys');

const bodySchema = Joi.object().keys({
  age: Joi.string().required(),
  // birthdate: birthdateSchema,
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date().optional(),
  gender: Joi.string().valid(['MALE', 'FEMALE']),
  goal: Joi.string().valid(['Lose Fat', 'Maintain', 'Build Muscle']),
  height: Joi.string().alphanum(),
  lifestyle: Joi.string().valid(['Normal', 'Active', 'Sedentary']),
  units: Joi.string().valid(['imperial', 'metric']),
  updatedAt: Joi.date().required(),
  [USER]: USER_VALIDATION,
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required()
});

module.exports = {
  bodySchema
};
