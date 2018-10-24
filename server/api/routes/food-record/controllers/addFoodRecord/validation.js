const Joi = require('joi');

const recordSchema = Joi.object().keys({
  abbrev_id: Joi.number().required(),
  date: Joi.string().required(),
  meal: Joi.number().required(),
  quantity: Joi.number().required(),
  unit: Joi.number().required(),
  confirmed: Joi.bool().optional()
});

const bodySchema = Joi.array().items(recordSchema);

module.exports = {
  recordSchema,
  bodySchema
};