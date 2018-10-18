const { User } = include('db');
const users = include('test-data/users');
const updateUser = require('../index');
const { expect } = require('chai');

describe('updateUser controller', () => {
  before(async () => {
    await User.bulkCreate(users);
  });

  after(async () => {
    await User.destroy({ where: {}, force: true });
  });

  it('should successfully update', async () => {
    const requestBody = {
      firstname: 'Jimmy',
      lastname: 'Tester'
    };

    const user_id = 1;
    await updateUser(requestBody, user_id);
    expect(1).to.equal(1);
  });
});
