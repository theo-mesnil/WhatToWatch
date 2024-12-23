import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { LOCALE_I18N } from 'constants/locales';

export const BASE_API_URL = 'https://api.themoviedb.org/3/';

export type SpecificApiParam<Params> = keyof Params extends infer K
  ? K extends keyof Params
    ? { name: K; value: Params[K] }
    : never
  : never;

export type ApiParams = {
  name: string;
  value: string | number | boolean;
}[];

export type GetApiUrlProps = {
  params?: ApiParams;
  query: string;
};

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

type GetApiUrlReturn = {
  callApi: <T = any>(
    page?: number,
    method?: HttpMethod
  ) => Promise<AxiosResponse<T>>;
  queryParams?: string[];
};

export type CallApiProps = {
  method?: HttpMethod;
  page?: number;
};

export function getApi({ params, query }: GetApiUrlProps): GetApiUrlReturn {
  let queryParamsUrl = '';
  let queryParams = [] as string[];

  params &&
    params.map((param) => {
      const value = encodeURIComponent(param.value);
      queryParamsUrl += `&${param.name}=${value}`;
      queryParams.push(`${param.name}:${value}`);
    });

  const queryUrl = (page?: number) => {
    const pageParam = page ? `&page=${page}` : '';

    return `${BASE_API_URL}${query}?language=${LOCALE_I18N}${pageParam}${queryParamsUrl}`;
  };

  const callApi = <T = any>(
    page?: number,
    method: HttpMethod = 'get'
  ): Promise<AxiosResponse<T>> => {
    return axios({
      method,
      url: queryUrl(page),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_THEMOVIEDB_API_KEY}`
      }
    });
  };

  return {
    queryParams,
    callApi
  };
}
