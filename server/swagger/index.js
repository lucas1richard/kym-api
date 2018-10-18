require('./paths');
const definitions = require('./definitions');
const swaggerPaths = require('./swaggerPaths');

module.exports = {
  swagger: '2.0',
  servers: [{
    url: 'http://localhost:3000'
  }],
  info: {
    version: '1.0.0',
    title: 'KnowYourMacros API',
    description: 'Documentation for the KnowYourMacros API'
  },
  schemes: [
    'http'
  ],
  host: 'localhost:3000',
  basePath: '/api',
  paths: swaggerPaths.showPaths(),
  definitions,
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'token',
      in: 'header'
    }
  }
};
