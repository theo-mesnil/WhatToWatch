import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetFavorite } from '~/api/account'
import { useGetFavorite } from '~/api/account'
import { Empty } from '~/components/empty'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { VerticalList } from '~/components/vertical-list'
import { BasicLayout } from '~/layouts/basic'
import { routeByType } from '~/routes/utils'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = NonNullable<UseGetFavorite['movie']['results']>[number]
type TVItem = NonNullable<UseGetFavorite['tv']['results']>[number]

export default function Watchlist() {
  const params = useLocalSearchParams<{ type: 'movie' | 'tv' }>()
  const type = params?.type

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetFavorite({
    type,
  })
  const results = data?.pages?.map(page => page.results).flat()

  // Type guard to check if item is a movie
  const isMovie = (item: Item): item is MovieItem => {
    return item !== null && typeof item === 'object' && 'title' in item
  }

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item }) => {
    // Get the display title based on what's available
    const displayTitle = isMovie(item) ? item.title : item.name

    return (
      <ThumbLink href={routeByType({ id: item?.id, type })} isLoading={isLoading}>
        <>
          <Thumb imageUrl={item?.poster_path} imageWidth="w300" type="tv" />
          <Text numberOfLines={3}>{displayTitle}</Text>
        </>
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
      <FormattedMessage defaultMessage="My Favorites Movies" id="oXYUTN" />
    ) : (
      <FormattedMessage defaultMessage="My Favorites TV" id="vWAJia" />
    )

  return (
    <BasicLayout title={title}>
      {!isLoading && !results?.length && (
        <View className="flex-1 items-center justify-center">
          <Empty icon="heart">
            {type === 'movie' ? (
              <FormattedMessage defaultMessage="No favorite movies found" id="LMqQH5" />
            ) : (
              <FormattedMessage defaultMessage="No favorite series found" id="elUgUG" />
            )}
          </Empty>
        </View>
      )}
      <VerticalList<Item>
        id="favorite"
        isLoading={isLoading}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </BasicLayout>
  )
}
