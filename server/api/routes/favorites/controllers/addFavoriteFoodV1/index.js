const { UserApi } = require('@kym/db');

const addFavoriteFood = async ({ uuid, abbrevId, meal }) => UserApi.addFavoriteFood({
  uuid,
  abbrevId,
  meal,
});

module.exports = addFavoriteFood;
