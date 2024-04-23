import type { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { SpecificApiParam } from './api';
import { getApi } from './api';
import type { paths } from './types';

export type UseGetSearchApiResponse =
  paths['/3/search/multi']['get']['responses']['200']['content']['application/json'];

export type UseGetSearchApiParams =
  paths['/3/search/multi']['get']['parameters']['query'];

export type UseGetSearchApiProps = {
  enabled?: UseInfiniteQueryOptions['enabled'];
  maxPages?: number;
  params?: SpecificApiParam<UseGetSearchApiParams>[];
};

export function useGetSearch(props?: UseGetSearchApiProps) {
  const { enabled = true, maxPages = 30, params } = props || {};

  const { queryParams, queryUrl } = getApi({
    query: 'search/multi',
    params
  });

  return useInfiniteQuery({
    queryKey: ['search', 'multi', ...queryParams],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetSearchApiResponse> = await axios.get(
        queryUrl(pageParam)
      );
      return data;
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined;
    }
  });
}
