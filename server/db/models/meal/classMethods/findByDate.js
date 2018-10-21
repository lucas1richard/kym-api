const { USER } = include('db/foreignKeys');
module.exports = findByDate;

/**
 * Find all meals for a given date
 * @param {string} date
 * @param {number} uuid
 * @this meal
 */
/* istanbul ignore next */
function findByDate(date, uuid) {
  if (!uuid) {
    throw new Error('No uuid specified');
  }
  const dt = new Date(date);

  return this.scope('abbrev').findAll({
    where: {
      Date: dt,
      [USER]: uuid
    }
  });
}
