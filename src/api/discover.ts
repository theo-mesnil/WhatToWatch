import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'

import type { SpecificApiParam } from './api'
import { getApi } from './api'
import type { paths } from './types'

export type UseGetDiscoverMovieApiParams = paths['/3/discover/movie']['get']['parameters']['query']
export type UseGetDiscoverMovieApiProps = {
  maxPages?: number
  params?: SpecificApiParam<UseGetDiscoverMovieApiParams>[]
}
export type UseGetDiscoverMovieApiResponse =
  paths['/3/discover/movie']['get']['responses']['200']['content']['application/json']
export type UseGetDiscoverTvApiParams = paths['/3/discover/tv']['get']['parameters']['query']

export type UseGetDiscoverTvApiProps = {
  maxPages?: number
  params?: SpecificApiParam<UseGetDiscoverTvApiParams>[]
}

export type UseGetDiscoverTvApiResponse =
  paths['/3/discover/tv']['get']['responses']['200']['content']['application/json']

export function useGetDiscoverMovie(props?: UseGetDiscoverMovieApiProps) {
  const { maxPages = 30, params } = props || {}

  const { callApi, queryParams } = getApi({
    params,
    query: 'discover/movie',
  })

  return useInfiniteQuery<UseGetDiscoverMovieApiResponse, Error>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await callApi(pageParam as number)
      return data
    },
    queryKey: ['discover', 'movie', ...queryParams, LOCALE],
  })
}

export function useGetDiscoverTv(props?: UseGetDiscoverTvApiProps) {
  const { maxPages = 30, params } = props || {}

  const { callApi, queryParams } = getApi({
    params,
    query: 'discover/tv',
  })

  return useInfiniteQuery<UseGetDiscoverMovieApiResponse>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetDiscoverMovieApiResponse> = await callApi(
        pageParam as number
      )
      return data
    },
    queryKey: ['discover', 'tv', ...queryParams, LOCALE],
  })
}
