import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverMovieApiResponse } from 'api/discover';
import { useGetDiscoverMovie } from 'api/discover';
import { List } from 'components/List';
import { Text } from 'components/Text';

export function Documentaries() {
  const { data, isLoading } = useGetDiscoverMovie({
    params: [{ name: 'with_genres', value: '99' }]
  });

  const renderItem = ({
    item: { title }
  }: ListRenderItemInfo<UseGetDiscoverMovieApiResponse['results'][number]>) => (
    <Text>{title}</Text>
  );

  return (
    <List
      results={data?.pages?.map((page) => page.results).flat()}
      title="Documentaries"
      id="documentaries"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
