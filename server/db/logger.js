/* eslint-disable no-console */
const chalk = require('chalk');

const keyWords = [
  'PRAGMA', 'CREATE', 'EXISTS', 'INTEGER', 'PRIMARY', 'VARCHAR',
  'DATETIME', 'NULL', 'REFERENCES', 'AND', 'ASC', 'INDEX_LIST',
  'BETWEEN', 'BY', 'CASE', 'CURRENT_DATE', 'CURRENT_TIME', 'DELETE',
  'DESC', 'DISTINCT', 'EACH', 'ELSE', 'ELSEIF', 'FALSE', 'FOR', 'FROM',
  'GROUP', 'HAVING', 'IF', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS',
  'JOIN', 'KEY', 'KEYS', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'NOT',
  'ON', 'OPTION', 'OR', 'ORDER', 'OUT', 'OUTER', 'REPLACE', 'TINYINT',
  'RIGHT', 'SELECT', 'SET', 'TABLE', 'THEN', 'TO', 'TRUE', 'UPDATE',
  'VALUES', 'WHEN', 'WHERE', 'UNSIGNED', 'CASCADE', 'UNIQUE', 'DEFAULT',
  'ENGINE', 'TEXT', 'auto_increment', 'SHOW', 'INDEX'
];
/* istanbul ignore next */
const logger = (query) => {
  let output = query;
  output = output
    .replace(/Executing \(default\): /g, '')
    .replace(/SELECT /g, 'SELECT\n  ')
    .replace(/FROM/g, '\nFROM')
    .replace(/ AS /g, ` ${chalk.cyan('as')} `)
    .replace(/LEFT OUTER JOIN/g, '\nLEFT OUTER JOIN')
    .replace(/ ON /g, '\n  ON ')
    .replace(/RIGHT OUTER JOIN/g, '\nRIGHT OUTER JOIN')
    .replace(/ WHERE /g, '\nWHERE ')
    .replace(/"(.*?)"/g, chalk.magenta('"$1"'))
    .replace(/, /g, ',\n  ');

  keyWords.forEach((word) => {
    const regEx = new RegExp(`\\b${word}\\b`, 'g');
    output = output.replace(regEx, chalk.cyan(word.toLowerCase()));
  });
  console.log(`${output}`);
  console.log(chalk.gray('-----------------------------------'));
};

module.exports = logger;
