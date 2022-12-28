import { FoodRecordApi } from '@kym/db';
import Joi from 'joi';
import moment from 'moment';

type GetListV1Arg = {
  date: string;
  uuid: string;
  numDays?: number;
};

const getListV1 = async ({ date, numDays = 6, uuid }: GetListV1Arg) => {
  await Joi.string().required().error(() => 'UUID_REQUIRED').validate(uuid);

  const currentDate = moment(date).format('YYYY-MM-DD');
  const laterDate = moment(date).add(numDays, 'days').format('YYYY-MM-DD');

  const records = await FoodRecordApi.findFoodRecordsByDate({
    uuid,
    date: currentDate,
    dateEnd: laterDate,
  });

  return records;
};

export default getListV1;
module.exports = getListV1;
