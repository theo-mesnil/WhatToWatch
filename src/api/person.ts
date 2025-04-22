import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'

import { getApi } from './api'
import type { paths } from './types'

export type UseGetPerson = UseQueryResult<
  null | {
    biography?: string
    birthday?: string
    coverUrl?: string
    deathday?: string
    department?: 'Acting' | 'Director' | 'Writing'
    name: string
    placeOfBirth?: string
  },
  Error
>
export type UseGetPersonApiProps = {
  id: number
}
export type UseGetPersonApiResponse =
  paths['/3/person/{person_id}']['get']['responses']['200']['content']['application/json']
export type UseGetPersonCreditsApiResponse =
  paths['/3/person/{person_id}/combined_credits']['get']['responses']['200']['content']['application/json']
export type UseGetPersonImagesApiResponse =
  paths['/3/person/{person_id}/images']['get']['responses']['200']['content']['application/json']
export type UseGetPersonMovieCreditsApiResponse =
  paths['/3/person/{person_id}/movie_credits']['get']['responses']['200']['content']['application/json']

export type UseGetPersonPopularApiResponse =
  paths['/3/person/popular']['get']['responses']['200']['content']['application/json']

export type UseGetPersonTvCreditsApiResponse =
  paths['/3/person/{person_id}/tv_credits']['get']['responses']['200']['content']['application/json']

export type UseGetPersonWithDepartmentApiProps = UseGetPersonApiProps & {
  isActing: boolean
}

export function useGetPerson(props?: UseGetPersonApiProps): UseGetPerson {
  const { id } = props || {}

  const { callApi } = getApi({
    query: `person/${id}`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonApiResponse> = await callApi()

      return {
        biography: data.biography,
        birthday: data.birthday,
        coverUrl: data.profile_path,
        deathday: data.deathday as string,
        department: data.known_for_department,
        name: data.name,
        placeOfBirth: data.place_of_birth,
      }
    },
    queryKey: ['person', id, LOCALE],
  })
}

export function useGetPersonCredits(props?: UseGetPersonWithDepartmentApiProps) {
  const { id, isActing } = props || {}

  const { callApi } = getApi({
    query: `person/${id}/combined_credits`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonCreditsApiResponse> = await callApi()

      return isActing ? data.cast : data.crew
    },
    queryKey: ['person', id, 'credits', isActing, LOCALE],
  })
}

export function useGetPersonImages(props?: UseGetPersonApiProps) {
  const { id } = props || {}

  const locales = `${LOCALE},en`

  const { callApi } = getApi({
    params: [
      {
        name: 'include_image_language',
        value: locales,
      },
    ],
    query: `person/${id}/images`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonImagesApiResponse> = await callApi()

      return data.profiles
    },
    queryKey: ['person', id, 'tv', 'images', locales],
  })
}

export function useGetPersonMovieCredits(props?: UseGetPersonWithDepartmentApiProps) {
  const { id, isActing } = props || {}

  const { callApi } = getApi({
    query: `person/${id}/movie_credits`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonMovieCreditsApiResponse> = await callApi()

      return isActing ? data.cast : data.crew
    },
    queryKey: ['person', id, 'movies', isActing, LOCALE],
  })
}

export function useGetPersonPopular() {
  const { callApi } = getApi({
    query: 'person/popular',
  })

  return useQuery({
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonPopularApiResponse> = await callApi()

      return data
    },
    queryKey: ['person', 'popular', LOCALE],
  })
}

export function useGetPersonTvCredits(props?: UseGetPersonWithDepartmentApiProps) {
  const { id, isActing } = props || {}

  const { callApi } = getApi({
    query: `person/${id}/tv_credits`,
  })

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonTvCreditsApiResponse> = await callApi()

      return isActing ? data.cast : data.crew
    },
    queryKey: ['person', id, 'tv', isActing, LOCALE],
  })
}
