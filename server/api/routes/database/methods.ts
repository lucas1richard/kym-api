import { ISearchDetailResponseShape } from '@kym/db/types/api/AbbrevApi';
import { AxiosInstance, AxiosResponse } from 'axios';

export interface IGetDatabaseFoods {
  (arg: { api: AxiosInstance, queryString: string, offset?: number }):
    Promise<AxiosResponse<ISearchDetailResponseShape>>;
}

export const getDatabaseFoods: IGetDatabaseFoods = async ({ api, queryString, offset }) => {
  return api({
    url: '/api/database/search-detail/v1',
    method: 'post',
    data: {
      searchVal: queryString,
    },
    params: {
      offset,
    },
  });
};
