import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { LOCALE } from 'constants/locales';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetGenreMovieListApiResponse =
  paths['/3/genre/movie/list']['get']['responses']['200']['content']['application/json'];
export type UseGetGenreTvListApiResponse =
  paths['/3/genre/tv/list']['get']['responses']['200']['content']['application/json'];

export function useGetGenreMovieList() {
  const { queryUrl } = getApi({
    query: 'genre/movie/list'
  });

  return useQuery({
    queryKey: ['genre', 'movie', 'list', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetGenreMovieListApiResponse> =
        await axios.get(queryUrl());

      return data?.genres;
    }
  });
}

export function useGetGenreTvList() {
  const { queryUrl } = getApi({
    query: 'genre/tv/list'
  });

  return useQuery({
    queryKey: ['genre', 'tv', 'list', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetGenreTvListApiResponse> =
        await axios.get(queryUrl());
      return data.genres;
    }
  });
}
