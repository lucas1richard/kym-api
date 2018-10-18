const Joi = require('joi');

const bodySchema = Joi.object().keys({
  quantity: Joi.number().required(),
  seq: Joi.number().required(),
  id: Joi.number().integer().required()
});

module.exports = {
  bodySchema
};
