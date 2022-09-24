const { expect } = require('chai');
const { v4 } = require('uuid');
const getUserV1 = require('.');

describe('getUserV1', () => {
  it('requires a uuid', async () => {
    try {
      await getUserV1({});
    } catch (error) {
      expect(error.message).equal('UUID_REQUIRED');
    }
  });
  it('requires a user', async () => {
    try {
      await getUserV1({
        uuid: v4(),
      });
    } catch (error) {
      expect(error.message.devmessage).equal('USER_NOT_FOUND');
    }
  });
});
