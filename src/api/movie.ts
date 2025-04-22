import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE, REGION_CODE } from 'constants/locales'
import type { NetworkId } from 'types/content'
import { getNetworkFromUrl } from 'utils/networks'

import { getApi } from './api'
import type { paths } from './types'

export type UseGetMovieApiResponse =
  paths['/3/movie/{movie_id}']['get']['responses']['200']['content']['application/json']
export type UseGetMovieCreditsApiResponse =
  paths['/3/movie/{movie_id}/credits']['get']['responses']['200']['content']['application/json']
export type UseGetMovieImagesApiResponse =
  paths['/3/movie/{movie_id}/images']['get']['responses']['200']['content']['application/json']
export type UseGetMovieNowPlayingApiResponse =
  paths['/3/movie/now_playing']['get']['responses']['200']['content']['application/json']
export type UseGetMovieUpcomingApiResponse =
  paths['/3/movie/upcoming']['get']['responses']['200']['content']['application/json']
export type UseGetMovieSimilarApiResponse =
  paths['/3/movie/{movie_id}/similar']['get']['responses']['200']['content']['application/json']
export type UseGetMovieVideosApiResponse =
  paths['/3/movie/{movie_id}/videos']['get']['responses']['200']['content']['application/json']

export type UseGetMovieApiProps = {
  id: number
}

export type UseGetMovieEnabledApiProps = UseGetMovieApiProps & {
  enabled: boolean
}

export type UseGetMovie = UseQueryResult<
  {
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
  } | null,
  Error
>

export function useGetMovie(props?: UseGetMovieApiProps): UseGetMovie {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}`,
  })

  return useQuery({
    queryKey: ['movie', id, LOCALE],
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
        tagline: data.tagline,
        title: data.title,
        rating: data.vote_average
          ? {
              votes: Math.round(data.vote_average * 10) / 10,
              count: data.vote_count,
            }
          : undefined,
        releaseDate: data.release_date,
        runtime: data.runtime,
      }
    },
    enabled: !!id,
  })
}

export function useGetMovieCredits(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/credits`,
  })

  return useQuery({
    queryKey: ['movie', id, 'credits', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieCreditsApiResponse> = await callApi()

      return {
        cast: data.cast.slice(0, 30),
      }
    },
    enabled: !!id && enabled,
  })
}

export function useGetMovieImages(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const locales = `${LOCALE},en`

  const { callApi } = getApi({
    query: `movie/${id}/images`,
    params: [
      {
        name: 'include_image_language',
        value: locales,
      },
    ],
  })

  return useQuery({
    queryKey: ['movie', id, 'images', locales],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieImagesApiResponse> = await callApi()

      return data
    },
    enabled: !!id && enabled,
  })
}

export function useGetMovieNowPlaying() {
  const { callApi } = getApi({
    query: 'movie/now_playing',
    params: [{ name: 'region', value: REGION_CODE }],
  })

  return useQuery({
    queryKey: ['movies', 'now_playing', REGION_CODE, LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieNowPlayingApiResponse> = await callApi()

      return data
    },
  })
}

export function useGetMovieUpcoming() {
  const { callApi } = getApi({
    query: 'movie/upcoming',
    params: [{ name: 'region', value: REGION_CODE }],
  })

  return useQuery({
    queryKey: ['movies', 'upcoming', REGION_CODE, LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieUpcomingApiResponse> = await callApi()

      return data
    },
  })
}

export function useGetMovieSimilar(props?: UseGetMovieEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/similar`,
  })

  return useQuery({
    queryKey: ['movie', id, 'similar', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieSimilarApiResponse> = await callApi()

      return data
    },
    enabled: !!id && enabled,
  })
}

export function useGetMovieVideos(props?: UseGetMovieApiProps) {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `movie/${id}/videos`,
  })

  return useQuery({
    queryKey: ['movie', id, 'videos', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieVideosApiResponse> = await callApi()

      return data
    },
    enabled: !!id,
  })
}
