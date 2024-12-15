import type { FlashListProps } from '@shopify/flash-list';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { UseGetDiscoverTvApiResponse } from 'api/discover';
import { useGetDiscoverTv } from 'api/discover';
import { List } from 'components/List';
import { NetworkThumb } from 'components/NetworkThumb';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { networksList } from 'constants/networks';
import { networkPath, tvPath } from 'routes';
import type { NetworkId } from 'types/content';

type NetworkListProps = {
  id: NetworkId;
};

type TvItem = UseGetDiscoverTvApiResponse['results'][number];

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

  const renderItem: FlashListProps<TvItem>['renderItem'] = ({
    item: { id: tvId, poster_path }
  }) => (
    <ThumbLink isLoading={isLoading} href={tvPath({ id: tvId })}>
      <Thumb type="tv" imageUrl={poster_path} />
    </ThumbLink>
  );

  return (
    <List<TvItem>
      titleHref={networkPath({ id })}
      title={
        <>
          <FormattedMessage defaultMessage="Series on" id="CBwLG1" />{' '}
          {network.title}
        </>
      }
      isLoading={isLoading}
      ListHeaderComponent={
        <ThumbLink href={networkPath({ id })}>
          <NetworkThumb id={id} />
        </ThumbLink>
      }
      id={network.slug}
      renderItem={renderItem}
      results={results}
    />
  );
}
