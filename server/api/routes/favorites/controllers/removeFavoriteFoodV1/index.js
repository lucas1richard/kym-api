const { UserApi } = require('@kym/db');

const removeFavoriteFood = async ({ uuid, abbrevId, meal }) => {
  await UserApi.removeFavoriteFood({
    uuid,
    abbrevId,
    meal,
  });
};

module.exports = removeFavoriteFood;
