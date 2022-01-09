import axios from 'axios';
import { useCallback } from 'react';

import { useApiUrl } from './api';

import { errorLog } from 'utils/logger';

export const useGetSearch = () => {
  const apiUrl = useApiUrl();

  const handleData = useCallback(
    async (callback, params) => {
      try {
        const response = await axios.get(apiUrl('search/multi', params));
        callback(response?.data?.results);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
