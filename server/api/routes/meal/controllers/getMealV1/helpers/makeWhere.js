const { Op, foreignKeys } = require('@kym/db');

/**
 * Build where query object
 * @param {Array<number>} meals
 * @param {boolean} postWorkout
 * @param {number} uuid
 */
function makeWhere({ meals, postWorkout, uuid, excludeOwnMeals }) {
  return {
    ...excludeOwnMeals ? { [foreignKeys.USER]: { [Op.ne]: uuid } } : {},
    ...meals ? { meal: { [Op.or]: meals } } : {},
    ...postWorkout === 'true' ? { postWorkout: true } : {},
    public: true,
  };
}

module.exports = makeWhere;
