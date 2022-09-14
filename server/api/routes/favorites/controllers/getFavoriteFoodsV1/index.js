const { connectDatabase } = require('@kym/db');
const { User, UserRecordFavorites, Abbrev } = connectDatabase();

const getFavoriteFoods = async (uuid) => {
  const data = await User.findFavoriteFoods({ uuid, Abbrev, UserRecordFavorites });
  return data;
};

module.exports = getFavoriteFoods;
