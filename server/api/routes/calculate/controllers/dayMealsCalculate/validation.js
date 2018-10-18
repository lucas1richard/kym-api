const Joi = require('joi');

const typeSchema = Joi.string().valid(['rest', 'train']).error(() => 'Type must be either \'train\' or \'rest\'');
const bodySchema = Joi.object().keys({
  type: typeSchema
});

module.exports = {
  typeSchema,
  bodySchema
};
