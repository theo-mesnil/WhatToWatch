import { Link } from 'expo-router';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverTvShowApiResponse } from 'api/discover';
import { useGetDiscoverTvShow } from 'api/discover';
import { List } from 'components/List';
import { NetworkThumb } from 'components/NetworkThumb';
import { Thumb } from 'components/Thumb';
import { Touchable } from 'components/Touchable';
import { networksList } from 'constants/networks';
import type { NetworkId } from 'types/content';

type NetworkListProps = {
  id: NetworkId;
};

export function NetworkList({ id }: NetworkListProps) {
  const network = networksList.filter((item) => item.id === id)[0];
  const { data, isLoading } = useGetDiscoverTvShow({
    params: [
      {
        name: 'with_networks',
        value: id
      }
    ],
    maxPages: 1
  });

  const results = data?.pages?.map((page) => page.results).flat();

  const renderItem = ({
    item: { poster_path }
  }: ListRenderItemInfo<
    UseGetDiscoverTvShowApiResponse['results'][number]
  >) => {
    return <Thumb type="tv" imageUrl={poster_path} />;
  };

  return (
    <List
      title={network.title}
      isLoading={isLoading}
      ListHeaderComponent={
        <Link href={`/network/${id}`} asChild>
          <Touchable>
            <NetworkThumb id={id} />
          </Touchable>
        </Link>
      }
      id={network.slug}
      renderItem={renderItem}
      results={results}
    />
  );
}
