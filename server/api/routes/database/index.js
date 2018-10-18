const router = require('express').Router();
const getBestGroup = require('./controllers/getBestGroup');
const getUserCreated = require('./controllers/getUserCreated');
const deleteFood = require('./controllers/deleteFood');
const searchDetail = require('./controllers/searchDetail');

module.exports = router;

const FOOD_GROUP = '/foodgroup';
const SEARCH_DETAIL = '/search-detail';
const USER_CREATED = '/user-created';

// Currently used for creating foods when the user doesn't what foodGroup
// to assign
router.get(FOOD_GROUP, getBestGroup);

// A complex search including macronutrient percent
router.post(SEARCH_DETAIL, searchDetail);

// Gets foods created by the user
router.get(USER_CREATED, getUserCreated);

// Deletes a food created by the user
router.delete(USER_CREATED, deleteFood);
