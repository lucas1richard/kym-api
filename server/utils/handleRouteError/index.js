const AppError = include('configure/appError');

/**
 * Checks if the error is a validation error and adds a specified message
 * to the `usermessage`
 * @param {Error} err
 * @param {*} usermessage
 */
function handleRouteError(err, usermessage) {
  if (err.isJoi) {
    err.toSend = { // eslint-disable-line
      message: err.message,
      devmessage: AppError.getMessage(err),
      usermessage: usermessage || err.message,
    };
  }
  return err;
}

module.exports = {
  handleRouteError,
};
