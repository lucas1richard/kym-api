const Joi = require('joi');
const ValidationError = require('../../../../../configure/ValidationError');

const idsSchema = Joi.array().items(
  Joi.number().integer().required(),
).required().error(() => new ValidationError('IDS_REQUIRED'));

const bodySchema = Joi.object().keys({
  ids: idsSchema.required(),
  confirmed: Joi.bool().required(),
});

const confirmedSchema = Joi.bool().required().error(() => new ValidationError('CONFIRMED_IS_REQUIRED'));

module.exports = {
  idsSchema,
  bodySchema,
  confirmedSchema,
};
