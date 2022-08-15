import axios from 'axios';
import * as React from 'react';

import { errorLog } from 'utils/logger';

import { useApiUrl } from './api';

export const useGetGenres = () => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
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
