import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { LargeThumb } from '~/components/large-thumb'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { VerticalList } from '~/components/vertical-list'
import { BasicLayout } from '~/layouts/basic'
import { tvPath } from '~/routes'
import type { NetworkId } from '~/types/content'
import { getNetworkName } from '~/utils/networks'

type Item = NonNullable<UseGetDiscoverTvApiResponse['results']>[number]

export default function Network() {
  const params = useLocalSearchParams<{ id: string }>()
  const networkID = Number(params?.id) as NetworkId

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: {
      with_networks: networkID,
    },
  })

  const firstItem = !isLoading ? data?.pages?.[0]?.results?.[0] : undefined

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={tvPath({ id })} isLoading={isLoading}>
      <Thumb imageUrl={poster_path} type="tv" />
    </ThumbLink>
  )

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <BasicLayout title={getNetworkName(networkID)}>
      <VerticalList<Item>
        id="network"
        isLoading={isLoading}
        ListHeaderComponent={
          firstItem ? (
            <ThumbLink href={tvPath({ id: firstItem.id })} isLoading={isLoading}>
              <LargeThumb
                id={firstItem.id}
                imageUrl={firstItem.backdrop_path}
                title={firstItem.name}
                type="tv"
              />
            </ThumbLink>
          ) : (
            <LargeThumb isLoading type="tv" />
          )
        }
        onEndReached={loadMore}
        renderItem={renderItem}
        results={data?.pages?.map(page => page.results).flat()}
      />
    </BasicLayout>
  )
}
