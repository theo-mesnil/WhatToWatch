import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from 'constants/locales'
import type { NetworkId } from 'types/content'
import { getNetworkFromUrl } from 'utils/networks'

import { getApi } from './api'
import type { paths } from './types'

export type UseGetTvApiResponse =
  paths['/3/tv/{series_id}']['get']['responses']['200']['content']['application/json']
export type UseGetTvSeasonApiResponse =
  paths['/3/tv/{series_id}/season/{season_number}']['get']['responses']['200']['content']['application/json']
export type UseGetTvCreditsApiResponse =
  paths['/3/tv/{series_id}/aggregate_credits']['get']['responses']['200']['content']['application/json']
export type UseGetTvImagesApiResponse =
  paths['/3/tv/{series_id}/images']['get']['responses']['200']['content']['application/json']
export type UseGetTvSimilarApiResponse =
  paths['/3/tv/{series_id}/similar']['get']['responses']['200']['content']['application/json']
export type UseGetTvRecommendationsApiResponse =
  paths['/3/tv/{series_id}/recommendations']['get']['responses']['200']['content']['application/json']
export type UseGetTvVideosApiResponse =
  paths['/3/tv/{series_id}/videos']['get']['responses']['200']['content']['application/json']

export type UseGetTvApiProps = {
  id: number
}

export type UseGetTvEnabledApiProps = {
  enabled: boolean
  id: number
}

export type UseGetTvWithSeasonApiProps = {
  id: number
  seasonNumber: number
}

export type UseGetTv = UseQueryResult<
  {
    coverUrl?: string
    endYear?: number
    genres?: string
    name: string
    networkLink?: {
      id: NetworkId
      link: string
    }
    overview?: string
    rating?: {
      count: number
      votes: number
    }
    runtime: number
    seasons: {
      air_date: string
      episode_count: number
      id: number
      name: string
      overview: string
      poster_path?: string
      season_number: number
      vote_average: number
    }[]
    startYear?: number
    tagline?: string
  } | null,
  Error
>

export function useGetTv(props?: UseGetTvApiProps): UseGetTv {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `tv/${id}`,
  })

  return useQuery({
    queryKey: ['tv', id, LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvApiResponse> = await callApi()

      const startYear = data.first_air_date
        ? new Date(data.first_air_date).getFullYear()
        : undefined
      const endYear = data.last_air_date ? new Date(data.last_air_date).getFullYear() : undefined

      const networkId = getNetworkFromUrl(data.homepage)

      return {
        coverUrl: data.backdrop_path,
        endYear: startYear === endYear ? undefined : endYear,
        genres: data.genres
          ?.slice(0, 2)
          .map(genre => genre.name)
          .flat()
          .join(' - '),
        name: data.name,
        networkLink: networkId
          ? {
              id: networkId as NetworkId,
              link: data.homepage,
            }
          : undefined,
        overview: data.overview,
        rating: data.vote_average
          ? {
              votes: Math.round(data.vote_average * 10) / 10,
              count: data.vote_count,
            }
          : undefined,
        runtime:
          data.episode_run_time.reduce((partialSum, a) => partialSum + a, 0) /
          data.episode_run_time.length,
        seasons: data.seasons,
        startYear,
        tagline: data.tagline,
      }
    },
    enabled: !!id,
  })
}

export function useGetTvSeason(props?: UseGetTvWithSeasonApiProps) {
  const { id, seasonNumber } = props || {}

  const { callApi } = getApi({
    query: `tv/${id}/season/${seasonNumber}`,
  })

  return useQuery({
    queryKey: ['tv', id, 'season', seasonNumber, LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSeasonApiResponse> = await callApi()

      return data
    },
    enabled: !!id && !!seasonNumber,
  })
}

export function useGetTvCredits(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `tv/${id}/aggregate_credits`,
  })

  return useQuery({
    queryKey: ['tv', id, 'credits', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvCreditsApiResponse> = await callApi()

      return {
        cast: data.cast.slice(0, 30),
      }
    },
    enabled: !!id && enabled,
  })
}

export function useGetTvImages(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  const locales = `${LOCALE},en`

  const { callApi } = getApi({
    query: `tv/${id}/images`,
    params: [
      {
        name: 'include_image_language',
        value: locales,
      },
    ],
  })

  return useQuery({
    queryKey: ['tv', id, 'images', locales],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvImagesApiResponse> = await callApi()

      return data
    },
    enabled: !!id && enabled,
  })
}

export function useGetTvSimilar(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  const { callApi } = getApi({
    query: `tv/${id}/similar`,
  })

  return useQuery({
    queryKey: ['tv', id, 'similar', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSimilarApiResponse> = await callApi()

      return data
    },
    enabled: !!id && enabled,
  })
}

export function useGetTvVideos(props?: UseGetTvApiProps) {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `tv/${id}/videos`,
  })

  return useQuery({
    queryKey: ['tv', id, 'videos', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvVideosApiResponse> = await callApi()

      return data
    },
    enabled: !!id,
  })
}
