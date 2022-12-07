const { expect } = require('chai');
const makeWhere = require('./makeWhere');

describe('getFoodByNameV1/makeWhere', () => {
  it('return empty object if no splitname given', () => {
    expect(JSON.stringify(makeWhere())).equal('{}');
  });
});
