const Joi = require('joi');

const bodySchema = Joi.object().keys({
  abbrevId: Joi.number().required(),
  meal: Joi.number().required()
});

module.exports = {
  bodySchema
};
