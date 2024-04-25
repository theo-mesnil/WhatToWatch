import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import { FormattedMessage } from 'react-intl';
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
  const networkHref = `/network/${id}` as Href<any>;

  const renderItem = ({
    item: { poster_path }
  }: ListRenderItemInfo<
    UseGetDiscoverTvShowApiResponse['results'][number]
  >) => {
    return <Thumb type="tv" imageUrl={poster_path} />;
  };

  return (
    <List
      titleHref={networkHref}
      title={
        <>
          <FormattedMessage key="title" defaultMessage="Series on" />{' '}
          {network.title}
        </>
      }
      isLoading={isLoading}
      ListHeaderComponent={
        <Link href={networkHref} asChild>
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
