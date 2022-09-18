const deleteFoodRecord = require('../index');
const { expect } = require('chai');

describe('/routes/food-record/controllers/deleteFoodRecord', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);
  it('deletes a food', async () => {
    await deleteFoodRecord({ ids: ['1'], uuid: globals.testData.users[0].uuid });
  });
  it('fails with malformed data', async () => {
    try {
      await deleteFoodRecord({ id: 1 });
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });
  it('fails with malformed data - 1', async () => {
    try {
      await deleteFoodRecord({});
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });
});
