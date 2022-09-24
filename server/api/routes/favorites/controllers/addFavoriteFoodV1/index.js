const { connectDatabase } = require('@kym/db');
const { User, Abbrev, UserRecordFavorites } = connectDatabase();

const addFavoriteFood = async ({ uuid, abbrevId, meal }) => {
  const abbrevWithRecordFavorite = await User.addFavoriteFood({
    uuid,
    abbrevId,
    meal,
    Abbrev,
    UserRecordFavorites,
  });

  return abbrevWithRecordFavorite;
};

module.exports = addFavoriteFood;
