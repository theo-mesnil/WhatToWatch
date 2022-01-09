import React, { createContext, useContext, useEffect, useState } from 'react';

import { useGetGenres } from 'api/genres';

export const GenresContext = createContext();

export function GenresProvider({ children }) {
  const [genresTv, setGenresTv] = useState();
  const [genresMovie, setGenresMovie] = useState();
  const getGenres = useGetGenres();

  useEffect(() => {
    getGenres(setGenresTv);
    getGenres(setGenresMovie, 'movie');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GenresContext.Provider value={{ tv: genresTv, movie: genresMovie }}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
