const Joi = require('joi');

const USER = 'user_uuid';
const USER_VALIDATION = Joi.string().required();

const FOOD_GROUP = 'FdGrp_Cd';

const ABBREV = 'abbrev_id';

module.exports = {
  ABBREV,
  FOOD_GROUP,
  USER,
  USER_VALIDATION
}