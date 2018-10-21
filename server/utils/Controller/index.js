const { handleRouteError } = require('../handleRouteError');

class Controller {
  constructor() {
    this.success = Symbol('success');
    this.fail = Symbol('fail');
  }
  getUserId(res) {
    if (res && res.locals) {
      return res.locals.uuid;
    }
    return null;
  }
  async tryFunction(promise, onSuccess, onFail) {
    try {
      const data = await promise;
      onSuccess(data);
    } catch (error) {
      handleRouteError(error);
      onFail(error);
    }
  }
}

module.exports = Controller;
