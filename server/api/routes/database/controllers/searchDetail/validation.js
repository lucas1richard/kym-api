const Joi = require('joi');

const bodySchema = Joi.object().keys({
  // searchVal: Joi.string().required(),
  proteinPer: Joi.number().optional(),
  carbsPer: Joi.number().optional(),
  fatPer: Joi.number().optional()
});

module.exports = {
  bodySchema
};
