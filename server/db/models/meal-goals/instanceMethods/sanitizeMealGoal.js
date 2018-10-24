const { USER } = include('db/foreignKeys');
const { promisify } = require('util');

function sanitizeMealGoalSync(cb) {
  const mealGoal = { ...this.get() };

  delete mealGoal[USER];

  return cb(null, mealGoal);
}

const sanitizeMealGoal = promisify(sanitizeMealGoalSync);

module.exports = sanitizeMealGoal;
