/**
 * Give a consistent error object
 * @constructor
 * @constructs Error
 * @param {string} message
 */
function ValidationError(message) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.isValidationError = true;
  this.message = message;
}

module.exports = ValidationError;
