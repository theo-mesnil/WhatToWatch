import * as React from 'react';

import { errorLog } from 'utils/logger';

import { GetApi, useApiUrl } from './api';

export const useGetTrending = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params, type = 'tv' }: GetApi) => {
      try {
        const response = await fetch(
          apiUrl({ query: `trending/${type}/day`, params })
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
