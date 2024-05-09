import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetTvApiResponse =
  paths['/3/tv/{series_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetTvImagesApiResponse =
  paths['/3/tv/{series_id}/images']['get']['responses']['200']['content']['application/json'];
export type UseGetTvSeasonApiResponse =
  paths['/3/tv/{series_id}/season/{season_number}']['get']['responses']['200']['content']['application/json'];

export type UseGetTvApiProps = {
  id: number;
};

export type UseGetTvSeasonApiProps = {
  id: number;
  seasonNumber: number;
};

export function useGetTv(props?: UseGetTvApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}`
  });

  return useQuery({
    queryKey: ['tv', id],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvApiResponse> =
        await axios.get(queryUrl());

      const startYear = data.first_air_date
        ? new Date(data.first_air_date).getFullYear()
        : undefined;
      const endYear = data.last_air_date
        ? new Date(data.last_air_date).getFullYear()
        : undefined;

      return {
        coverUrl: data.backdrop_path,
        endYear: startYear === endYear ? undefined : endYear,
        genres: data.genres
          ?.slice(0, 2)
          .map((genre) => genre.name)
          .flat()
          .join(' - '),
        name: data.name,
        runtime:
          data.episode_run_time.reduce((partialSum, a) => partialSum + a, 0) /
          data.episode_run_time.length,
        seasons: data.seasons,
        startYear,
        tagline: data.tagline
      };
    },
    enabled: !!id
  });
}

export function useGetTvImages(props?: UseGetTvApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}/images`
  });

  return useQuery({
    queryKey: ['tv', id, 'images'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvImagesApiResponse> =
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

export function useGetTvSeason(props?: UseGetTvSeasonApiProps) {
  const { id, seasonNumber } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}/season/${seasonNumber}`
  });

  return useQuery({
    queryKey: ['tv', id, 'images', 'season', seasonNumber],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSeasonApiResponse> =
        await axios.get(queryUrl());

      return data;
    },
    enabled: !!id && !!seasonNumber
  });
}
