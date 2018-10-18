const { handleRouteError } = include('utils/handleRouteError');
const { Abbrev } = include('db');

const getUserCreated = async (req, res, next) => {
  try {
    const { user_id } = res.locals;

    if (!user_id) {
      throw new Error('No user_id provided');
    }

    const abbrevs = await Abbrev.findAll({
      where: { UserID: user_id },
      order: ['Main', 'Sub']
    });

    res.json(abbrevs);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the foods you created');
    next(err);
  }
};

module.exports = getUserCreated;
