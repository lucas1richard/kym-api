import { FoodRecordApi } from '@kym/db';

type GetFoodRecordMicroByDateV1Arg = { uuid: string; date: string };

const getFoodRecordMicroByDateV1 = async ({ uuid, date }: GetFoodRecordMicroByDateV1Arg) => {
  const records = await FoodRecordApi.findMicroByDate({ date, uuid });
  
  return records;
};

export default getFoodRecordMicroByDateV1;
module.exports = getFoodRecordMicroByDateV1;
