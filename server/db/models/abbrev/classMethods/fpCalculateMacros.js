/**
 * @module models/abbrev/classMethods/fpCalculateMacros
 */

const calculateMealWeights = require('./utils/calculateMealWeights');
const getMacros = require('./utils/getMacros');
const getFoodFactors = require('./utils/FoodFactor');
const filteredMeals = require('../../../data/filteredmeals');

module.exports = fpCalculateMacros;

/* istanbul ignore next */
function fpCalculateMacros(goals) {
  const { proteinGoal, carbGoal, fatGoal } = goals;
  const oFoods = filteredMeals.slice();

  if (proteinGoal <= 0 || carbGoal <= 0 || fatGoal <= 0) {
    return { error: 'Goal macronutrients must be greater than 0' };
  }

  let cnt = 0;
  let regenerate = true;
  let data = [];

  while (regenerate && cnt < 20) {
    const selectedFood = [];

    for (let i = 0; i < 4; i += 1) {
      const rndFirst = Math.floor(Math.random() * (filteredMeals.length - 1));
      const rndSecond = Math.floor(Math.random() * filteredMeals[rndFirst].length);
      const rndThird = Math.floor(Math.random() * filteredMeals[rndFirst][rndSecond].length);
      const foodToPush = filteredMeals[rndFirst][rndSecond][rndThird];

      if (selectedFood.filter((food) => food.id === foodToPush.id).length !== 0) {
        i -= 1;
      } else {
        selectedFood.push(foodToPush);
      }
    }

    const factors = getFoodFactors(selectedFood);

    if (!factors.pFood.p) {
      getMax('pFood', 'Protein');
    }
    if (!factors.cFood.c) {
      getMax('cFood', 'Carbohydrates');
    }
    if (!factors.fFood.f) {
      getMax('fFood', 'Fat');
    }

    /**
     * @param {string} factor
     * @param {string} macro
     */
    // eslint-disable-next-line no-inner-declarations
    function getMax(factor, macro) {
      factors[factor].foods = oFoods.reduce((memo, fd) => {
        if (fd[macro] * 1 > memo[macro]) {
          return fd;
        }
        return memo;
      }, { Protein: 0 });
      factors[factor].foods = [factors[factor].foods];
      factors[factor].weight = 100;
      factors[factor].p = factors[factor].foods[0].Protein * 1;
      factors[factor].c = factors[factor].foods[0].Carbohydrates * 1;
      factors[factor].f = factors[factor].foods[0].Fat * 1;
    }

    const { alpha, beta, gamma } = calculateMealWeights(factors, proteinGoal, carbGoal, fatGoal);

    const cG = Math.round(alpha);
    const spG = Math.round(beta);
    const aG = Math.round(gamma);

    /**
     * @param {number} gr
     */
    const convertOz = (gr) => Math.round((gr * 10) / 28.4) / 10;

    /**
     * Format the response
     * @param {number} gr gram weight
     * @param {{p: number, f: number, c: number, weight: number}} factor
     */
    const getRes = (gr, factor) => ({
      foods: factor.foods,
      weight: {
        gr,
        oz: convertOz(gr)
      },
      macros: getMacros(gr, factor)
    });

    data = [
      getRes(cG, factors.pFood),
      getRes(spG, factors.cFood),
      getRes(aG, factors.fFood)
    ];

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].weight.gr < 0 || data[i].weight.oz < 0 || !data[i].weight.gr || !data[i].weight.oz) {
        cnt += 1;
        regenerate = false;
        break;
      }
    }
    regenerate = !regenerate;
  }
  return data;
}
