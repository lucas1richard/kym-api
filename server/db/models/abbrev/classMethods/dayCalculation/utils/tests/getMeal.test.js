const { Abbrev } = include('db');
const { expect } = require('chai');
const calculateMacros = require('../../../calculateMacros');
const filterMeals = require('../filterMeals');
const { getMeal, validateGoalSync } = require('../getMeal');

describe('getMeal', () => {
  const model = {
    getMeal: getMeal.bind(Abbrev),
    calculateMacros
  };

  const goals = [
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 0, fat: 0 },
    { protein: 0, carbs: 0, fat: 10 },
    { protein: 0, carbs: 30, fat: 0 },
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 30, fat: 10 }
  ];
  const allMeals = filterMeals(goals);

  it('returns something when goals are not all 0', () => {
    const goal = { protein: 20, carbs: 30, fat: 10 };
    const ix = 0;

    const meal = model.getMeal(allMeals, goal, ix);
    expect(meal).to.be.ok; // eslint-disable-line
  });

  it('returns null when goals are all 0', async () => {
    const goal = { protein: 0, carbs: 0, fat: 0 };
    const ix = 0;

    const meal = await model.getMeal(allMeals, goal, ix);
    expect(meal).to.be.null; // eslint-disable-line
  });
});

describe('validateGoalSync', () => {
  it('returns false when there is no goal', () => {
    validateGoalSync(null, (err, val) => {
      expect(val).to.equal(false);
    });
  });
  it('returns false when the goal has a zero', () => {
    const goal = {
      protein: 0,
      carbs: 0,
      fat: 0
    };
    validateGoalSync(goal, (err, val) => {
      expect(val).to.equal(false);
    });
  });
  it('returns false when the goal has no zero', () => {
    const goal = {
      protein: 1,
      carbs: 1,
      fat: 1
    };
    validateGoalSync(goal, (err, val) => {
      expect(val).to.equal(true);
    });
  });
});
