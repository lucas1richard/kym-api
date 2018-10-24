const app = include('app');
const { User, Day } = include('db');
const users = include('test-data/users');
const days = include('test-data/days');
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('(route) day/controllers/createUpdateDays', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await User.bulkCreate(users);
    await Day.destroy({ where: {}, force: true });
    await Day.bulkCreate(days);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('creates days', (done) => {
    agent
      .post('/api/day/days')
      .send({ days: '2018-08-02', dayType: true })
      .expect((res) => {
        assert(Object.keys(res.body).length > 0, 'Should have days');
        assert(res.body['2018-08-02'] === true, 'Should be an object with date value true');
      })
      .expect(201, done);
  });
  it('handles errors', (done) => {
    agent
      .post('/api/day/days')
      .set('user_id', null)
      .expect(500, done);
  });
});