const crypto = require('crypto');

var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

const hooks = {
  /* eslint-disable no-param-reassign */
  beforeCreate(user) {
    const salt = genRandomString(16);
    const hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    const value = hash.digest('hex');
    user.password = value;
    user.salt = salt;
    return user;
  },
  beforeBulkCreate(users) {
    users = users.map((user) => {
      const salt = genRandomString(16);
      const hash = crypto.createHmac('sha512', salt);
      hash.update(user.password);
      const value = hash.digest('hex');
      user.password = value;
      user.salt = salt;
      return user;
    });
    return users;
  }
};

module.exports = {
  hooks
};