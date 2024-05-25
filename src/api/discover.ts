import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { SpecificApiParam } from './api';
import { getApi } from './api';
import type { paths } from './types';

export type UseGetDiscoverTvApiResponse =
  paths['/3/discover/tv']['get']['responses']['200']['content']['application/json'];
export type UseGetDiscoverMovieApiResponse =
  paths['/3/discover/movie']['get']['responses']['200']['content']['application/json'];
export type UseGetDiscoverTvApiParams =
  paths['/3/discover/tv']['get']['parameters']['query'];
export type UseGetDiscoverMovieApiParams =
  paths['/3/discover/movie']['get']['parameters']['query'];

export type UseGetDiscoverTvApiProps = {
  maxPages?: number;
  params?: SpecificApiParam<UseGetDiscoverTvApiParams>[];
};

export type UseGetDiscoverMovieApiProps = {
  maxPages?: number;
  params?: SpecificApiParam<UseGetDiscoverMovieApiParams>[];
};

export function useGetDiscoverTv(props?: UseGetDiscoverTvApiProps) {
  const { maxPages = 30, params } = props || {};

  const { queryParams, queryUrl } = getApi({
    query: 'discover/tv',
    params
  });

  return useInfiniteQuery({
    queryKey: ['discover', 'tv', ...queryParams],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetDiscoverTvApiResponse> =
        await axios.get(queryUrl(pageParam));
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined;
    }
  });
}

export function useGetDiscoverMovie(props?: UseGetDiscoverMovieApiProps) {
  const { maxPages = 30, params } = props || {};

  const { queryParams, queryUrl } = getApi({
    query: 'discover/movie',
    params
  });

  return useInfiniteQuery({
    queryKey: ['discover', 'movie', ...queryParams],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetDiscoverMovieApiResponse> =
        await axios.get(queryUrl(pageParam));
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined;
    }
  });
}
