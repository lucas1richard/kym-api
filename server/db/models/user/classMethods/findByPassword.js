const assert = require('assert');
const md5 = require('crypto-md5');
const crypto = require('crypto');
const sequelize = require('../../../conn');

const { Op } = sequelize;

module.exports = findByPassword;

/**
 * Get the user from the password
 * @param {{ password: string }} credentials
 * @return {Promise}
 * @this user
 * @async
 */
async function findByPassword(credentials) {
  assert(!!credentials, 'No credentials provided');
  assert(!!credentials.password, 'Password must be included in credentials');
  assert.strict.notEqual(credentials.password.length, 0, 'Password cannot be an empty string');

  const cred = Object.assign({}, credentials);
  cred.password = md5(credentials.password, 'hex');
  cred.email = {
    [Op.iLike]: credentials.email
  };

  // get the salt
  const userInstance = await this.scope('').findOne({
    where: {
      email: {
        [Op.iLike]: credentials.email
      }
    }
  });

  const { salt } = userInstance;
  const hash = crypto.createHmac('sha512', salt);
  hash.update(credentials.password);
  const value = hash.digest('hex');


  
  return this
    .scope('measurements', 'meal-goals')
    .findOne({
      where: {
        email: {
          [Op.iLike]: credentials.email
        },
        password: value
      }
    });
}
