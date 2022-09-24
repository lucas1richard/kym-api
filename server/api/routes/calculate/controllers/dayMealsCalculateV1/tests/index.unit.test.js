const { expect } = require('chai');
const dayMealsCalculationV1 = require('../');

describe('dayMealsCalculateV1', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  it('is okay', async () => {
    const meal = await dayMealsCalculationV1({ type: 'TRAIN' }, globals.testData.users[0].uuid);
    expect(meal).to.be.ok;
  });
});
