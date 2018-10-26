const crypto = require('crypto');

const genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

const generatePassSalt = (password) => {
  const salt = genRandomString(16);
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    password: value,
    salt
  };
};

const hooks = {
  /* eslint-disable no-param-reassign */
  beforeCreate(user) {
    const { password, salt } = generatePassSalt(user.password);
    user.password = password;
    user.salt = salt;
    return user;
  },
  beforeBulkCreate(users) {
    users = users.map((user) => {
      const { password, salt } = generatePassSalt(user.password);
      user.password = password;
      user.salt = salt;
      return user;
    });
    return users;
  }
};

module.exports = {
  hooks
};