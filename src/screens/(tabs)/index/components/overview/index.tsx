import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import * as React from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useCSSVariable } from 'uniwind'

import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { List } from '~/components/list'

import { Item } from './item'

type Item = NonNullable<UseGetTrendingApiResponse['all']['results']>[number] & { name?: string }

export function Overview() {
  const [activeSlide, setActiveSlide] = React.useState(0)

  const { data, isLoading } = useGetTrending()
  const results = data?.pages
    ?.map(page => page.results)
    .flat()
    .slice(0, 5)

  const viewabilityConfig = React.useMemo(() => ({ itemVisiblePercentThreshold: 51 }), [])

  const onViewableItemsChanged = React.useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<NonNullable<UseGetTrendingApiResponse['all']['results']>[number]>[]
    }) => {
      const active = viewableItems?.[0]?.index

      if (active || active === 0) {
        setActiveSlide(active)
      }
    },
    []
  )

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { backdrop_path, genre_ids, id, media_type, name, overview, title },
  }) => {
    return (
      <Item
        genres={genre_ids}
        id={id}
        imageUrl={backdrop_path ?? ''}
        overview={overview}
        title={title ?? name ?? ''}
        type={media_type as 'movie' | 'tv'}
      />
    )
  }

  return (
    <View>
      <List<Item>
        gap={6}
        id="overview-list"
        isLoading={isLoading}
        numberOfItems={1}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        renderItem={renderItem}
        results={results}
        viewabilityConfig={viewabilityConfig}
      />
      <View className="mt-3 flex-row justify-center gap-3">
        {results?.map((_, index) => (
          <Dot isActive={index === activeSlide} key={`overview-list-dot-${index}`} />
        ))}
      </View>
    </View>
  )
}

function Dot({ isActive }: { isActive: boolean }) {
  const progress = useSharedValue(isActive ? 1 : 0)
  const inactiveColor = useCSSVariable('--color-pagination-dot') as string
  const activeColor = useCSSVariable('--color-pagination-dot-active') as string

  React.useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 300 })
  }, [progress, isActive])

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [inactiveColor, activeColor]),
    width: interpolate(progress.value, [0, 1], [8, 30]),
  }))

  return <Animated.View className="h-2 rounded-[10px]" style={animatedStyle} />
}
