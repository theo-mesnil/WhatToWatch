import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { NetworkId } from 'types/content';
import { getNetworkFromUrl } from 'utils/networks';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetTvApiResponse =
  paths['/3/tv/{series_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetTvSeasonApiResponse =
  paths['/3/tv/{series_id}/season/{season_number}']['get']['responses']['200']['content']['application/json'];
export type UseGetTvCreditsApiResponse =
  paths['/3/tv/{series_id}/season/{season_number}/aggregate_credits']['get']['responses']['200']['content']['application/json'];

export type UseGetTvApiProps = {
  id: number;
};

export type UseGetTvWithSeasonApiProps = {
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

      const networkId = getNetworkFromUrl(data.homepage);

      return {
        coverUrl: data.backdrop_path,
        endYear: startYear === endYear ? undefined : endYear,
        genres: data.genres
          ?.slice(0, 2)
          .map((genre) => genre.name)
          .flat()
          .join(' - '),
        name: data.name,
        networkLink: networkId
          ? {
              id: networkId as NetworkId,
              link: data.homepage
            }
          : undefined,
        rating: data.vote_average
          ? {
              votes: Math.round(data.vote_average * 10) / 10,
              count: data.vote_count
            }
          : undefined,
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

export function useGetTvSeason(props?: UseGetTvWithSeasonApiProps) {
  const { id, seasonNumber } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}/season/${seasonNumber}`
  });

  return useQuery({
    queryKey: ['tv', id, 'season', seasonNumber],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvSeasonApiResponse> =
        await axios.get(queryUrl());

      return data;
    },
    enabled: !!id && !!seasonNumber
  });
}

export function useGetTvCredits(props?: UseGetTvApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}/aggregate_credits`
  });

  return useQuery({
    queryKey: ['tv', id, 'credits'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvCreditsApiResponse> =
        await axios.get(queryUrl());

      return {
        cast: data.cast.slice(0, 30)
      };
    },
    enabled: !!id
  });
}
