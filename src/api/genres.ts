import { useQuery } from '@tanstack/react-query'

import { LOCALE } from '~/constants/locales'

import { api } from './api'
import type { paths } from './types'

export type UseGetGenreMovieListApiResponse =
  paths['/3/genre/movie/list']['get']['responses']['200']['content']['application/json']
export type UseGetGenreTvListApiResponse =
  paths['/3/genre/tv/list']['get']['responses']['200']['content']['application/json']

export function useGetGenreMovieList() {
  return useQuery({
    queryFn: async () => {
      const { data } = await api.get<UseGetGenreMovieListApiResponse>('genre/movie/list')

      return data?.genres
    },
    queryKey: ['genre', 'movie', 'list', LOCALE],
  })
}

export function useGetGenreTvList() {
  return useQuery({
    queryFn: async () => {
      const { data } = await api.get<UseGetGenreTvListApiResponse>('genre/tv/list')

      return data?.genres
    },
    queryKey: ['genre', 'tv', 'list', LOCALE],
  })
}
