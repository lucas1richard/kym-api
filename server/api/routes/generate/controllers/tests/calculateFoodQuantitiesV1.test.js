const { expect } = require('chai');
const calculateFoodQuantities = require('../calculateFoodQuantitiesV1');

describe('calculateFoodQuantitiesV1', () => {
  it('handles empty args', async () => {
    try {
      await calculateFoodQuantities();
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });
});
