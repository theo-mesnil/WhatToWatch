import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE, REGION_CODE } from '~/constants/locales'
import type { NetworkId } from '~/types/content'
import { getNetworkFromUrl } from '~/utils/networks'

import { getApi } from './api'
import type { paths } from './types'

export type UseGetMovie = UseQueryResult<
  null | {
    coverUrl?: string
    genres: string
    networkLink?: {
      id: NetworkId
      link: string
    }
    overview: string
    rating?: {
      count: number
      votes: number
    }
    releaseDate: string
    runtime: number
    tagline: string
    title: string
  },
  Error
>
export type UseGetMovieApiProps = {
  id: number
}
export type UseGetMovieApiResponse =
  paths['/3/movie/{movie_id}']['get']['responses']['200']['content']['application/json']
export type UseGetMovieCreditsApiResponse =
  paths['/3/movie/{movie_id}/credits']['get']['responses']['200']['content']['application/json']
export type UseGetMovieEnabledApiProps = UseGetMovieApiProps & {
  enabled: boolean
}
export type UseGetMovieImagesApiResponse =
  paths['/3/movie/{movie_id}/images']['get']['responses']['200']['content']['application/json']
export type UseGetMovieNowPlayingApiResponse =
  paths['/3/movie/now_playing']['get']['responses']['200']['content']['application/json']

export type UseGetMovieSimilarApiResponse =
  paths['/3/movie/{movie_id}/similar']['get']['responses']['200']['content']['application/json']

export type UseGetMovieUpcomingApiResponse =
  paths['/3/movie/upcoming']['get']['responses']['200']['content']['application/json']

export type UseGetMovieVideosApiResponse =
  paths['/3/movie/{movie_id}/videos']['get']['responses']['200']['content']['application/json']

export function useGetMovie(props?: UseGetMovieApiProps): UseGetMovie {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieApiResponse> = await callApi()

      const networkId = getNetworkFromUrl(data.homepage)

      return {
        coverUrl: data.backdrop_path,
        genres: data.genres
          ?.slice(0, 2)
          .map(genre => genre.name)
          .flat()
          .join(' - '),
        networkLink: networkId
          ? {
              id: networkId as NetworkId,
              link: data.homepage,
            }
          : undefined,
        overview: data.overview,
        rating: data.vote_average
          ? {
              count: data.vote_count,
              votes: Math.round(data.vote_average * 10) / 10,
            }
          : undefined,
        releaseDate: data.release_date,
        runtime: data.runtime,
        tagline: data.tagline,
        title: data.title,
      }
    },
    queryKey: ['movie', id, LOCALE],
  })
}

export function useGetMovieCredits(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/credits`,
  })

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieCreditsApiResponse> = await callApi()

      return {
        cast: data.cast.slice(0, 30),
      }
    },
    queryKey: ['movie', id, 'credits', LOCALE],
  })
}

export function useGetMovieImages(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const locales = `${LOCALE},en`

  const { callApi } = getApi({
    params: [
      {
        name: 'include_image_language',
        value: locales,
      },
    ],
    query: `movie/${id}/images`,
  })

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieImagesApiResponse> = await callApi()

      return data
    },
    queryKey: ['movie', id, 'images', locales],
  })
}

export function useGetMovieNowPlaying() {
  const { callApi } = getApi({
    params: [{ name: 'region', value: REGION_CODE }],
    query: 'movie/now_playing',
  })

  return useQuery({
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieNowPlayingApiResponse> = await callApi()

      return data
    },
    queryKey: ['movies', 'now_playing', REGION_CODE, LOCALE],
  })
}

export function useGetMovieSimilar(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/similar`,
  })

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieSimilarApiResponse> = await callApi()

      return data
    },
    queryKey: ['movie', id, 'similar', LOCALE],
  })
}

export function useGetMovieUpcoming() {
  const { callApi } = getApi({
    params: [{ name: 'region', value: REGION_CODE }],
    query: 'movie/upcoming',
  })

  return useQuery({
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieUpcomingApiResponse> = await callApi()

      return data
    },
    queryKey: ['movies', 'upcoming', REGION_CODE, LOCALE],
  })
}

export function useGetMovieVideos(props?: UseGetMovieApiProps) {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/videos`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieVideosApiResponse> = await callApi()

      return data
    },
    queryKey: ['movie', id, 'videos', LOCALE],
  })
}
