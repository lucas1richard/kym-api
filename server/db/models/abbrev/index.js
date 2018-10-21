/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

const sequelize = require('../../conn');

const calculateMacros = require('./classMethods/calculateMacros');
const fpCalculateMacros = require('./classMethods/fpCalculateMacros');
const dayCalculation = require('./classMethods/dayCalculation');
const getterMethods = require('./getterMethods');
const hooks = require('./hooks');
const { scopes, defaultScope } = require('./scopes');
const { config } = require('./config');

/**
 * define the database model, abbrev
 */
const Abbrev = sequelize.define('abbrev', config, {

  /** Include Weight and FoodDesc */
  defaultScope,

  getterMethods,

  scopes,

  hooks
});

Abbrev.calculateMacros = calculateMacros;
Abbrev.fpCalculateMacros = fpCalculateMacros;
Abbrev.dayCalculation = dayCalculation;

module.exports = Abbrev;
