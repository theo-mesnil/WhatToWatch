import type { ListRenderItemInfo } from 'react-native';

import type { UseGetGenreTvListApiResponse } from 'api/genres';
import { useGetGenreTvList } from 'api/genres';
import { List } from 'components/List';
import { Text } from 'components/Text';

export function TvCategories() {
  const { data, isLoading } = useGetGenreTvList();

  const renderItem = ({
    item: { name }
  }: ListRenderItemInfo<UseGetGenreTvListApiResponse['genres'][number]>) => (
    <Text>{name}</Text>
  );

  return (
    <List
      results={data}
      title="Series by categories"
      id="tv-categories"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
