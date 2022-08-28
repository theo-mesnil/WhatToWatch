import axios from 'axios';
import * as React from 'react';

import { convertMinToHours } from 'utils/dates';
import { formatImagesData } from 'utils/images';
import { errorLog } from 'utils/logger';

import { Params, useApiUrl } from './api';

export const useGetMovie = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(apiUrl(`movie/${movieID}`, params));

        const dataResponse = response?.data;
        const {
          backdrop_path,
          belongs_to_collection,
          budget,
          genres,
          homepage,
          original_title,
          overview,
          production_companies,
          release_date,
          revenue,
          runtime,
          title,
          vote_average,
          vote_count
        } = dataResponse;

        const data = {
          backdrop: backdrop_path,
          budget: budget === 0 ? undefined : budget,
          collection: belongs_to_collection,
          description: overview,
          genres,
          homepage,
          originalTitle: original_title,
          productionCompanies: production_companies,
          releaseDate: release_date,
          revenue: revenue === 0 ? undefined : revenue,
          runtime: runtime ? convertMinToHours(runtime) : undefined,
          title,
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
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetMovieCredits = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(
          apiUrl(`movie/${movieID}/credits`, params)
        );
        const dataResponse = response?.data;
        const { cast, crew } = dataResponse;
        const directors = crew?.filter((credit) => credit.job === 'Director');
        const writers = crew?.filter(
          (credit) => credit.department === 'Writing'
        );
        const data = {
          cast: cast?.length > 0 ? cast?.slice(0, 20) : undefined,
          directors: directors?.length > 0 ? directors : undefined,
          writers: writers?.length > 0 ? writers : undefined
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetMovieVideos = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(
          apiUrl(`movie/${movieID}/videos`, params)
        );
        const dataResponse = response?.data;
        const { results } = dataResponse;
        const data = results?.length > 0 ? results : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetMovieImages = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(
          apiUrl(`movie/${movieID}/images`, params)
        );
        const dataResponse = response?.data;
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
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetMovieRecommendations = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(
          apiUrl(`movie/${movieID}/recommendations`, params)
        );
        const dataResponse = response?.data;
        const { results } = dataResponse;
        const data = results?.length > 0 ? results?.slice(0, 10) : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetMovieSimilar = (movieID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(
          apiUrl(`movie/${movieID}/similar`, params)
        );
        const dataResponse = response?.data;
        const { results } = dataResponse;
        const data = results?.length > 0 ? results?.slice(0, 10) : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, movieID]
  );

  return handleData;
};

export const useGetUpcoming = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void) => {
      try {
        const response = await axios.get(apiUrl('movie/upcoming'));
        callback(response?.data?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
