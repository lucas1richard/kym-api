const Joi = require('joi');

const bodySchema = Joi.object().keys({
  id: Joi.number().required()
});

module.exports = bodySchema;
