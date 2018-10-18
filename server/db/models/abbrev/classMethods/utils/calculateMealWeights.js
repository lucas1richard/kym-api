/**
 * @module models/abbrev/classMethods/calculateMealWeights
 * This is where we solve the equations
 */

/**
 * @typedef {{weight: number, p: number, c: number, f: number }} factorFoodType
 * @typedef {{pFood: factorFoodType, cFood: factorFoodType, fFood: factorFoodType}} factors
 */

module.exports = calculateMealWeights;

/**
 * Get the proper weight of the foods, in grams, given the goals
 * @param {factors} factors
 * @param {number} pGoal protein goal
 * @param {number} cGoal carb goal
 * @param {number} fGoal fat goal
 */
function calculateMealWeights(factors, pGoal, cGoal, fGoal) {
  // Gram weights of the foods
  let pWeight = 30;
  let cWeight = 30;
  let fWeight = 30;

  const {
    pFood,
    cFood,
    fFood
  } = factors;

  // Gauss-Seidel Iteration
  for (let increment = 0; increment < 20; increment += 1) {
    pWeight = (pFood.weight / pFood.p) * (pGoal - ((cFood.p * cWeight) / cFood.weight) - ((fFood.p * fWeight) / fFood.weight));
    cWeight = (cFood.weight / cFood.c) * (cGoal - ((pFood.c * pWeight) / pFood.weight) - ((fFood.c * fWeight) / fFood.weight));
    fWeight = (fFood.weight / fFood.f) * (fGoal - ((pFood.f * pWeight) / pFood.weight) - ((cFood.f * cWeight) / cFood.weight));
  }

  return {
    alpha: pWeight,
    beta: cWeight,
    gamma: fWeight
  };
}

