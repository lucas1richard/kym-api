const { foreignKeys } = require('@kym/db');
const Joi = require('joi');

const bodySchema = Joi.object().keys({
  units: Joi.string().valid(['imperial', 'metric']).required(),
  weight: Joi.number().required(),
  goal: Joi.string().valid(['Gain Muscle', 'Lose Fat', 'Maintain']).required(),
  [foreignKeys.USER]: Joi.number().integer().required()
});

module.exports = {
  bodySchema
};
