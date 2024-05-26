import type { ListRenderItemInfo } from 'react-native';

import type { UseGetGenreTvListApiResponse } from 'api/genres';
import { useGetGenreTvList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';

export function TvCategories() {
  const { data, isLoading } = useGetGenreTvList();

  const renderItem = ({
    item: { id, name }
  }: ListRenderItemInfo<UseGetGenreTvListApiResponse['genres'][number]>) => (
    <GenreThumb id={id} title={name} />
  );

  return (
    <List
      numberOfItems={2}
      results={data}
      title="Series by categories"
      id="tv-categories"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
