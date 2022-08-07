import * as React from 'react';

import { useGetGenres } from 'api/genres';

type GenresContextInterface = {
  tv: Genre[];
  movie: Genre[];
};

export const GenresContext = React.createContext<GenresContextInterface>(null);

export function GenresProvider({ children }) {
  const [genresTv, setGenresTv] = React.useState();
  const [genresMovie, setGenresMovie] = React.useState();
  const getGenres = useGetGenres();

  React.useEffect(() => {
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
  return React.useContext(GenresContext);
}
