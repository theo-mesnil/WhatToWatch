import * as React from 'react';

import { errorLog } from 'utils/logger';

import { GetApi, useApiUrl } from './api';

export const useGetDiscoverMovie = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: 'discover/movie', params })
        );
        const json = await response.json();
        callback(json?.results);
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
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(apiUrl({ query: 'discover/tv', params }));
        const json = await response.json();
        callback(json?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
