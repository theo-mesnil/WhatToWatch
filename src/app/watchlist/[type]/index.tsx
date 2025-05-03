import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Animated, View } from 'react-native'

import type { UseGetWatchlist } from '~/api/account'
import { useGetWatchlist } from '~/api/account'
import { Empty } from '~/components/Empty'
import { Header } from '~/components/Header'
import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { BasicLayout } from '~/layouts/Basic'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = UseGetWatchlist['movie']['results'][number]
type TVItem = UseGetWatchlist['tv']['results'][number]

export default function Watchlist() {
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const params = useLocalSearchParams<{ type: 'movie' | 'tv' }>()
  const type = params?.type
  const { containerStyle, headerSafeHeight } = useSafeHeights()
  const navigation = useNavigation()

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetWatchlist({
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

  const HeaderComponent = React.useCallback(() => {
    const title =
      type === 'movie' ? (
        <FormattedMessage defaultMessage="My movies watchlist" id="h1EKCz" />
      ) : (
        <FormattedMessage defaultMessage="My series watchlist" id="f6OCCo" />
      )

    return <Header scrollY={scrollYPosition} title={title} withBackButton />
  }, [scrollYPosition, type])

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout isView>
      {!isLoading && !results?.length && (
        <View style={[{ marginTop: headerSafeHeight }, globalStyles.centered]}>
          <Empty icon="bookmark">
            {type === 'movie' ? (
              <FormattedMessage defaultMessage="No movies on watchlist" id="EB9asy" />
            ) : (
              <FormattedMessage defaultMessage="No tv on watchlist" id="x2c3j1" />
            )}
          </Empty>
        </View>
      )}
      <VerticalList<Item>
        contentContainerStyle={containerStyle}
        getScrollYPosition={getScrollYPosition}
        id="watchlist"
        isLoading={isLoading}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </BasicLayout>
  )
}
