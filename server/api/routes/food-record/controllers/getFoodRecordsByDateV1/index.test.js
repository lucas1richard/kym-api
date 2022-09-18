const { expect } = require('chai');
const getFoodRecordsByDateV1 = require('.');

describe('getFoodRecordsByDateV1', () => {
  it('uses a default arg', async () => {
    try {
      await getFoodRecordsByDateV1();
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });
});
