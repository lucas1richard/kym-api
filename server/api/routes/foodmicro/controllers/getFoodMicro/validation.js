const Joi = require('joi');

const idSchema = Joi.number().required().error(() => 'The id must be a number');

module.exports = {
  idSchema,
};
