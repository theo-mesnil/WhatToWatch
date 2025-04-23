import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'

import { api } from './api'
import type { paths } from './types'

export type UseGetSearchApiParams = paths['/3/search/multi']['get']['parameters']['query']

export type UseGetSearchApiProps = {
  maxPages?: number
  params?: UseGetSearchApiParams
}

export type UseGetSearchApiResponse =
  paths['/3/search/multi']['get']['responses']['200']['content']['application/json']

export function useGetSearch(props?: UseGetSearchApiProps) {
  const { maxPages = 30, params } = props || {}

  return useInfiniteQuery<UseGetSearchApiResponse, Error>({
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetSearchApiResponse> = await api.get('search/multi', {
        params: {
          ...params,
          page: pageParam,
        },
      })

      return data
    },
    // eslint-disable-next-line perfectionist/sort-objects
    initialPageParam: 1,
    // eslint-disable-next-line perfectionist/sort-objects
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    queryKey: ['search', 'multi', params, LOCALE],
  })
}
