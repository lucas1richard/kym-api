const { promisify } = require('util');

function sanitizeUserSync(userInstance, cb) {
  let user;
  if (typeof userInstance.get === 'function') {
    user = {
      ...userInstance.get()
    };
  } else {
    user = {
      ...userInstance
    };
  }
  delete user.password;
  delete user.id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.fitbitId;
  delete user.fitbitToken;
  delete user.fitbitRefeshToken;
  delete user.googleId;

  return cb(null, user);
}

module.exports = promisify(sanitizeUserSync);
