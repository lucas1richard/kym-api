const { User, Abbrev, UserFavorites } = include('db');
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const favorites = include('test-data/favorites');
const { expect } = require('chai');
const addFavoriteFoodUnbound = require('../addFavoriteFood');

const addFavoriteFood = addFavoriteFoodUnbound.bind(User);

describe('user/classMethods/addFavoriteFood', () => {
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
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await addFavoriteFood(1, 2514, 3);
    } catch (err) {
      console.log(err);
      expect(err.commonType).to.equal(404);
      expect(err.message.usermessage).to.equal('Couldn\'t find your account');
    }
  });
});
