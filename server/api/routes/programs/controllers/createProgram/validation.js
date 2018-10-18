const Joi = require('joi');

// { units, weight, goal, user_id }
const bodySchema = Joi.object().keys({
  units: Joi.string().valid(['imperial', 'metric']).required(),
  weight: Joi.number().required(),
  goal: Joi.string().valid(['Gain Muscle', 'Lose Fat', 'Maintain']).required(),
  user_id: Joi.number().integer().required()
});

module.exports = {
  bodySchema
};
