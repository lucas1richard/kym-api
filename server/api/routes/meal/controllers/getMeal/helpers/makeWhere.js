const { sequelize } = include('db');

const { Op } = sequelize;

/**
 * Build where query object
 * @param {Array<number>} meals
 * @param {boolean} postWorkout
 * @param {number} user_id
 */
function makeWhere(meals, postWorkout, user_id) {
  const where = {
    user_id: {
      [Op.ne]: user_id
    },
    public: true
  };
  if (meals) {
    Object.assign(where, {
      meal: { [Op.or]: meals }
    });
  }
  if (postWorkout === 'true') {
    Object.assign(where, { postWorkout: true });
  }
  return where;
}

module.exports = makeWhere;
