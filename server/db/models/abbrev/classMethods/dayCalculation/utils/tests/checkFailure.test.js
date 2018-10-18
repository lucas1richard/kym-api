const { expect } = require('chai');
const checkFailure = require('../checkFailure');

describe('checkFailure', () => {
  it('should return true when appropriate', () => {
    const foods = {
      mainGoal: 5,
      secondaryGoal: 1,
      minimalGoal: 1
    };
    const factor = {
      weight: 100,
      p: 3,
      c: 1,
      f: 1
    };
    const macro = {
      primary: 'f',
      secondary: 'c',
      minimal: 'p'
    };
    expect(checkFailure(foods, factor, macro)).to.equal(true);
  });
  it('should return false when appropriate', () => {
    const foods = {
      mainGoal: 5,
      secondaryGoal: 3,
      minimalGoal: 3
    };
    const factor = {
      weight: 100,
      p: 2,
      c: 1,
      f: 1
    };
    const macro = {
      primary: 'p',
      secondary: 'c',
      minimal: 'f'
    };
    expect(checkFailure(foods, factor, macro)).to.equal(false);
  });
});
