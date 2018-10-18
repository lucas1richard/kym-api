const app = include('app');
const { User } = include('db');
const { assert } = require('chai');
const supertest = require('supertest');

const agent = supertest(app);

describe('user/controllers/signup', () => {
  let userMeasurements;
  let body;
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
    userMeasurements = {
      gender: 'MALE',
      goal: 'Lose Fat',
      height: '73',
      date: '2018-01-01',
      lifestyle: 'Normal',
      units: 'imperial',
      weight: '179'
    };
    body = {
      birthdate: '1989-01-01',
      email: 'test@test.test',
      firstname: 'Test',
      lastname: 'Test',
      password: '1234',
      loggedIn: false
    };
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('signs up successfully', (done) => {
    agent
      .post('/api/user/signup')
      .send(body)
      .expect((res) => {
        assert(!!res.headers.token, 'There should be a token in the headers');
      })
      .expect(201, done);
  });
  it('signs up successfully with measurements', (done) => {
    body.userMeasurements = userMeasurements;
    agent
      .post('/api/user/signup')
      .send(body)
      .expect((res) => {
        assert(!!res.headers.token, 'There should be a token in the headers');
      })
      .expect(201, done);
  });
  it('fails when appropriate', async () => {
    await agent
      .post('/api/user/signup')
      .send(body)
      .expect((res) => {
        assert(!!res.headers.token, 'There should be a token in the headers');
      })
      .expect(201);
    await agent
      .post('/api/user/signup')
      .send(body)
      .expect(400);
  });
  it('fails when appropriate with measurements', async () => {
    body.userMeasurements = userMeasurements;
    await agent
      .post('/api/user/signup')
      .send(body)
      .expect((res) => {
        assert(!!res.headers.token, 'There should be a token in the headers');
      })
      .expect(201);
    await agent
      .post('/api/user/signup')
      .send(body)
      .expect(400);
  });
  it('fails when there\'s a bad request', async () => {
    delete body.firstname;
    await agent
      .post('/api/user/signup')
      .send(body)
      .expect(400);
  });
});
