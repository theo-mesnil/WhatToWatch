import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { Animated } from 'react-native'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { LargeThumb } from '~/components/LargeThumb'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { useSafeHeights } from '~/constants/useSafeHeights'
import GenreLayout from '~/layouts//Genre'
import { tvPath } from '~/routes'

type Item = UseGetDiscoverTvApiResponse['results'][number]

export default function Tv() {
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const params = useLocalSearchParams<{ id: string }>()
  const genreID = Number(params?.id)
  const { containerStyle } = useSafeHeights()

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: {
      with_genres: `${genreID}`,
    },
  })

  const firstItem = !isLoading && data?.pages[0].results[0]

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
    <GenreLayout scrollYPosition={scrollYPosition}>
      <VerticalList<Item>
        contentContainerStyle={containerStyle}
        getScrollYPosition={getScrollYPosition}
        id="genre"
        isLoading={isLoading}
        ListHeaderComponent={
          <ThumbLink href={tvPath({ id: firstItem?.id })} isLoading={isLoading}>
            <LargeThumb
              id={firstItem?.id}
              imageUrl={firstItem?.backdrop_path}
              // @ts-expect-error wrong ts api from tmdb
              title={firstItem?.name}
              type="tv"
            />
          </ThumbLink>
        }
        onEndReached={loadMore}
        renderItem={renderItem}
        results={data?.pages?.map(page => page.results).flat()}
      />
    </GenreLayout>
  )
}
