const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();

const { bodySchema } = require('./validation');

const addFavoriteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const {
      abbrevId,
      meal
    } = req.body;

    const abbrev = await User.addFavoriteFood(
      res.locals.uuid,
      abbrevId,
      meal
    );

    res.json(abbrev);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t add favorite');
    next(err);
  }
};

module.exports = addFavoriteFood;
