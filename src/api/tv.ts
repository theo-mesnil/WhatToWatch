import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'
import type { NetworkId } from '~/types/content'
import { getNetworkFromUrl } from '~/utils/networks'

import { api } from './api'
import type { paths } from './types'

export type UseGetTv = UseQueryResult<
  null | {
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
  },
  Error
>
export type UseGetTvApiProps = {
  id: number
}
export type UseGetTvApiResponse =
  paths['/3/tv/{series_id}']['get']['responses']['200']['content']['application/json']
export type UseGetTvCreditsApiResponse =
  paths['/3/tv/{series_id}/aggregate_credits']['get']['responses']['200']['content']['application/json']
export type UseGetTvEnabledApiProps = {
  enabled: boolean
  id: number
}
export type UseGetTvImagesApiResponse =
  paths['/3/tv/{series_id}/images']['get']['responses']['200']['content']['application/json']
export type UseGetTvRecommendationsApiResponse =
  paths['/3/tv/{series_id}/recommendations']['get']['responses']['200']['content']['application/json']

export type UseGetTvSeasonApiResponse =
  paths['/3/tv/{series_id}/season/{season_number}']['get']['responses']['200']['content']['application/json']

export type UseGetTvSimilarApiResponse =
  paths['/3/tv/{series_id}/similar']['get']['responses']['200']['content']['application/json']

export type UseGetTvVideosApiResponse =
  paths['/3/tv/{series_id}/videos']['get']['responses']['200']['content']['application/json']

export type UseGetTvWithSeasonApiProps = {
  id: number
  seasonNumber: number
}

export function useGetTv(props?: UseGetTvApiProps): UseGetTv {
  const { id } = props || {}

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvApiResponse> = await api.get(`tv/${id}`)

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
              count: data.vote_count,
              votes: Math.round(data.vote_average * 10) / 10,
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
    queryKey: ['tv', id, LOCALE],
  })
}

export function useGetTvCredits(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvCreditsApiResponse> = await api.get(
        `tv/${id}/aggregate_credits`
      )

      return {
        cast: data.cast.slice(0, 30),
      }
    },
    queryKey: ['tv', id, 'credits', LOCALE],
  })
}

export function useGetTvImages(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  const locales = `${LOCALE},en`

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvImagesApiResponse> = await api.get(`tv/${id}/images`, {
        params: {
          include_image_language: locales,
        },
      })

      return data
    },
    queryKey: ['tv', id, 'images', locales],
  })
}

export function useGetTvSeason(props?: UseGetTvWithSeasonApiProps) {
  const { id, seasonNumber } = props || {}

  return useQuery({
    enabled: !!id && !!seasonNumber,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSeasonApiResponse> = await api.get(
        `tv/${id}/season/${seasonNumber}`
      )

      return data
    },
    queryKey: ['tv', id, 'season', seasonNumber, LOCALE],
  })
}

export function useGetTvSimilar(props?: UseGetTvEnabledApiProps) {
  const { enabled, id } = props || {}

  return useQuery({
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSimilarApiResponse> = await api.get(`tv/${id}/similar`)

      return data
    },
    queryKey: ['tv', id, 'similar', LOCALE],
  })
}

export function useGetTvVideos(props?: UseGetTvApiProps) {
  const { id } = props || {}

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvVideosApiResponse> = await api.get(`tv/${id}/videos`)

      return data
    },
    queryKey: ['tv', id, 'videos', LOCALE],
  })
}
