const app = include('app');
const { UserMeasurement, User } = include('db');
const testMeasurements = include('test-data/user-measurements');
const testUsers = include('test-data/users');
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('user-measurements/controllers/getMeasurements', () => {
  before(async () => {
    await UserMeasurement.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
    await User.bulkCreate(testUsers);
    await UserMeasurement.bulkCreate(testMeasurements);
  });
  after(async () => {
    await UserMeasurement.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
  });
  it('gets all measurements', (done) => {
    agent
      .get('/api/user-measurements')
      .set('Accept', 'application/json')
      .expect((res) => {
        assert(res.body.length > 0, 'Should return a non-empty array');
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('fails when appropriate', (done) => {
    agent
      .get('/api/user-measurements')
      .set('Accept', 'application/json')
      .set('user_id', 9e9)
      .expect(500, done);
  });
});
