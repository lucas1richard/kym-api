const { expect } = require('chai');
const calculateMealWeights = require('../calculateMealWeights');

describe('calcWeight', () => {
  const factors = {
    pFood: makeFactor(25, 0, 5),
    cFood: makeFactor(1, 10, 0),
    fFood: makeFactor(1, 3, 14)
  };
  const pGoal = 20;
  const cGoal = 30;
  const fGoal = 10;

  it('calculates weights', () => {
    const weights = calculateMealWeights(factors, pGoal, cGoal, fGoal);
    expect(weights).to.be.ok; // eslint-disable-line
    expect(weights.alpha).to.be.closeTo(66.7, 0.3);
    expect(weights.beta).to.be.closeTo(285.7, 0.3);
    expect(weights.gamma).to.be.closeTo(47.6, 0.3);
  });
});

function makeFactor(p, c, f) {
  return { p, c, f, weight: 100 };
}
