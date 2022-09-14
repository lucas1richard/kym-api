const { connectDatabase } = require('@kym/db');
const users = include('test-data/users.json');
const app = include('app');
const favorites = include('test-data/favorites.json');
const abbrevs = include('test-data/abbrev.json');
const getFavoriteFoods = require('../');
const { expect } = require('chai');
const supertest = require('supertest');

const { User, Abbrev, UserRecordFavorites } = connectDatabase();
const agent = supertest(app);

describe('routes/favorites/getFavoriteFoods', () => {
  before(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
    await UserRecordFavorites.bulkCreate(favorites);
  });
  after(async () => {
    await UserRecordFavorites.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('returns an object with expected values', async () => {
    const data = await getFavoriteFoods(testData.users[0].uuid);
    const { recordFavorites, abbrevs } = data;
    expect(Array.isArray(recordFavorites)).equal(true);
    expect(abbrevs).to.be.ok;
  });
  it('returns an object with expected values', async () => {
    const res = await agent.get('/api/favorites/food/v1')
      .set('token', testData.tokens.user0);
    const { recordFavorites, abbrevs } = res.body;
    expect(Array.isArray(recordFavorites)).equal(true);
    expect(abbrevs).to.be.ok;
  });
});
