const Joi = require('joi');

const idSchema = Joi.number().integer().required();
const bodySchema = Joi.object().keys({
  id: idSchema
});

module.exports = {
  idSchema,
  bodySchema
};
