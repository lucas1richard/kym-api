/**
 * Checks if the error is a validation error and adds a specified message
 * to the `usermessage`
 * @param {Error} err
 * @param {*} usermessage
 */
export function handleRouteError(err: any) {
  if (err.isJoi) {
    err.toSend = { // eslint-disable-line
      message: err.message,
      usermessage: err.message,
      devmessage: err.message,
    };
  }
  if (err.code === 'ERR_ASSERTION') {
    err.status = 400;
    err.message = 'Assertion Error'
  }
  return err;
}
