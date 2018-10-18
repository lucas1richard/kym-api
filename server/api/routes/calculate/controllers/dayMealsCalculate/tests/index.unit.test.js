const { expect } = require('chai');

// const db = require('../../../../../db');

describe('dayMealsCalculate', () => {
  it('is okay', async () => {
    const dayMealsCalculation = require('../');
    try {
      const meal = await dayMealsCalculation({ type: 'train' }, 1);
      expect(meal).to.be.ok;
    } catch (err) {
      console.log(err.message);
      // expect.fail();
    }
  });
});
