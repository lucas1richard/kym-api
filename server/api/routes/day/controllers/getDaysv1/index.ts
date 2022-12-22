import { DayApi } from '@kym/db';

async function getDays(uuid: string) {
  if (!uuid) throw new Error('NO_UUID_PROVIDED');

  const days = await DayApi.findAllForUser({ uuid });

  return Object.fromEntries<boolean>(
    days.map(({ date, dayType }) => [date, dayType]),
  );
}

export default getDays;
