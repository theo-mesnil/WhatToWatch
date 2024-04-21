import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type Type = 'all' | 'tv' | 'movie' | 'person';

export type UseGetTrendingApiResponse = {
  all: paths['/3/trending/all/{time_window}']['get']['responses']['200']['content']['application/json'];
  movie: paths['/3/trending/movie/{time_window}']['get']['responses']['200']['content']['application/json'];
  person: paths['/3/trending/person/{time_window}']['get']['responses']['200']['content']['application/json'];
  tv: paths['/3/trending/tv/{time_window}']['get']['responses']['200']['content']['application/json'];
};

export type UseGetTrendingApiProps = {
  maxPages?: number;
  type?: Type;
};

export function useGetTrending(props?: UseGetTrendingApiProps) {
  const { maxPages = 30, type = 'all' } = props || {};
  const { queryUrl } = getApi({
    query: `trending/${type}/day`
  });

  return useInfiniteQuery({
    queryKey: ['trending', type],
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetTrendingApiResponse[Type]> =
        await axios.get(queryUrl(pageParam));
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined;
    }
  });
}
