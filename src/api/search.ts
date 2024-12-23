import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { LOCALE } from 'constants/locales';

import type { SpecificApiParam } from './api';
import { getApi } from './api';
import type { paths } from './types';

export type UseGetSearchApiResponse =
  paths['/3/search/multi']['get']['responses']['200']['content']['application/json'];

export type UseGetSearchApiParams =
  paths['/3/search/multi']['get']['parameters']['query'];

export type UseGetSearchApiProps = {
  maxPages?: number;
  params?: SpecificApiParam<UseGetSearchApiParams>[];
};

export function useGetSearch(props?: UseGetSearchApiProps) {
  const { maxPages = 30, params } = props || {};

  const { callApi, queryParams } = getApi({
    query: 'search/multi',
    params
  });

  return useInfiniteQuery({
    queryKey: ['search', 'multi', ...queryParams, LOCALE],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetSearchApiResponse> =
        await callApi(pageParam);

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined;
    }
  });
}
