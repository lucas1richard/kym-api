const { Abbrev } = include('db');
const { handleRouteError } = include('utils/handleRouteError');
const { idSchema } = require('./validation');

const getFoodMicro = async (req, res, next) => {
  try {
    // Validate
    await idSchema.validate(req.params.id);

    // Get the record with everything associated
    const food = await Abbrev.scope('all').findById(req.params.id);

    res.json(food);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the records');
    next(err);
  }
};

module.exports = getFoodMicro;
