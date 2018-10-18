const { Abbrev } = include('db');

const uuidv1 = require('uuid/v1');
const { bodySchema } = require('./validation');

const dayMealsCalculation = async (body, user_id) => {
  // Validate
  await bodySchema.validate(body, { allowUnknown: true });

  const output = await Abbrev.dayCalculation(user_id, body.type);

  const toSend = {
    foods: output,
    type: body.type,
    isConfirmed: false,
    uuid: body.uuid || uuidv1()
  };

  return toSend;
};

module.exports = dayMealsCalculation;
