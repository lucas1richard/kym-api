import { AxiosResponse } from 'axios';
import { IGetDays } from './controllers/getDaysv1';

export const getDays = async (api: any): Promise<AxiosResponse<{ [k: string]: boolean }>> => {
  const res = await api.get('api/day/days/v1');
  return res;
};
