import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Animated } from 'react-native'

import type { UseGetRecommendations } from '~/api/account'
import { useGetRecommendations } from '~/api/account'
import { Header } from '~/components/Header'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { BasicLayout } from '~/layouts/Basic'
import { routeByType } from '~/routes/utils'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = UseGetRecommendations['movie']['results'][number]
type TVItem = UseGetRecommendations['tv']['results'][number]

export default function Watchlist() {
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const params = useLocalSearchParams<{ type: 'movie' | 'tv' }>()
  const type = params?.type
  const { containerStyle } = useSafeHeights()
  const navigation = useNavigation()

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

  const HeaderComponent = React.useCallback(() => {
    const title =
      type === 'movie' ? (
        <FormattedMessage defaultMessage="Movies for you" id="u+53eO" />
      ) : (
        <FormattedMessage defaultMessage="Series for you" id="OoZY78" />
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
      <VerticalList<Item>
        contentContainerStyle={containerStyle}
        getScrollYPosition={getScrollYPosition}
        id="recommendations"
        isLoading={isLoading}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </BasicLayout>
  )
}
