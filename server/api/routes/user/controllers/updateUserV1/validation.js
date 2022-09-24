const Joi = require('joi');

const bodySchema = Joi.object().keys({
  firstname: Joi.string().allow(null).optional(),
  lastname: Joi.string().allow(null).optional(),
  // username: Joi.string().allow(null).optional(),
  email: Joi.string().email().allow(null).optional(),
  password: Joi.string().allow(null).optional(),
  birthdate: Joi.date().allow(null).optional(),
  googleId: Joi.string().valid(null).allow(null).optional(),
  fitbitId: Joi.string().allow(null).optional(),
  fitbitToken: Joi.string().allow(null).optional(),
  fitbitRefreshToken: Joi.string().allow(null).optional(),
});

module.exports = {
  bodySchema,
};
