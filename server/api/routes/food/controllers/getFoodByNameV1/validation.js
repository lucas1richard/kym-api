const Joi = require('joi');

const foodnameSchema = Joi.string().required();
const offsetSchema = Joi.number().optional();

module.exports = {
  foodnameSchema,
  offsetSchema,
};
