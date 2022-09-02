const { connectDatabase } = require('@kym/db');
const { User, Abbrev, UserRecordFavorites } = connectDatabase();
const users = include('test-data/users');
const favorites = include('test-data/favorites');
const abbrevs = include('test-data/abbrev');
const getFavoriteFoods = require('../');
const { expect } = require('chai');

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
  it('returns an array', async () => {
    const favs = await getFavoriteFoods(1);
    expect(Array.isArray(favs)).equal(true);
  });
});

