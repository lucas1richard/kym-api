module.exports = findByDate;

/**
 * Find all meals for a given date
 * @param {string} date
 * @param {number} user_id
 * @this meal
 */
/* istanbul ignore next */
function findByDate(date, user_id) {
  if (!user_id) {
    throw new Error('No user_id specified');
  }
  const dt = new Date(date);

  return this.scope('abbrev').findAll({
    where: {
      Date: dt,
      user_id
    }
  });
}
