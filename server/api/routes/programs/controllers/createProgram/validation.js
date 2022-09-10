const Joi = require('joi');

const bodySchema = Joi.object().keys({
  units: Joi.string().valid(['IMPERIAL', 'METRIC']).required(),
  weight: Joi.number().required(),
  goal: Joi.string().valid(['GAIN_MUSCLE', 'LOSE_FAT', 'MAINTAIN']).required(),
});

module.exports = {
  bodySchema,
};
