const app = include('app');
const { connectDatabase } = require('@kym/db');
const { Abbrev, FoodDesc, FoodGroup } = connectDatabase();
const { expect } = require('chai');
const supertest = require('supertest');

const agent = supertest.agent(app);

describe('routes/database/getBestGroup', () => {
  before(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
    await FoodGroup.bulkCreate(testData.foodGroups);
    await FoodDesc.bulkCreate(testData.foodDesc);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
    await FoodDesc.destroy({ where: {}, force: true });
    await FoodGroup.destroy({ where: {}, force: true });
  });

  it('returns a group', async () => {
    const res = await agent.get('/api/database/foodgroup/v1?food[]=chicken')
      .set('token', testData.tokens.user0);

    expect(res.statusCode).to.equal(200);
  });
});
