import { AbbrevApi } from '@kym/db';
const redisCounter = require('./redis/counter');

type GetFoodByNameV1arg = {
  foodname: string;
  offset?: number;
};

const getFoodByNameV1 = async ({ foodname, offset = 0 }: GetFoodByNameV1arg) => {
  await redisCounter(foodname);

  const res = await AbbrevApi.getFoodByName({ foodname, offset })
  return res;
};

export default getFoodByNameV1;
