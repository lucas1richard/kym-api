import { DayApi } from '@kym/db';
import assert from 'assert';

type CreateUpdateDaysInput = { uuid: string, days: { [date: string]: boolean }[]}

const createUpdateDays = async ({ uuid, days }: CreateUpdateDaysInput) => {
  assert(uuid, 'NO_UUID_PROVIDED');
  assert(days, 'NO_DAYS_PROVIDED');

  return DayApi.createUpdateDays({ uuid, days });
};

export default createUpdateDays;
