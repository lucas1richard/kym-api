const { Meal } = include('db');

const makeMealPublic = async (req, res, next) => {
  try {
    const id = req.body.mealId;
    const { user_id } = res.locals;

    const meal = await Meal.findOne({ where: { id, user_id } });

    meal.public = true;
    await meal.save();

    res.json(meal);
  } catch (err) {
    next(err);
  }
};

module.exports = makeMealPublic;
