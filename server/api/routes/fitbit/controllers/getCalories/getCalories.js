const app = include('app');
const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();

/**
 * Try to get the calories with the user's fitbit token.
 * If the fitbit token is invalid, exchange it and try again.
 * @param {string} uuid
 * @param {string} startDate
 * @param {string} endDate
 */
async function getCalories(uuid, startDate, endDate) {
  try {
    const { data } = await User.requestCalories(uuid, startDate, endDate);
    return data['activities-calories'];
  } catch (err) {
    const user = await User.findOne({ where: { uuid: uuid } });

    // If there's an error, it's because the token was expired, so get a new one */
    /**
     * @type {{ data: { 'activities-calories': Array<*> }}}
     */
    const calories = await User.exRefreshToken(user.fitbitRefreshToken, uuid, app.get('oauth').fitbitInfo.refreshBuffer);
    return calories.data['activities-calories'];
  }
}

module.exports = getCalories;
