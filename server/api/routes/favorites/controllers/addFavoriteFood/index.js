const { connectDatabase } = require('@kym/db');
const { handleRouteError } = require('../../../../../utils/handleRouteError');
const { User, Abbrev } = connectDatabase();

const { bodySchema } = require('./validation');

const addFavoriteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const {
      abbrevId,
      meal,
    } = req.body;

    const abbrev = await User.addFavoriteFood({
      uuid: res.locals.uuid,
      abbrevId,
      meal,
      Abbrev,
    });

    res.json(abbrev);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t add favorite');
    next(err);
  }
};

module.exports = addFavoriteFood;
