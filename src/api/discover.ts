import axios from 'axios';
import * as React from 'react';

import { errorLog } from 'utils/logger';

import { Params, useApiUrl } from './api';

export const useGetDiscoverMovie = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(apiUrl('discover/movie', params));
        callback(response?.data?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};

export const useGetDiscoverTvShow = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void, params?: Params) => {
      try {
        const response = await axios.get(apiUrl('discover/tv', params));
        callback(response?.data?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
