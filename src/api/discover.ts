import * as React from 'react';

import type { GetApi } from './api';
import { useApiUrl } from './api';

export const useGetDiscoverTvShow = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(apiUrl({ query: 'discover/tv', params }));
        const json = await response.json();
        callback(json?.results);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
