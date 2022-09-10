const { connectDatabase, foreignKeys } = require('@kym/db');
const { handleRouteError } = include('utils/handleRouteError');

const { Abbrev } = connectDatabase();
const { USER } = foreignKeys;

const getUserCreated = async (req, res, next) => {
  try {
    const { uuid } = res.locals;

    if (!uuid) {
      throw new Error('No uuid provided');
    }

    const abbrevs = await Abbrev.findAll({
      where: { [USER]: uuid },
      order: ['main', 'sub'],
    });

    res.json(abbrevs);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the foods you created');
    next(err);
  }
};

module.exports = getUserCreated;
