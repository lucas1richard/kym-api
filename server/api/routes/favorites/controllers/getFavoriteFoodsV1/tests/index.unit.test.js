const getFavoriteFoods = require('../');
const { expect } = require('chai');

describe('routes/favorites/getFavoriteFoods', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);
  it('returns an object with expected values', async () => {
    const data = await getFavoriteFoods(testData.users[0].uuid);
    const { recordFavorites, abbrevs } = data;
    expect(Array.isArray(recordFavorites)).equal(true);
    expect(abbrevs).to.be.ok;
  });
  it('returns an object with expected values', async () => {
    const res = await globals.agent.getWithToken('/api/favorites/food/v1');
    const { recordFavorites, abbrevs } = res.body;
    expect(Array.isArray(recordFavorites)).equal(true);
    expect(abbrevs).to.be.ok;
  });
});
