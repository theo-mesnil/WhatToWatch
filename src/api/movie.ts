import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { NetworkId } from 'types/content';
import { getNetworkFromUrl } from 'utils/networks';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetMovieApiResponse =
  paths['/3/movie/{movie_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetMovieImagesApiResponse =
  paths['/3/movie/{movie_id}/images']['get']['responses']['200']['content']['application/json'];
export type UseGetMovieCreditsApiResponse =
  paths['/3/movie/{movie_id}/credits']['get']['responses']['200']['content']['application/json'];

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

export function useGetMovieImages(props?: UseGetMovieApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `movie/${id}/images`
  });

  return useQuery({
    queryKey: ['movie', id, 'images'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetMovieImagesApiResponse> =
        await axios.get(queryUrl());

      const logoUrl = data?.logos?.[0]?.file_path;
      const logoAspectRatio = data?.logos?.[0]?.aspect_ratio;
      return {
        logo: logoUrl
          ? {
              url: logoUrl,
              aspectRatio: logoAspectRatio
            }
          : undefined
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
