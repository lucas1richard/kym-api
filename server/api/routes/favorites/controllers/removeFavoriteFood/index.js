const { handleRouteError } = include('utils/handleRouteError');
const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const { bodySchema } = require('./validation');

const removeFavoriteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const { abbrevId, meal } = req.body;

    // If the record is not associated, this will not cause an error
    await User.removeFavoriteFood(
      res.locals.uuid,
      abbrevId,
      meal
    );

    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t remove the favorite');
    next(err);
  }
};

module.exports = removeFavoriteFood;
