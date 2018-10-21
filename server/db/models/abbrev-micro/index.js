const sequelize = require('../../conn');
const getterMethods = require('./getterMethods');
const { config } = require('./config');
const { syncAbbrevId } = require('./instanceMethods');

const AbbrevMicro = sequelize.define('abbrevMicro', config,
  {
    getterMethods
  });

AbbrevMicro.prototype.syncAbbrevId = syncAbbrevId;

module.exports = AbbrevMicro;
