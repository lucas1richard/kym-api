const Joi = require('joi');
const { foreignKeys } = require('@kym/db');
const ValidationError = include('configure/ValidationError');

const mealIdSchema = Joi.number().integer().required().error(() => new ValidationError('MEAL_ID_REQUIRED'));
const userIdSchema = foreignKeys.USER_VALIDATION;

module.exports = {
  mealIdSchema,
  userIdSchema,
};
