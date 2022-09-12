const app = include('app');
const { connectDatabase } = require('@kym/db');
const { User, Day, destroyAll } = connectDatabase();
const users = include('test-data/users.json');
const days = include('test-data/days.json');
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('(route) day/controllers/createUpdateDays', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await Day.destroy({ where: {}, force: true });
    await User.bulkCreate(users);
    await Day.bulkCreate(days);
  });
  after(async () => {
    await destroyAll();
  });
  it('creates days', (done) => {
    agent
      .post('/api/day/days/V1')
      .send({ '2018-08-02': true })
      .set('token', testData.tokens.user0)
      .expect((res) => {
        assert(Array.isArray(res.body), 'Should have days');
      })
      .expect(201, done);
  });
  it('handles errors', (done) => {
    agent
      .post('/api/day/days/V1')
      .send({ data: 100 })
      .set('token', testData.tokens.user0)
      .expect(500, done);
  });
});
