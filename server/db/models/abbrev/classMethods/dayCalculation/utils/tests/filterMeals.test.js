const { expect } = require('chai');
const filterMeals = require('../filterMeals');

describe('filterMeals', () => {
  const goals = [
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 0, fat: 0 },
    { protein: 0, carbs: 0, fat: 10 },
    { protein: 0, carbs: 30, fat: 0 },
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 30, fat: 10 }
  ];
  const filtered = filterMeals(goals);
  expect(filtered).to.be.ok; // eslint-disable-line
});
