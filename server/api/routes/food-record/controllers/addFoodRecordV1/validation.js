const Joi = require('joi');

const recordSchema = Joi.object().keys({
  abbrevId: Joi.number().required(),
  date: Joi.string().required(),
  meal: Joi.number().required(),
  quantity: Joi.number().required(),
  unit: Joi.number().required(),
  confirmed: Joi.bool().optional(),
});

const dataSchema = Joi.array().items(recordSchema);

module.exports = {
  recordSchema,
  dataSchema,
};
