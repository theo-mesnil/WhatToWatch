import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'

import { api } from './api'
import type { paths } from './types'

export type Type = 'all' | 'movie' | 'person' | 'tv'

export type UseGetTrendingApiProps = {
  maxPages?: number
  type?: Type
}

export type UseGetTrendingApiResponse = {
  all: paths['/3/trending/all/{time_window}']['get']['responses']['200']['content']['application/json']
  movie: paths['/3/trending/movie/{time_window}']['get']['responses']['200']['content']['application/json']
  person: paths['/3/trending/person/{time_window}']['get']['responses']['200']['content']['application/json']
  tv: paths['/3/trending/tv/{time_window}']['get']['responses']['200']['content']['application/json']
}

export function useGetTrending(props?: UseGetTrendingApiProps) {
  const { maxPages = 30, type = 'all' } = props || {}

  return useInfiniteQuery<UseGetTrendingApiResponse[Type], Error>({
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetTrendingApiResponse[Type]> = await api.get(
        `trending/${type}/day`,
        {
          params: {
            page: pageParam,
          },
        }
      )
      return data
    },
    // eslint-disable-next-line perfectionist/sort-objects
    initialPageParam: 1,
    // eslint-disable-next-line perfectionist/sort-objects
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    queryKey: ['trending', type, LOCALE],
  })
}
