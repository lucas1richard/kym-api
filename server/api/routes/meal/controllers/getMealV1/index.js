const { connectDatabase/* , Op */ } = require('@kym/db');
const makeWhere = require('./helpers/makeWhere');
const makeInclWhere = require('./helpers/makeInclWhere');

const {
  Meal,
  FoodRecord,
  Abbrev,
} = connectDatabase();

/**
 * Gets public meals with food item which has a `main` or `sub` containing `keyword`
 * @param {object} param0
 * @param {string} param0.uuid
 * @param {Array<number>} [param0.meals]
 * @param {boolean} [param0.postWorkout]
 * @param {string} [param0.keyword]
 * @param {boolean} [param0.excludeOwnMeals]
 */
const getMealV1 = async ({
  uuid, postWorkout, keyword, meals, excludeOwnMeals,
}) => {
  const where = makeWhere({
    meals,
    postWorkout,
    uuid,
    excludeOwnMeals,
  });

  const inclWhere = makeInclWhere(keyword);

  const indMeals = await Meal.findAll({
    where,
    include: [{
      model: FoodRecord,
      order: ['id'],
      include: [{
        model: Abbrev,
        ...keyword ? { where: inclWhere } : {},
        order: ['id'],
      }],
    }],
    order: [['id', 'DESC']],
    limit: 15,
  });

  // const indMeals = await Meal.scope('withRecords').findAll({
  //   where: {
  //     [Op.or]: meals.map((meal) => ({
  //       id: meal.id,
  //     })),
  //   },
  // });

  return indMeals;
};

module.exports = getMealV1;
