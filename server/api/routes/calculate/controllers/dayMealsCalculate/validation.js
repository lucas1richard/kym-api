const Joi = require('joi');

const typeSchema = Joi
  .string()
  .valid(['REST', 'TRAIN'])
  .error(() => 'INVALID_GOAL_TYPE');

const bodySchema = Joi.object().keys({
  type: typeSchema
});

module.exports = {
  typeSchema,
  bodySchema
};
