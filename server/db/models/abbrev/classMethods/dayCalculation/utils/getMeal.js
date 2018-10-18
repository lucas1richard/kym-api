module.exports = getMeal;

const { promisify } = require('util');

function validateGoalSync(goal, cb) {
  if (!goal) {
    return cb(null, false);
  }
  if (goal.protein === 0 && goal.carbs === 0 && goal.fat === 0) {
    return cb(null, false);
  }
  return cb(null, true);
}

function getRandomMealSync(allMeals, ix, ln) {
  const randomSelection = Math.floor(Math.random() * ln);

  const mealOpts = Object.keys(allMeals[ix]).map(function getKey(key) {
    return allMeals[ix][key];
  });

  return mealOpts[randomSelection];
}

function getMealIdsSync(meal) {
  return meal.map(function getIds(abbrev) {
    return abbrev.id;
  });
}

const validateGoal = promisify(validateGoalSync);

/**
 * Get a random viable meal
 * @param {Array<mealType>} allMeals
 * @param {{ protein: number, carbs: number, fat: number }} goal
 * @param {number} ix
 * @return {array}
 */
async function getMeal(allMeals, goal, ix) {
  // If there are no goals, return null
  const goalIsValid = await validateGoal(goal);
  console.log(goal);
  console.log(goalIsValid);
  if (!goalIsValid) {
    return null;
  }

  // Calculate quantities to reach goal
  const keys = Object.keys(allMeals[ix]);
  const ln = keys.length;

  let result;

  for (let i = 0; i < 20; i += 1) {
    const meal = getRandomMealSync(allMeals, ix, ln);

    try {
      const ids = getMealIdsSync(meal);
      // const calcFoods = meal;

      result = this.calculateMacros({
        proteinGoal: goal.protein,
        carbGoal: goal.carbs,
        fatGoal: goal.fat
      }, ids/* , calcFoods */);
    } catch (err) {
      continue; // eslint-disable-line no-continue
    }

    // Exit with the first meal that successfully calculates
    if (!result.error) {
      return result;
    }
  }

  return result;
}

module.exports = {
  getMeal,
  validateGoalSync,
  validateGoal,
  getRandomMealSync,
  getMealIdsSync
};
