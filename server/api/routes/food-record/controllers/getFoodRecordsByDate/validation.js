const { USER_VALIDATION } = include('db/foreignKeys');
const Joi = require('joi');

const dateSchema = Joi.date();
const userIdSchema = USER_VALIDATION;

module.exports = {
  dateSchema,
  userIdSchema
};
