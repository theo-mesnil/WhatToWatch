import axios from 'axios';
import { useCallback } from 'react';

import { useApiUrl } from './api';

import { errorLog } from 'utils/logger';

export const useGetGenres = () => {
  const apiUrl = useApiUrl();

  const handleData = useCallback(
    async (callback, type = 'tv') => {
      try {
        const response = await axios.get(apiUrl(`genre/${type}/list`));
        callback(response?.data?.genres);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl]
  );

  return handleData;
};
