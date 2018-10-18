const { expect } = require('chai');
const FoodFactor = require('../FoodFactor');

function makeFood(protein, carbs, fat, maxMacro) {
  return {
    Protein: protein,
    Carbohydrates: carbs,
    Fat: fat,
    maxMacro
  };
}

function makeFactor(protein, carbs, fat, maxMacro) {
  return {
    foods: [makeFood(protein, carbs, fat, maxMacro)],
    p: protein,
    c: carbs,
    f: fat,
    weight: 100
  };
}

describe('getMaxMacroFactors', () => {
  const pFood = makeFactor(5, 0, 1, 'Protein');
  const cFood = makeFactor(0, 5, 1, 'Carbohydrates');
  const fFood = makeFactor(1, 0, 5, 'Fat');
  const factor = 'pFood';
  const macro = 'Protein';
  const factors = { pFood, cFood, fFood };
  const oFoods = [
    makeFood(5, 0, 1, 'Protein'),
    makeFood(0, 5, 1, 'Carbohydrates'),
    makeFood(1, 0, 5, 'Fat')
  ];
  const foodFactor = new FoodFactor(oFoods);
  it('should return factors', () => {
    const maxMacroFactors = foodFactor.getMaxMacroFactors(factor, macro);
    const maxFactors = {
      pFood: maxMacroFactors.pFood,
      cFood: maxMacroFactors.cFood,
      fFood: maxMacroFactors.fFood
    };
    expect(maxFactors).to.eql(factors);
  });
});
