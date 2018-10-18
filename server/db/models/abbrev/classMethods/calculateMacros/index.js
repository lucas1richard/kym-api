/**
 * @module models/abbrev/classMethods/calculateMacros
 */

const FoodFactor = require('../utils/FoodFactor');
const formatResults = require('./formatResults');

/**
 * Calculate macronutrients
 * @param {{proteinGoal: number, carbGoal: number, fatGoal: number}} goals - Macronutrient goals
 * @param {number} id - food id
 * @param {Array<abbrevType>} [_foods] - array of foods
 * @param {boolean} [sensitive] - prevent huge meals from being returned
 */
async function calculateMacros(goals, id, _foods, sensitive) {
  let start;
  const {
    proteinGoal,
    carbGoal,
    fatGoal
  } = goals;


  // Get the foods
  if (_foods) {
    start = Promise.resolve(_foods);
  } else {
    start = Promise.all(id.map((ix) => this.findById(ix)));
  }
  const startFoods = await start;


  // Don't allow invalid goals
  if (proteinGoal <= 0 || carbGoal <= 0 || fatGoal <= 0) {
    return {
      error: 'Goal macronutrients must be greater than 0'
    };
  }

  // Factors
  const factors = new FoodFactor(startFoods);

  if (factors.status === 'fail') {
    return {
      error: 'No foods provided'
    };
  }

  const { alpha, beta, gamma } = factors.calculateMealWeights(
    proteinGoal,
    carbGoal,
    fatGoal
  );

  const proteinFoodWeight = Math.round(alpha);
  const carbFoodWeight = Math.round(beta);
  const fatFoodWeight = Math.round(gamma);

  const result = [
    formatResults(proteinFoodWeight, factors.pFood),
    formatResults(carbFoodWeight, factors.cFood),
    formatResults(fatFoodWeight, factors.fFood)
  ];

  if (sensitive && (proteinFoodWeight > 400 || carbFoodWeight > 400 || fatFoodWeight > 400)) {
    const maxAmount = Math.round(
      Math.max(
        proteinFoodWeight,
        carbFoodWeight,
        fatFoodWeight
      )
    );
    let foodName;
    if (maxAmount === proteinFoodWeight) {
      foodName = factors.pFood.foods[0].longname;
    }
    if (maxAmount === carbFoodWeight) {
      foodName = factors.cFood.foods[0].longname;
    }
    if (maxAmount === fatFoodWeight) {
      foodName = factors.fFood.foods[0].longname;
    }
    return {
      error: `
        These foods require really high quantities to reach your goal.\n
        "${foodName}" would require ${maxAmount} grams
      `,
      result
    };
  }

  if (proteinFoodWeight >= 0 && carbFoodWeight >= 0 && fatFoodWeight >= 0) {
    return result;
  }
  return {
    error: 'These foods cannot create a meal with your desired macronutrients',
    factors,
    result
  };
}

module.exports = calculateMacros;
