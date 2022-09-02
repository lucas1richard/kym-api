const { default: connectDatabase } = require('@kym/db');

const db = connectDatabase();

module.exports = db;
