import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { REGION_CODE } from 'constants/locales';
import type { NetworkId } from 'types/content';
import { getNetworkFromUrl } from 'utils/networks';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetMovieApiResponse =
  paths['/3/movie/{movie_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetMovieCreditsApiResponse =
  paths['/3/movie/{movie_id}/credits']['get']['responses']['200']['content']['application/json'];
export type UseGetMovieNowPlayingApiResponse =
  paths['/3/movie/now_playing']['get']['responses']['200']['content']['application/json'];

export type UseGetMovieApiProps = {
  id: number;
};

export function useGetMovie(props?: UseGetMovieApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `movie/${id}`
  });

  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieApiResponse> =
        await axios.get(queryUrl());

      const networkId = getNetworkFromUrl(data.homepage);

      return {
        coverUrl: data.backdrop_path,
        genres: data.genres
          ?.slice(0, 2)
          .map((genre) => genre.name)
          .flat()
          .join(' - '),
        networkLink: networkId
          ? {
              id: networkId as NetworkId,
              link: data.homepage
            }
          : undefined,
        overview: data.overview,
        title: data.title,
        rating: data.vote_average
          ? {
              votes: Math.round(data.vote_average * 10) / 10,
              count: data.vote_count
            }
          : undefined,
        releaseDate: data.release_date,
        runtime: data.runtime
      };
    },
    enabled: !!id
  });
}

export function useGetMovieCredits(props?: UseGetMovieApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `movie/${id}/credits`
  });

  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieCreditsApiResponse> =
        await axios.get(queryUrl());

      return {
        cast: data.cast.slice(0, 30)
      };
    },
    enabled: !!id
  });
}

export function useGetMovieNowPlaying() {
  const { queryUrl } = getApi({
    query: 'movie/now_playing',
    params: [{ name: 'region', value: REGION_CODE }]
  });

  return useQuery({
    queryKey: ['movies', 'now_playing', REGION_CODE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieNowPlayingApiResponse> =
        await axios.get(queryUrl());

      return data;
    }
  });
}
