import { FoodRecordApi } from '@kym/db';

/**
 * {@link http://localhost:3000/api-docs/#/food-record/get_api_food_record__date_}
 */
const getFoodRecordsByDateV1 = async ({ date, uuid }: { date: string; uuid: string; }) => {
  const records = await FoodRecordApi.findFoodRecordsByDate({ date, uuid });

  return records;
};

export default getFoodRecordsByDateV1;
module.exports = getFoodRecordsByDateV1;
