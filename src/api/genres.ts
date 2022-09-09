import * as React from 'react';

import { errorLog } from 'utils/logger';

import { useApiUrl } from './api';

type GetGenres = {
  callback: (genres: string[]) => void;
  type?: Type;
};

export const useGetGenres = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, type = 'tv' }: GetGenres) => {
      try {
        const response = await fetch(apiUrl({ query: `genre/${type}/list` }));
        const json = await response.json();
        callback(json?.genres);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
