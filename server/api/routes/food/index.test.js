const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const { Abbrev, User } = connectDatabase();

const seedData = async () => {
  await User.bulkCreate(testData.users);
  await Abbrev.bulkCreate(testData.abbrevs);
};

describe('api/routes/food', () => {
  describe('/autocomplete/:foodname/v1', () => {
    before(seedData);
    after(globals.destroyAllHook);

    it('autocompletes for :foodname', async () => {
      const res = await globals.agent.getWithToken('/api/food/autocomplete/chick/v1');
      expect(res.statusCode).equal(200);
      expect(res.body?.[0]?.id).equal(2514);
    });
    it('requires :foodname.length > 3', async () => {
      const res = await agent.getWithToken('/api/food/autocomplete/%20h%20/v1');
      expect(res.statusCode).equal(400);
      expect(res.body[0].message).equal('FOODNAME_LENGTH_ERROR');
    });
  });
  describe('/any/random/v1', () => {
    before(seedData);
    after(globals.destroyAllHook);

    it('autocompletes for :foodname', async () => {
      const res = await agent.getWithToken('/api/food/any/random/v1');
      expect(res.statusCode).equal(200);
      expect(typeof res.body.id).equal('number');
    });
  });
  describe('/any/random/v1', () => {
    before(seedData);
    after(globals.destroyAllHook);

    it('gets foods with :foodname in name', async () => {
      const res = await globals.agent.getWithToken('/api/food/chick/v1');
      expect(res.statusCode).equal(200);
      expect(typeof res.body.count).equal('number');
      expect(typeof res.body.totalCount).equal('number');
      expect(res.body.query).equal('chick');
      expect(typeof res.body.abbrevs).equal('object');
    });
    it('requires :foodname.length > 3', async () => {
      const res = await agent.getWithToken('/api/food/%20h%20/v1');
      expect(res.statusCode).equal(400);
      expect(res.body[0].message).equal('FOODNAME_LENGTH_ERROR');
    });
  });
});
