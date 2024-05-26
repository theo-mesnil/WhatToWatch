import type { ListRenderItemInfo } from 'react-native';

import type { UseGetGenreMovieListApiResponse } from 'api/genres';
import { useGetGenreMovieList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList();

  const renderItem = ({
    item: { id, name }
  }: ListRenderItemInfo<UseGetGenreMovieListApiResponse['genres'][number]>) => (
    <GenreThumb id={id} title={name} />
  );

  return (
    <List
      numberOfItems={2}
      results={data}
      title="Movies by categories"
      id="categories-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
