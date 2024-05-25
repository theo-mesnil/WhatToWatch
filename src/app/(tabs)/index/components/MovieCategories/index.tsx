import type { ListRenderItemInfo } from 'react-native';

import type { UseGetGenreMovieListApiResponse } from 'api/genres';
import { useGetGenreMovieList } from 'api/genres';
import { List } from 'components/List';
import { Text } from 'components/Text';

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList();

  const renderItem = ({
    item: { name }
  }: ListRenderItemInfo<UseGetGenreMovieListApiResponse['genres'][number]>) => (
    <Text>{name}</Text>
  );

  return (
    <List
      results={data}
      title="Movies by categories"
      id="categories-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
