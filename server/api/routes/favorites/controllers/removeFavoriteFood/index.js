const { handleRouteError } = include('utils/handleRouteError');
const { connectDatabase } = require('@kym/db');
const { Abbrev, User } = connectDatabase();
const { bodySchema } = require('./validation');

const removeFavoriteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const { abbrevId, meal } = req.body;

    // If the record is not associated, this will not cause an error
    await User.removeFavoriteFood({
      uuid: res.locals.uuid,
      abbrevId,
      meal,
      Abbrev,
    });

    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t remove the favorite');
    next(err);
  }
};

module.exports = removeFavoriteFood;
