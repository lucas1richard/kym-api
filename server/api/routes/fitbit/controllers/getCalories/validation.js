const Joi = require('joi');

const dateSchema = Joi.date().required();

module.exports = {
  dateSchema,
};
