const app = include('/app');
const supertest = require('supertest');
// const assert = require('assert');

const agent = supertest.agent(app);

describe('food-groups api (GET food-groups)', () => {
  it('should get a list of groups', (done) => {
    agent
      .get('/api/food-groups')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
