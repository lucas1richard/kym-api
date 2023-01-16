import { AxiosInstance } from 'axios';
import updateRecordStatus, { UpdateRecordsStatusArg } from './controllers/updateRecordStatusV1/index';
import addFoodRecord, { AddFoodRecordArg } from './controllers/addFoodRecordV1';
import updateQuantity, { UpdateQuantityData } from './controllers/updateQuantityV1';
import getFoodRecordsByDateV1 from './controllers/getFoodRecordsByDateV1';

interface IAGetRecordsByDateApiArg { api: AxiosInstance, date: string }

export const getRecordsByDateApiCall = async ({ api, date }: IAGetRecordsByDateApiArg) => {
  return api.get<Awaited<ReturnType<typeof getFoodRecordsByDateV1>>>(`/api/food-record/${date}/v1`);
};

interface IAddRecordApiArg { api: AxiosInstance, record: AddFoodRecordArg }

export const addFoodRecordApiCall = async ({ api, record }: IAddRecordApiArg) => {
  return api.post<Awaited<ReturnType<typeof addFoodRecord>>>('/api/food-record/v1', record);
};

interface IDeleteRecordApiArg { api: AxiosInstance, ids: number[] }

export const deleteFoodRecordApiCall = async ({ api, ids }: IDeleteRecordApiArg) => {
  return api.request<void>({
    method: 'delete',
    url: '/api/food-record/v1',
    data: { ids }
  });
};

interface IUpdateRecordQuantityApiArg extends UpdateQuantityData { api: AxiosInstance }

export const updateFoodRecordQuantityApiCall = async ({ api, ...rest }: IUpdateRecordQuantityApiArg) => {
  return api.request<Awaited<ReturnType<typeof updateQuantity>>>({
    method: 'put',
    url: '/api/food-record/quantity/v1',
    data: rest,
  });
};

interface IUpdateRecordStatusApiArg extends Omit<UpdateRecordsStatusArg, 'uuid'> { api: AxiosInstance }

export const updateFoodRecordStatusApiCall = async ({ api, ...rest }: IUpdateRecordStatusApiArg) => {
  return api.request<Awaited<ReturnType<typeof updateRecordStatus>>>({
    method: 'put',
    url: '/api/food-record/v1',
    data: rest,
  });
};
