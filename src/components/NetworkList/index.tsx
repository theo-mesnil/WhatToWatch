import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverTvApiResponse } from 'api/discover';
import { useGetDiscoverTv } from 'api/discover';
import { List } from 'components/List';
import { NetworkThumb } from 'components/NetworkThumb';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { networksList } from 'constants/networks';
import type { NetworkId } from 'types/content';

type NetworkListProps = {
  id: NetworkId;
};

export function NetworkList({ id }: NetworkListProps) {
  const network = networksList.filter((item) => item.id === id)[0];
  const { data, isLoading } = useGetDiscoverTv({
    params: [
      {
        name: 'with_networks',
        value: id
      }
    ],
    maxPages: 1
  });

  const results = data?.pages?.map((page) => page.results).flat();
  const networkHref = `/network/${id}`;

  const renderItem = ({
    item: { id: tvId, poster_path }
  }: ListRenderItemInfo<UseGetDiscoverTvApiResponse['results'][number]>) => (
    <ThumbLink isLoading={isLoading} href={`/tv/${tvId}`}>
      <Thumb type="tv" imageUrl={poster_path} />
    </ThumbLink>
  );

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
        <ThumbLink href={networkHref}>
          <NetworkThumb id={id} />
        </ThumbLink>
      }
      id={network.slug}
      renderItem={renderItem}
      results={results}
    />
  );
}
