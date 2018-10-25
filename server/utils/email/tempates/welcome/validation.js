const { promisify } = require('util');

function validateSync(config, cb) {
  if (!config.name) {
    return cb(new Error('config must have a name'));
  }
  return cb(null, true);
}

const validateAsync = promisify(validateSync);

module.exports = validateAsync;
