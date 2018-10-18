const Joi = require('joi');

const dateSchema = Joi.date();
const userIdSchema = Joi.number().integer();

module.exports = {
  dateSchema,
  userIdSchema
};
