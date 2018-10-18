const app = include('app');
const { User, UserFavorites, Abbrev } = include('db');
const users = include('test-data/users');
const favorites = include('test-data/favorites');
const abbrevs = include('test-data/abbrev');
// const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('favorites/controllers/removeFood', () => {
  let body;
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await User.bulkCreate(users);
    await Abbrev.destroy({ where: {}, force: true });
    await Abbrev.bulkCreate(abbrevs);
    await UserFavorites.destroy({ where: {}, force: true });
    await UserFavorites.bulkCreate(favorites);
    body = {
      abbrevId: 2514,
      meal: 3
    };
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await UserFavorites.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('removes a favorite successfully', (done) => {
    agent
      .delete('/api/favorites/food')
      .send(body)
      .expect(204, done);
  });
  it('fails with a bad request', (done) => {
    delete body.meal;
    agent
      .delete('/api/favorites/food')
      .send(body)
      .expect(400, done);
  });
});
