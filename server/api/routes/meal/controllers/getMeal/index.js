const {
  Meal,
  FoodRecord,
  Abbrev,
  sequelize
} = include('/db');

const makeWhere = require('./helpers/makeWhere');
const makeInclWhere = require('./helpers/makeInclWhere');

const { Op } = sequelize;

const getFoodMicro = async (req, res, next) => {
  try {
    const { postWorkout, keyword } = req.query;

    const where = makeWhere(
      req.body.meals,
      postWorkout,
      keyword,
      res.locals.uuid
    );

    const inclWhere = makeInclWhere(keyword);

    const meals = await Meal.findAll({
      where,
      include: [{
        model: FoodRecord,
        include: [{
          model: Abbrev,
          where: inclWhere
        }]
      }],
      order: [['id', 'DESC']],
      limit: 15
    });

    const indMeals = await Meal.findAll({
      where: {
        [Op.or]: meals.map((meal) => ({
          id: meal.id
        }))
      },
      include: [{
        model: FoodRecord,
        include: [Abbrev]
      }]
    });

    res.json(indMeals);
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodMicro;

