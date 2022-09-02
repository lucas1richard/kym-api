const app = include('app');
const { connectDatabase } = require('@kym/db');
const { Abbrev, User } = connectDatabase();
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const supertest = require('supertest');

const agent = supertest(app);

const path = '/api/database/user-created';

describe('deleteFood route', () => {
  let body;
  before(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  beforeEach(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
    body = {
      id: 1,
    };
  });
  afterEach(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('deletes a food created by the user', async () => {
    await agent
      .delete(path)
      .send(body)
      .expect(204);
  });
  it('fails when food wasn\'t created by the user', async () => {
    await agent
      .delete(path)
      .set('user_id', 2)
      .send(body)
      .expect(401);
  });
  it('fails when food doesn\'t exist', async () => {
    body.id = 2;
    await agent
      .delete(path)
      .send(body)
      .expect(404);
  });
  it('fails when the request is malformed', async () => {
    body.id = 'something absurd';
    await agent
      .delete(path)
      .send(body)
      .expect(400);
  });
});
