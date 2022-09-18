const routeTestGenerator = require('./routeTest/index.js');

module.exports = (plop) => {
  plop.setGenerator('routeTest', routeTestGenerator);
};
