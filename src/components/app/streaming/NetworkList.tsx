import type { FlashListProps } from '@shopify/flash-list'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { List } from '~/components/List'
import { NetworkThumb } from '~/components/NetworkThumb'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { networksList } from '~/constants/networks'
import { networkPath, tvPath } from '~/routes'
import type { NetworkId } from '~/types/content'

type NetworkListProps = {
  id: NetworkId
}

type TvItem = UseGetDiscoverTvApiResponse['results'][number]

export function NetworkList({ id }: NetworkListProps) {
  const network = networksList.filter(item => item.id === id)[0]
  const { data, isLoading } = useGetDiscoverTv({
    params: {
      with_networks: id,
    },
  })

  const results = data?.pages?.map(page => page.results).flat()

  const renderItem: FlashListProps<TvItem>['renderItem'] = ({
    item: { id: tvId, poster_path },
  }) => (
    <ThumbLink href={tvPath({ id: tvId })} isLoading={isLoading}>
      <Thumb imageUrl={poster_path} type="tv" />
    </ThumbLink>
  )

  return (
    <List<TvItem>
      id={network.slug}
      isLoading={isLoading}
      ListHeaderComponent={
        <ThumbLink href={networkPath({ id })}>
          <NetworkThumb id={id} />
        </ThumbLink>
      }
      renderItem={renderItem}
      results={results}
      title={
        <>
          <FormattedMessage defaultMessage="Series on" id="CBwLG1" /> {network.title}
        </>
      }
      titleHref={networkPath({ id })}
    />
  )
}
