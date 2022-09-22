const autocomplete = require('../');
const { expect } = require('chai');

describe('routes/food/autocomplete', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);
  it('catches an error', async () => {
    await autocomplete({ foodname: 'c' });
  });
  it('returns an object', async () => {
    const foods = await autocomplete({ foodname: 'chicken' });
    expect(foods).to.be.ok;
  });
});
