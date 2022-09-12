const app = include('app');
const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('day/controllers/getDaysV1', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await Day.destroy({ where: {}, force: true });
    await User.bulkCreate(testData.users);
    await Day.bulkCreate(testData.days);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('gets days', (done) => {
    agent
      .get('/api/day/days/v1')
      .set('token', testData.tokens.user0)
      .expect((res) => {
        assert(Object.keys(res.body).length > 0, 'Should have days');
        assert(res.body['2018-01-01'] === true, 'Should be an object with date value true');
      })
      .expect(200, done);
  });
});
