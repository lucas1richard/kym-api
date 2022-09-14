const Joi = require('joi');

const bodySchema = Joi.object().keys({
  abbrevId: Joi.number().integer().required(),
  meal: Joi.number().integer().required(),
});

module.exports = {
  bodySchema,
};
