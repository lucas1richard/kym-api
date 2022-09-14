const app = include('app');
const supertest = require('supertest');
const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');

const { User, Abbrev, destroyAll } = connectDatabase();

const agent = supertest(app);

describe('favorites', () => {
  before(async () => {
    await User.bulkCreate(testData.users);
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  after(async () => {
    await destroyAll();
  });

  it('adds a favorite food for a meal', async () => {
    const abbrevId = testData.abbrevs[0].id;
    const res = await agent.post('/api/favorites/food/v1')
      .send({ abbrevId, meal: 3 })
      .set('token', testData.tokens.user0);

    expect(res.body.id.toString()).equal(abbrevId.toString());
  });
  it('handles errors', async () => {
    const res = await agent.post('/api/favorites/food/v1')
      .send({})
      .set('token', testData.tokens.user0);

    expect(res.error).to.be.ok;
  });
});
