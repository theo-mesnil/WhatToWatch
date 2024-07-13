import { useLocalSearchParams } from 'expo-router';

import { useGetMovieImages } from 'api/movie';
import FullScreenImagesList from 'layouts/FullScreenImagesList';

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string;
    type: 'posters' | 'backdrops';
  }>();
  const movieID = Number(params.id);
  const type = params.type;
  const { data, isLoading } = useGetMovieImages({
    id: movieID,
    enabled: true
  });

  const images = data?.[type];

  return (
    <FullScreenImagesList images={images} isLoading={isLoading} type="movie" />
  );
}
