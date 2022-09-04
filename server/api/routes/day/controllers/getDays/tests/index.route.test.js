const app = include('app');
const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const days = include('test-data/days.json');
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('user/controllers/signup', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await User.bulkCreate(users);
    await Day.destroy({ where: {}, force: true });
    await Day.bulkCreate(days);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('gets days', (done) => {
    agent
      .get('/api/day/days')
      .expect((res) => {
        assert(Object.keys(res.body).length > 0, 'Should have days');
        assert(res.body['2018-01-01'] === true, 'Should be an object with date value true');
      })
      .expect(200, done);
  });
  it('handles errors', (done) => {
    agent
      .get('/api/day/days')
      .set('user_id', null)
      .expect(500, done);
  });
});
