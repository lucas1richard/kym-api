const app = include('app');
const { connectDatabase } = require('@kym/db');
const { Abbrev, User } = connectDatabase();
const users = include('test-data/users.json');
const abbrevs = include('test-data/abbrev.json');
const { expect } = require('chai');
const supertest = require('supertest');

const agent = supertest.agent(app);

describe('routes/database/getUserCreated', () => {
  before(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('returns an array', async () => {
    const res = await agent
      .get('/api/database/user-created/v1')
      .set('token', testData.tokens.user0);

    expect(Array.isArray(res.body)).to.be.true;
  });
});
