import type { ListRenderItemInfo } from 'react-native';

import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { List } from 'components/List';
import { Text } from 'components/Text';

export function Top10() {
  const { data, isLoading } = useGetTrending({
    maxPages: 1
  });

  const renderItem = ({
    item: { title }
  }: ListRenderItemInfo<
    UseGetTrendingApiResponse['all']['results'][number]
  >) => <Text>{title}</Text>;

  return (
    <List
      results={data?.pages?.map((page) => page.results).flat()}
      title="Top 10"
      id="top-10"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
