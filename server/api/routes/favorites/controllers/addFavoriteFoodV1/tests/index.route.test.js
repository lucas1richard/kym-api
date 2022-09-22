const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');

const { User, Abbrev, destroyAll } = connectDatabase();

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
    const res = await globals.agent.postWithToken('/api/favorites/food/v1')
      .send({ abbrevId, meal: 3 });

    expect(res.body.id.toString()).equal(abbrevId.toString());
  });
  it('handles errors', async () => {
    const res = await globals.agent.postWithToken('/api/favorites/food/v1')
      .send({});

    expect(res.error).to.be.ok;
  });
});
