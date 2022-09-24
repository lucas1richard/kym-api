const Joi = require('joi');

const dataSchema = Joi.object().keys({
  quantity: Joi.number().required(),
  seq: Joi.number().required(),
  id: Joi.number().integer().required(),
});

module.exports = {
  dataSchema,
};
