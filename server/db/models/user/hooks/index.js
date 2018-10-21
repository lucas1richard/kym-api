const md5 = require('crypto-md5');

const hooks = {
  /* eslint-disable no-param-reassign */
  beforeCreate(user) {
    user.password = md5(user.password, 'hex');
    return user;
  },
  beforeBulkCreate(users) {
    users = users.map((user) => {
      user.password = md5(user.password, 'hex');
      return user;
    });
    return users;
  }
}

module.exports = {
  hooks
};