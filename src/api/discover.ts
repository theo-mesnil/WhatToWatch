import { useInfiniteQuery } from '@tanstack/react-query'

import { LOCALE } from '~/constants/locales'

import { api } from './api'
import type { paths } from './types'

export type UseGetDiscoverMovieApiProps = {
  maxPages?: number
  params?: paths['/3/discover/movie']['get']['parameters']['query']
}
export type UseGetDiscoverMovieApiResponse =
  paths['/3/discover/movie']['get']['responses']['200']['content']['application/json']

export type UseGetDiscoverTvApiProps = {
  maxPages?: number
  params?: paths['/3/discover/tv']['get']['parameters']['query']
}
export type UseGetDiscoverTvApiResponse =
  paths['/3/discover/tv']['get']['responses']['200']['content']['application/json']

export function useGetDiscoverMovie(props?: UseGetDiscoverMovieApiProps) {
  const { maxPages = 30, params } = props || {}

  return useInfiniteQuery<UseGetDiscoverMovieApiResponse, Error>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get('discover/movie', { params: { ...params, page: pageParam } })

      return data
    },
    queryKey: ['discover', 'movie', params, LOCALE],
  })
}

export function useGetDiscoverTv(props?: UseGetDiscoverTvApiProps) {
  const { maxPages = 30, params } = props || {}

  return useInfiniteQuery<UseGetDiscoverMovieApiResponse>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get('discover/tv', { params: { ...params, page: pageParam } })

      return data
    },
    queryKey: ['discover', 'tv', params, LOCALE],
  })
}
