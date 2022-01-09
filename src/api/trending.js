import axios from 'axios';
import { useCallback } from 'react';

import { useApiUrl } from './api';

import { errorLog } from 'utils/logger';

export const useGetTrending = () => {
  const apiUrl = useApiUrl();

  const handleData = useCallback(
    async (callback, type = 'tv', params) => {
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
