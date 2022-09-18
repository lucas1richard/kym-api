const updateQuantity = require('../');
const { expect } = require('chai');

describe('routes/database/updateQuantity', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  const userUuid = globals.testData.users[0].uuid;

  it('handles empty args', async () => {
    try {
      await updateQuantity();
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });

  it('validates the request body', async () => {
    try {
      await updateQuantity({ data: {}, uuid: userUuid });
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });

  it('updates the quantity', async () => {
    const newRecord = await updateQuantity({ data: { quantity: 2, id: 1, seq: 1 }, uuid: userUuid });
    expect(newRecord).to.be.ok;
  });
});
