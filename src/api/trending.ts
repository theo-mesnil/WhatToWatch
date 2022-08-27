import axios from 'axios';
import * as React from 'react';

import { errorLog } from 'utils/logger';

import { Params, useApiUrl } from './api';

export const useGetTrending = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (
      callback: (data: any) => void,
      type: Type = 'tv',
      params?: Params
    ) => {
      try {
        const response = await axios.get(
          apiUrl(`trending/${type}/day`, params)
        );
        callback(response?.data?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
