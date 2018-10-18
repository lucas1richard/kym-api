module.exports = createWithMeal;
const sequelize = require('../../../conn');

/**
 * Create a food record with associated meal
 * @return {Promise}
 */
function createWithMeal({ abbrev_id, date, meal, quantity, unit, user_id, confirmed }) {
  return Promise.all([
    this.create({
      abbrev_id,
      Date: date,
      Meal: meal,
      Quantity: quantity,
      Unit: unit,
      user_id,
      confirmed
    }),
    sequelize.models.meal.findOrCreate({
      where: {
        user_id,
        date,
        meal
      }
    })
  ])
    .then(([food, _meal]) => Promise.all([
      this.findById(food.id, {
        include: [sequelize.models.meal]
      }),
      _meal[0].addFoodRecord(food)
    ]))
    .then(([record, _meal]) => {
      _meal.public = false; // eslint-disable-line no-param-reassign
      _meal.save();
      return record.calMacros();
    });
}
