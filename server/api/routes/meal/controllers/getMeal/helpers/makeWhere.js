const { USER } = include('db/foreignKeys');
const { sequelize } = include('db');

const { Op } = sequelize;

/**
 * Build where query object
 * @param {Array<number>} meals
 * @param {boolean} postWorkout
 * @param {number} uuid
 */
function makeWhere(meals, postWorkout, uuid) {
  const where = {
    [USER]: {
      [Op.ne]: uuid
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
