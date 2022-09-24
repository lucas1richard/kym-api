const Joi = require('joi');
const ValidationError = include('configure/ValidationError');

const bodySchema = Joi.object().keys({
  age: Joi.string().required().error(() => new ValidationError('AGE_NOT_PROVIDED')),
  gender: Joi.string().valid(['MALE', 'FEMALE']).required(),
  goal: Joi.string().valid(['LOSE_FAT', 'MAINTAIN', 'GAIN_MUSCLE']).required(),
  height: Joi.string().alphanum().required(),
  lifestyle: Joi.string().valid(['NORMAL', 'ACTIVE', 'SEDENTARY']).required(),
  units: Joi.string().valid(['IMPERIAL', 'METRIC']).required(),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
  // birthdate: birthdateSchema,
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number().optional(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date().optional(),
  // updatedAt: Joi.date().optional(),
  // createdAt: Joi.date().optional(),
});

module.exports = {
  bodySchema,
};
