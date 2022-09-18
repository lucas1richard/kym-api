const Joi = require('joi');
const ValidationError = require('../../../../../configure/ValidationError');

const typeSchema = Joi
  .string()
  .valid(['REST', 'TRAIN'])
  .error(() => new ValidationError('INVALID_GOAL_TYPE'));

const bodySchema = Joi.object().keys({
  type: typeSchema,
});

module.exports = {
  typeSchema,
  bodySchema,
};
