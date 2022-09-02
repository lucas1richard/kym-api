const { foreignKeys } = require('@kym/db');
const Joi = require('joi');

const dateSchema = Joi.date();
const userIdSchema = foreignKeys.USER_VALIDATION;

module.exports = {
  dateSchema,
  userIdSchema
};
