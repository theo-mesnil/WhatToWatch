import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetPersonApiResponse =
  paths['/3/person/{person_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetPersonMovieCreditsApiResponse =
  paths['/3/person/{person_id}/movie_credits']['get']['responses']['200']['content']['application/json'];
export type UseGetPersonTvCreditsApiResponse =
  paths['/3/person/{person_id}/tv_credits']['get']['responses']['200']['content']['application/json'];
export type UseGetPersonPopularApiResponse =
  paths['/3/person/popular']['get']['responses']['200']['content']['application/json'];

export type UseGetPersonApiProps = {
  id: number;
};

export function useGetPerson(props?: UseGetPersonApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `person/${id}`
  });

  return useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonApiResponse> =
        await axios.get(queryUrl());

      return {
        biography: data.biography,
        birthday: data.birthday,
        coverUrl: data.profile_path,
        deathday: data.deathday as string,
        department: data.known_for_department,
        name: data.name,
        placeOfBirth: data.place_of_birth
      };
    },
    enabled: !!id
  });
}

export function useGetPersonMovieCredits(props?: UseGetPersonApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `person/${id}/movie_credits`
  });

  return useQuery({
    queryKey: ['person', id, 'movies'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonMovieCreditsApiResponse> =
        await axios.get(queryUrl());

      return data.cast.sort((a, b) => b.popularity - a.popularity);
    },
    enabled: !!id
  });
}

export function useGetPersonTvCredits(props?: UseGetPersonApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `person/${id}/tv_credits`
  });

  return useQuery({
    queryKey: ['person', id, 'tv'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonTvCreditsApiResponse> =
        await axios.get(queryUrl());

      return data.cast.sort((a, b) => b.popularity - a.popularity);
    },
    enabled: !!id
  });
}

export function useGetPersonPopular() {
  const { queryUrl } = getApi({
    query: 'person/popular'
  });

  return useQuery({
    queryKey: ['person', 'popular'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetPersonPopularApiResponse> =
        await axios.get(queryUrl());

      return data;
    }
  });
}
