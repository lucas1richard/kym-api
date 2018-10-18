const { expect } = require('chai');
const getBestGroup = require('../getBestGroup');

describe('getBestGroup', () => {
  it('is okay', () => {
    const group = getBestGroup([{
      foodGroup: { Description: 'Chicken chicken' }
    }, {
      foodGroup: { Description: 'Test test' }
    }, {
      foodGroup: { Description: 'Test test' }
    }]);
    expect(group).to.be.ok; // eslint-disable-line
  });
  it('throws an error when foods are an empty array', () => {
    try {
      getBestGroup([]);
    } catch (err) {
      expect(err.message).to.equal('No similar foods found');
    }
  });
});
