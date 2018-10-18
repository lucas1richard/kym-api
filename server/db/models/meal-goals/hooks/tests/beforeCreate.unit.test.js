const { expect } = require('chai');
const beforeCreate = require('../beforeCreate');

const makeGoal = () => ({ protein: 1, carbs: 0, fat: 1 });
describe('meal-goals/hooks/beforeCreate', () => {
  let testGoals;
  beforeEach(() => {
    testGoals = [makeGoal(), makeGoal(), makeGoal(), makeGoal(), makeGoal(), makeGoal()];
  });
  it('requires an object', () => {
    try {
      beforeCreate();
    } catch (err) {
      expect(err).to.be.ok; // eslint-disable-line
    }
  });
  it('requires an object with a \'train\' prop', () => {
    try {
      beforeCreate({ goals: { rest: testGoals } });
    } catch (err) {
      expect(err.message).to.equal('There must be goals for train');
    }
  });
  it('requires an object with a \'rest\' prop', () => {
    try {
      beforeCreate({ goals: { train: testGoals } });
    } catch (err) {
      expect(err.message).to.equal('There must be goals for rest');
    }
  });
  it('requires 6 goals', () => {
    testGoals.pop();
    try {
      beforeCreate({ goals: { train: testGoals, rest: testGoals } });
    } catch (err) {
      expect(err.message).to.equal('There must be goals for six meals on a train day');
    }
  });
});
