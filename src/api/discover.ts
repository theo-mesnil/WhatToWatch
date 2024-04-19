import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { SpecificApiParam } from './api';
import { getApi } from './api';
import type { paths } from './types';

export type UseGetDiscoverTvShowApiResponse =
  paths['/3/discover/tv']['get']['responses']['200']['content']['application/json'];

export type UseGetDiscoverTvShowApiParams =
  paths['/3/discover/tv']['get']['parameters']['query'];

type UseGetDiscoverTvShowParams =
  SpecificApiParam<UseGetDiscoverTvShowApiParams>[];

export const useGetDiscoverTvShow = (params: UseGetDiscoverTvShowParams) => {
  const { queryParams, queryUrl } = getApi({
    query: 'discover/tv',
    params
  });

  return useInfiniteQuery({
    queryKey: ['discover', 'tv', ...queryParams],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetDiscoverTvShowApiResponse> =
        await axios.get(queryUrl(pageParam));
      return data.results;
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    maxPages: 30
  });
};
