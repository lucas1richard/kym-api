const { handleRouteError } = include('utils/handleRouteError');
const { FoodDesc } = include('db');
const AppError = include('configure/appError');
const { querySchema } = require('./validation');

const getBestGroup = async (req, res, next) => {
  try {
    // Validate
    await querySchema.validate(req.query);

    const { food } = req.query;
    const foods = await FoodDesc.findAll({
      where: {
        Long_Desc: { $iLike: `%${food}%` }
      }
    });
    const group = await FoodDesc.getBestGroup(foods);
    if (!group) {
      throw new AppError(404, {
        devmessage: 'No group found',
        usermessage: 'We couldn\'t find a good match'
      }, true);
    }
    res.json(group);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t determine a good fit');
    next(err);
  }
};

module.exports = getBestGroup;
