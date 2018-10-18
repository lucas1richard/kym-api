const sequelize = require('../../../conn');
const assert = require('assert');

module.exports = findByDate;

/**
 * Find all the foods recorded on a given date
 * @param {string} date the date by which to search
 * @param {number} user_id identifies the user
 * @this food-record
 */
function findByDate(date, user_id) {
  assert.equal(typeof date, 'string', 'date should be a string');
  assert(!!user_id, 'No user_id specified');

  const normDate = new Date(date);

  return this.findAll({
    where: {
      Date: normDate,
      user_id
    },
    include: [sequelize.models.meal]
  });
}
