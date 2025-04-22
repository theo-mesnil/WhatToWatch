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
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetSearchApiResponse> = await api.get('search/multi', {
        params: {
          ...params,
          page: pageParam,
        },
      })

      return data
    },
    queryKey: ['search', 'multi', params.query, LOCALE],
  })
}
