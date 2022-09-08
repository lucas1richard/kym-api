const { connectDatabase } = require('@kym/db');
const { handleRouteError } = include('utils/handleRouteError');
const { idSchema } = require('./validation');

const { Abbrev } = connectDatabase();

const getFoodMicro = async (req, res, next) => {
  try {
    // Validate
    await idSchema.validate(req.params.id);

    // Get the record with everything associated
    const food = await Abbrev
      .scope('withAll') // includes Weight, AbbrevMicro, FoodDesc
      .findByPk(req.params.id);

    res.json(food);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the records');
    next(err);
  }
};

module.exports = getFoodMicro;
