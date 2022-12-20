const { UserApi } = require('@kym/db');

const getFavoriteFoods = async (uuid) => UserApi.findFavoriteFoods({ uuid });

module.exports = getFavoriteFoods;
