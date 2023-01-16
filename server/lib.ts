import { AddFoodRecordArg } from './api/routes/food-record/controllers/addFoodRecordV1/index';
import { getDays } from './api/routes/day/methods';
import { getDatabaseFoods } from './api/routes/database/methods';
import {
  updateFoodRecordStatusApiCall,
  updateFoodRecordQuantityApiCall,
  deleteFoodRecordApiCall,
  addFoodRecordApiCall,
  getRecordsByDateApiCall,
} from './api/routes/food-record/methods';

module.exports = {
  getDays,
  getDatabaseFoods,
  updateFoodRecordStatusApiCall,
  updateFoodRecordQuantityApiCall,
  deleteFoodRecordApiCall,
  addFoodRecordApiCall,
  getRecordsByDateApiCall,
};

export {
  getDays,
  getDatabaseFoods,
  AddFoodRecordArg,
  updateFoodRecordStatusApiCall,
  updateFoodRecordQuantityApiCall,
  deleteFoodRecordApiCall,
  addFoodRecordApiCall,
  getRecordsByDateApiCall,
};
