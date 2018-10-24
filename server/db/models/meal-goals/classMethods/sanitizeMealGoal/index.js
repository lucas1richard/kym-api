const { USER } = include('db/foreignKeys');
const { promisify } = require('util');

function sanitizeMealGoalSync(mealGoalInstance, cb) {
  if (!mealGoalInstance) {
    return cb(new Error('no mealGoalInstance'));
  }
  let mealGoal;
  if (typeof mealGoalInstance.get === 'function') {
    mealGoal = { ...mealGoalInstance.get() };
  } else {
    mealGoal = { ...mealGoalInstance };
  }

  delete mealGoal[USER];

  return cb(null, mealGoal);
}

const sanitizeMealGoal = promisify(sanitizeMealGoalSync);

module.exports = sanitizeMealGoal;
