const { expect } = require('chai');
const makeMealPublicV1 = require('.');

describe('makeMealPublicV1', () => {
  it('uses a default arg', async () => {
    try {
      await makeMealPublicV1();
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });
});
