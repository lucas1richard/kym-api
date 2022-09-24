const { expect } = require('chai');
const getListV1 = require('.');

describe('getListV1', () => {
  it('handles no args', async () => {
    try {
      await getListV1();
    } catch (error) {
      expect(error.message).equal('UUID_REQUIRED');
    }
  });
});
