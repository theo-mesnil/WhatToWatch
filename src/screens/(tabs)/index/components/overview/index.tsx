import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import * as React from 'react'
import { Dimensions, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { Loader } from '~/components/loader'
import type { ContentType } from '~/types/content'

import { Item } from './item'

export function Overview() {
  const [activeSlide, setActiveSlide] = React.useState(0)

  const { data, isLoading } = useGetTrending()
  const results = data?.pages
    ?.map(page => page.results)
    .flat()
    .slice(0, 5)

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

  const renderItem: FlashListProps<
    NonNullable<UseGetTrendingApiResponse['all']['results']>[number] & { name?: string }
  >['renderItem'] = ({ item: { backdrop_path, id, media_type, name, overview, title } }) => {
    return (
      <View style={{ width: Dimensions.get('window').width }}>
        <Item
          description={overview}
          id={id}
          imageUrl={backdrop_path ?? ''}
          title={title ?? name ?? ''}
          type={media_type as ContentType}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View className="h-150">
        <Loader />
      </View>
    )
  }

  return (
    <View>
      <AnimatedFlashList
        bounces={false}
        data={results}
        horizontal
        keyExtractor={(item, index) =>
          isLoading ? `loading_${index}_overview` : `${index}_${item.id}_overview`
        }
        numColumns={1}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-3">
        {results?.map((_, index) => (
          <Dot isActive={index === activeSlide} key={`overview-list-dot-${index}`} />
        ))}
      </View>
    </View>
  )
}

function Dot({ isActive }: { isActive: boolean }) {
  const dotWidth = useSharedValue(isActive ? 20 : 10)

  React.useEffect(() => {
    dotWidth.value = withTiming(isActive ? 20 : 10, { duration: 200 })
  }, [dotWidth, isActive])

  const animatedStyle = useAnimatedStyle(() => ({ width: dotWidth.value }))

  return (
    <Animated.View
      className={`h-2.5 rounded-[10px] ${isActive ? 'bg-[#cccccc]' : 'bg-[#808080]'}`}
      style={animatedStyle}
    />
  )
}
