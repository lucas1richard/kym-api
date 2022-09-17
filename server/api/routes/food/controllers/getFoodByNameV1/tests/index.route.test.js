const app = include('/app');
const supertest = require('supertest');
// const assert = require('assert');

const agent = supertest.agent(app);

describe('food api (GET :foodname)', () => {
  it('should get a food', (done) => {
    agent
      .get('/api/food/chicken?offset=0')
      .set('token', testData.tokens.user0)
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
