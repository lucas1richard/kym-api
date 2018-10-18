/**
 * Give a consistent error object
 * @constructor
 * @constructs Error
 * @param {string|number} commonType
 * @param {*} description
 * @param {boolean} [isOperational]
 */
function appError(commonType, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.commonType = commonType;
  this.description = description;
  this.message = description;
  this.isOperational = isOperational;
}

appError.getMessage = function getMessage(err) {
  const message = err.details ? err.details[0] : err.message;
  return message;
};

module.exports = appError;
