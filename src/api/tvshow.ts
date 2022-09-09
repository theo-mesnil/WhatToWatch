import * as React from 'react';

import { convertArrayToMinutes } from 'utils/dates';
import { formatImagesData } from 'utils/images';
import { errorLog } from 'utils/logger';

import { GetApi, useApiUrl } from './api';

export const useGetTvShow = (tvID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(apiUrl({ query: `tv/${tvID}`, params }));

        const dataResponse = await response.json();
        const {
          backdrop_path,
          created_by,
          episode_run_time,
          first_air_date,
          genres,
          homepage,
          last_air_date,
          name,
          networks,
          number_of_episodes,
          number_of_seasons,
          original_name,
          overview,
          seasons,
          status,
          type,
          vote_average,
          vote_count
        } = dataResponse;

        const data = {
          airDate: {
            first: first_air_date,
            last: last_air_date
          },
          backdrop: backdrop_path,
          creators: created_by?.length > 0 ? created_by : undefined,
          description: overview,
          episodesNumber: number_of_episodes,
          genres,
          homepage,
          networks,
          originalTitle: original_name,
          runtime:
            episode_run_time?.length > 0
              ? convertArrayToMinutes(episode_run_time)
              : undefined,
          seasons: seasons?.length > 0 ? seasons : undefined,
          seasonsNumber: number_of_seasons,
          status,
          title: name,
          type,
          votes: {
            number: vote_average,
            count: vote_count
          }
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return handleData;
};

export const useGetTvShowCredits = (tvID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `tv/${tvID}/credits`, params })
        );
        const dataResponse = await response.json();
        const { cast } = dataResponse;

        const data = {
          cast: cast?.length > 0 ? cast?.slice(0, 20) : undefined
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return handleData;
};

export const useGetTvShowVideos = (tvID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `tv/${tvID}/videos`, params })
        );
        const dataResponse = await response.json();
        const { results } = dataResponse;
        const data = results?.length > 0 ? results : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return handleData;
};

export const useGetTvShowImages = (tvID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `tv/${tvID}/images`, params })
        );
        const dataResponse = await response.json();
        const { backdrops, posters } = dataResponse;
        const data = {
          backdrops:
            backdrops?.length > 0 ? formatImagesData(backdrops) : undefined,
          posters: posters?.length > 0 ? formatImagesData(posters) : undefined
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return handleData;
};

export const useGetTvShowRecommendations = (tvID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `tv/${tvID}/recommendations`, params })
        );
        const dataResponse = await response.json();
        const { results } = dataResponse;
        const data = results?.length > 0 ? results?.slice(0, 10) : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return handleData;
};

export const useGetTvShowSimilar = (tvID: number) => {
  const apiUrl = useApiUrl();

  const getMovieSimilar = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await await fetch(
          apiUrl({ query: `tv/${tvID}/similar`, params })
        );
        const dataResponse = await response.json();
        const { results } = dataResponse;
        const data = results?.length > 0 ? results?.slice(0, 10) : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, tvID]
  );

  return getMovieSimilar;
};

export const useGetTvShowSeason = (tvID: number, seasonNumber: number) => {
  let episodesFormatted = React.useMemo(() => [], []);
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `tv/${tvID}/season/${seasonNumber}`, params })
        );
        const dataResponse = await response.json();
        const { episodes } = dataResponse;

        episodes?.map((episode) => {
          episodesFormatted.push({
            airDate: episode.air_date,
            episode: episode.episode_number,
            title: episode.name,
            overview: episode.overview,
            cover: episode.still_path,
            votes: {
              number: episode.vote_average,
              count: episode.vote_count
            }
          });
        });

        callback(episodes?.length > 0 ? episodesFormatted : undefined);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, episodesFormatted, seasonNumber, tvID]
  );

  return handleData;
};
