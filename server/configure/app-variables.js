const path = require('path');

const rootPath = path.join(__dirname, '../../');
const serverRoot = path.join(__dirname, '../');

const secret = process.env.JWT_SECRET;
const oauth = require('./oauthInfo');

/**
 * Setup the following variables
 * - projectRoot
 * - jwtSecret
 * - serverRoot
 * - oauth
 * @param {Express} app
 */
module.exports = (app) => {
  app.set('projectRoot', rootPath);
  app.set('jwtSecret', secret);
  app.set('serverRoot', serverRoot);
  app.set('oauth', oauth);
  app.set('port', process.env.PORT || 3000);
};
