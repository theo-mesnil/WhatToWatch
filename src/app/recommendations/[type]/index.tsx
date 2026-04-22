import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetRecommendations } from '~/api/account'
import { useGetRecommendations } from '~/api/account'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { BasicLayout } from '~/layouts/basic'
import { routeByType } from '~/routes/utils'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = NonNullable<UseGetRecommendations['movie']['results']>[number]
type TVItem = NonNullable<UseGetRecommendations['tv']['results']>[number]

export default function Watchlist() {
  const params = useLocalSearchParams<{ type: 'movie' | 'tv' }>()
  const type = params?.type

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetRecommendations({
    type,
  })
  const results = data?.pages?.map(page => page.results).flat()

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item }) => {
    return (
      <ThumbLink href={routeByType({ id: item?.id, type })} isLoading={isLoading}>
        <Thumb imageUrl={item?.poster_path} imageWidth="w300" type="tv" />
      </ThumbLink>
    )
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const title =
    type === 'movie' ? (
      <FormattedMessage defaultMessage="Movies for you" id="u+53eO" />
    ) : (
      <FormattedMessage defaultMessage="Series for you" id="OoZY78" />
    )

  return (
    <BasicLayout title={title}>
      <VerticalList<Item>
        id="recommendations"
        isLoading={isLoading}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </BasicLayout>
  )
}
