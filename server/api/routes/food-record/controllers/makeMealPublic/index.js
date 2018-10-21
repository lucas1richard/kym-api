const { Meal } = include('db');
const { USER } = include('db/foreignKeys');

const makeMealPublic = async (req, res, next) => {
  try {
    const id = req.body.mealId;
    const { uuid } = res.locals;

    const meal = await Meal.findOne({
      where: {
        id,
        [USER]: uuid
      }
    });

    meal.public = true;
    await meal.save();

    res.json(meal);
  } catch (err) {
    next(err);
  }
};

module.exports = makeMealPublic;
