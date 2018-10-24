const { USER, ABBREV } = include('db/foreignKeys');
const { foodRecordKeys } = require('../config');
const sequelize = require('../../../conn');

module.exports = createWithMeal;

/**
 * Create a food record with associated meal
 * @return {Promise}
 */
async function createWithMeal(instance) {
  const {
    [ABBREV]: abbrev_id,
    date,
    meal,
    quantity,
    unit,
    uuid,
    confirmed
  } = instance;

  const createRecordConfig = {
    [ABBREV]: abbrev_id,
    [USER]: uuid,
    [foodRecordKeys.DATE]: date,
    [foodRecordKeys.MEAL]: meal,
    [foodRecordKeys.QUANTITY]: quantity,
    [foodRecordKeys.UNIT]: unit,
    [foodRecordKeys.CONFIRMED]: confirmed
  };

  const findConfig = {
    where: {
      [USER]: uuid,
      date,
      meal
    }
  };
  
  const [food, [_meal]] = await Promise.all([
    this.create(createRecordConfig),
    sequelize.models.meal.findOrCreate(findConfig)
  ]);
  const [rawRecord] = await Promise.all([
    this.findById(food.id, {
      include: [sequelize.models.meal]
    }),
    _meal.addFoodRecord(food)
  ]);

  _meal.public = false;

  await _meal.save();
  const record = await rawRecord.calMacros();

  return record;
}
