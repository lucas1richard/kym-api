const AppError = include('configure/appError');
const Abbrev = require('../../abbrev');

module.exports = removeFavoriteFood;

/**
 * Add a user favorite for a meal
 * @param {number} userId identifies the user
 * @param {number} abbrevId identifies the food
 * @param {number} meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function removeFavoriteFood(userId, abbrevId, meal) {
  const user = await this.findById(userId);
  if (!user) {
    throw new AppError(404, {
      usermessage: 'Couldn\'t find your account',
      devmessage: 'User not found (SHOULD HAVE NEVER GOTTEN HERE)'
    }, true);
  }
  const abbrev = await Abbrev.findById(abbrevId);
  if (!abbrev) {
    throw new AppError(404, {
      usermessage: 'Couldn\'t find this food',
      devmessage: 'Food not found'
    }, true);
  }
  const removed = await user.removeAbbrev(abbrev, { meal });
  return removed;
}
