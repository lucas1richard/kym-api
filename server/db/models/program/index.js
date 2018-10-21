const sequelize = require('../../conn');
const makeProgramObject = require('./classMethods/makeProgramObject');
const { config } = require('./config');

const Program = sequelize.define('program', config, {});

Program.makeProgramObject = makeProgramObject;

module.exports = Program;

