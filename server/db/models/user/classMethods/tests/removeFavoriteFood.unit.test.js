const { User, Abbrev, UserFavorites } = include('db');
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const favorites = include('test-data/favorites');
const { expect } = require('chai');
const removeFavoriteFoodUnbound = require('../removeFavoriteFood');

const removeFavoriteFood = removeFavoriteFoodUnbound.bind(User);

describe('user/classMethods/removeFavoriteFood', () => {
  before(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
    await UserFavorites.bulkCreate(favorites);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
    await UserFavorites.destroy({ where: {}, force: true });
  });
  it('throws an error if there\'s no user', async () => {
    try {
      await removeFavoriteFood(9e4, 9e4, 3);
    } catch (err) {
      expect(err.commonType).to.equal(404, err);
      expect(err.message.usermessage).to.equal('Couldn\'t find your account');
    }
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await removeFavoriteFood(1, 9e4, 3);
    } catch (err) {
      expect(err.commonType).to.equal(404);
      expect(err.message.usermessage).to.equal('Couldn\'t find this food');
    }
  });
});
