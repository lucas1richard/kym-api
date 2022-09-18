const Joi = require('joi');
const ValidationError = require('../../../../../configure/ValidationError');

const idSchema = Joi.number().required().error(() => new ValidationError('The id must be a number'));

module.exports = {
  idSchema,
};
