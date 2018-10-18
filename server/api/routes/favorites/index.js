const router = require('express').Router();
const addFavoriteFood = require('./controllers/addFavoriteFood');
const removeFavoriteFood = require('./controllers/removeFavoriteFood');
const getFavoriteFoods = require('./controllers/getFavoriteFoods');

module.exports = router;

router.get('/food', async function getFavorites(req, res, next) {
  try {
    const favorites = await getFavoriteFoods(res.locals.user_id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});
router.post('/food', addFavoriteFood);
router.delete('/food', removeFavoriteFood);
