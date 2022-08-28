import axios from 'axios';
import * as React from 'react';

import { errorLog } from 'utils/logger';

import { useApiUrl } from './api';

export const useGetCollection = (collectionID: number) => {
  let moviesFormatted = React.useMemo(() => [], []);
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async (callback: (data: any) => void) => {
      try {
        const response = await axios.get(apiUrl(`collection/${collectionID}`));
        const dataResponse = response?.data;
        const { backdrop_path, name, overview, parts } = dataResponse;

        parts?.map((movie) => {
          moviesFormatted.push({
            title: movie.title,
            poster_path: movie.poster_path,
            id: movie.id
          });
        });

        const data = {
          backdrop: backdrop_path,
          movies: parts?.length > 0 ? moviesFormatted : undefined,
          overview,
          title: name
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, collectionID, moviesFormatted]
  );

  return handleData;
};
