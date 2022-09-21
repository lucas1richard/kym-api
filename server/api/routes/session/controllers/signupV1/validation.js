const Joi = require('joi');

const userMeasurementsSchema = Joi.object().keys({
  gender: Joi.string().valid(['MALE', 'FEMALE']).required(),
  goal: Joi.string().valid(['LOSE_FAT', 'MAINTAIN', 'GAIN_MUSCLE']).required(),
  height: Joi.number().required(),
  date: Joi.date().required(),
  lifestyle: Joi.string().valid(['NORMAL', 'ACTIVE', 'SEDENTARY']).required(),
  units: Joi.string().valid(['IMPERIAL', 'METRIC']).required(),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
});

const bodySchema = Joi.object().keys({
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().regex(/^[a-zA-Z]+$/, 'letters only').required(),
  lastname: Joi.string().regex(/^[a-zA-Z]+$/, 'letters only').required(),
  password: Joi.string().required(),
  loggedIn: Joi.bool().required(),
  userMeasurements: Joi.any().optional(),
  preferredlocale: Joi.string().required(),
  // .pattern(/\.[a-z]{2}-[A-Z]{2}$/, { name: 'localeString' }).required(),
});

module.exports = {
  userMeasurementsSchema,
  bodySchema,
};
