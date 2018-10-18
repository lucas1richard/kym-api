const { handleRouteError } = include('utils/handleRouteError');
const { User } = include('db');
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
      res.locals.user_id,
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
