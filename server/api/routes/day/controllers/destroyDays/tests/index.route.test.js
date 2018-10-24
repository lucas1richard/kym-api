const app = include('app');
const { User, Day } = include('db');
const users = include('test-data/users');
const days = include('test-data/days');
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
      .delete('/api/day/days')
      .send({ days: ['2018-08-02'] })
      .expect(204, done);
  });
  it('handles errors', (done) => {
    agent
      .delete('/api/day/days')
      .set('user_id', null)
      .expect(500, done);
  });
});