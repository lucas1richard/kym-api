const app = include('app');
const { User } = include('db');

/**
 * Try to get the calories with the user's fitbit token.
 * If the fitbit token is invalid, exchange it and try again.
 * @param {string} user_id
 * @param {string} startDate
 * @param {string} endDate
 */
async function getCalories(user_id, startDate, endDate) {
  try {
    const { data } = await User.requestCalories(user_id, startDate, endDate);
    return data['activities-calories'];
  } catch (err) {
    const user = await User.findOne({ where: { id: user_id } });

    // If there's an error, it's because the token was expired, so get a new one */
    /**
     * @type {{ data: { 'activities-calories': Array<*> }}}
     */
    const calories = await User.exRefreshToken(user.fitbitRefreshToken, user_id, app.get('oauth').fitbitInfo.refreshBuffer);
    return calories.data['activities-calories'];
  }
}

module.exports = getCalories;
