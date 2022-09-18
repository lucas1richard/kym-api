const Joi = require('joi');

const idsSchema = Joi.array().items(
  Joi.number().integer().required(),
).required();

const bodySchema = Joi.object().keys({
  ids: idsSchema,
});

module.exports = {
  idsSchema,
  bodySchema,
};
