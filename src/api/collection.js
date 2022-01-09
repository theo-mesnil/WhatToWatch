import axios from 'axios';
import { useCallback, useMemo } from 'react';

import { useApiUrl } from './api';

import { errorLog } from 'utils/logger';

export const useGetCollection = (collectionID) => {
  let moviesFormatted = useMemo(() => [], []);
  const apiUrl = useApiUrl();

  const handleData = useCallback(
    async (callback) => {
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
