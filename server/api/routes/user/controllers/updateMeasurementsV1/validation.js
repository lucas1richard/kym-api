const Joi = require('joi');

const bodySchema = Joi.object().keys({
  id: Joi.number(),
  age: Joi.string().required(),
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date(),
  gender: Joi.string().valid(['MALE', 'FEMALE']),
  goal: Joi.string().valid(['LOSE_FAT', 'MAINTAIN', 'GAIN_MUSCLE']),
  height: Joi.string().alphanum(),
  lifestyle: Joi.string().valid(['NORMAL', 'ACTIVE', 'SEDENTARY']),
  units: Joi.string().valid(['IMPERIAL', 'METRIC']),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
});

module.exports = {
  bodySchema,
};
