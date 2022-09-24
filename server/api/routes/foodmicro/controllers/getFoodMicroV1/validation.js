const Joi = require('joi');
const ValidationError = require('../../../../../configure/ValidationError');

const idSchema = Joi.number().required().error(() => new ValidationError('ID_MUST_BE_NUMBER'));

module.exports = {
  idSchema,
};
