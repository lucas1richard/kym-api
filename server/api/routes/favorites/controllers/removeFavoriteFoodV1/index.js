const { connectDatabase } = require('@kym/db');
const { Abbrev, User, UserRecordFavorites } = connectDatabase();

const removeFavoriteFood = async ({ uuid, abbrevId, meal }) => {
  await User.removeFavoriteFood({
    uuid,
    abbrevId,
    meal,
    Abbrev,
    UserRecordFavorites,
  });
};

module.exports = removeFavoriteFood;
