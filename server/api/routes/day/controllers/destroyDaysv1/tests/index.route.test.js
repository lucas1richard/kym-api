const app = include('app');
const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const days = include('test-data/days.json');
const supertest = require('supertest');

const agent = supertest(app);

describe('(route) day/controllers/destroyDays', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    await User.bulkCreate(users);
    await Day.destroy({ where: {}, force: true });
    await Day.bulkCreate(days);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('destroys days', (done) => {
    agent
      .delete('/api/day/days/V1')
      .set('token', testData.tokens.user0)
      .send(['2018-08-02'])
      .expect(204, done);
  });
  it('handles errors', (done) => {
    agent
      .delete('/api/day/days/v1')
      .set('token', testData.tokens.user0)
      .expect(500, done);
  });
});
