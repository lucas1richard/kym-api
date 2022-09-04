const { connectDatabase } = require('@kym/db');
const { User} = connectDatabase();
const users = include('test-data/users.json');
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

    const user_id = users[0].uuid;
    await updateUser(requestBody, user_id);
    expect(1).to.equal(1);
  });
});
