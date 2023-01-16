import { DayApi } from '@kym/db';

export interface IGetDays {
  (uuid: string): Promise<{ [k: string]: boolean }>;
}

const getDays: IGetDays = async (uuid) => {
  if (!uuid) throw new Error('NO_UUID_PROVIDED');

  const days = await DayApi.findAllForUser({ uuid });

  return Object.fromEntries<boolean>(
    days.map(({ date, dayType }) => [date, dayType]),
  );
}

export default getDays;
