import { DayApi }  from '@kym/db';
import joi from 'joi';

const destroyDays = async (uuid: string, date: string[]) => {
  await joi.string().required().error(() => 'NO_UUID_PROVIDED').validate(uuid);
  await joi.array().required().error(() => 'DATE_SHOULD_BE_ARRAY').validate(date);

  await DayApi.destroyDays({ uuid, date });

  return date;
};

export default destroyDays;
