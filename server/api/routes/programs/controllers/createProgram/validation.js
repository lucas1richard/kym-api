const Joi = require('joi');

const bodySchema = Joi.object().keys({
  units: Joi.string().valid(['imperial', 'metric']).required(),
  weight: Joi.number().required(),
  goal: Joi.string().valid(['Gain Muscle', 'Lose Fat', 'Maintain']).required(),
  uuid: Joi.number().integer().required()
});

module.exports = {
  bodySchema
};
