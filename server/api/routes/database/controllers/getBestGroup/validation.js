const Joi = require('joi');

const querySchema = Joi.object().keys({
  food: Joi.array().items(
    Joi.string().required(),
  ).required(),
});

module.exports = {
  querySchema,
};
