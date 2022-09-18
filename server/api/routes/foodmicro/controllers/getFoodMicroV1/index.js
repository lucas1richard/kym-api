const { connectDatabase } = require('@kym/db');
const { idSchema } = require('./validation');

const { Abbrev } = connectDatabase();

const getFoodMicroV1 = async ({ id }) => {
  await idSchema.validate(id);

  const food = await Abbrev
    .scope('withAll') // includes Weight, AbbrevMicro, FoodDesc
    .findByPk(id);

  return food;
};

module.exports = getFoodMicroV1;
