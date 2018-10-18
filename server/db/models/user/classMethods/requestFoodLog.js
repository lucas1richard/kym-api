const axios = require('axios');

module.exports = requestFoodLog;

/**
 * Get foods the user has recorded in Fitbit
 * @param {number} userId identifies the user
 * @param {string} date date for which to retrieve record
 * @return {Promise}
 * @this user
 */
/* istanbul ignore next */
function requestFoodLog(userId, date) {
  return this.findById(userId)
    .then((user) => {
      axios.defaults.headers.common.Authorization = `Bearer ${user.fitbitToken}`;
      return axios.get(`https://api.fitbit.com/1/user/${user.fitbitId}/foods/log/date/${date}.json`);
    })
    .catch((data) => ({ data, error: true }));
}
