import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import * as React from 'react'
import { Animated, Dimensions, View } from 'react-native'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { Loader } from '~/components/loader'
import type { ContentType } from '~/types/content'

import { Item } from './item'

export function Overview() {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [lastContentOffset, setLastContentOffset] = React.useState(0)
  const [direction, setDirection] = React.useState<'left' | 'right'>('left')
  const [width] = React.useState(new Animated.Value(10))
  const [prevWidth] = React.useState(new Animated.Value(20))

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

  const widthAnimated = Animated.timing(width, {
    duration: 200,
    toValue: 20,
    useNativeDriver: false,
  })

  const prevWidthAnimated = Animated.timing(prevWidth, {
    duration: 200,
    toValue: 10,
    useNativeDriver: false,
  })

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (lastContentOffset > event.nativeEvent.contentOffset.x) {
      if (isScrolling) {
        setDirection('left')
      }
    } else if (lastContentOffset < event.nativeEvent.contentOffset.x) {
      if (isScrolling) {
        setDirection('right')
      }
    }
    setLastContentOffset(event.nativeEvent.contentOffset.x)
  }

  function onScrollBeginDrag() {
    setIsScrolling(true)
  }

  function onScrollEndDrag() {
    setIsScrolling(true)
  }

  React.useEffect(() => {
    prevWidthAnimated.reset()
    prevWidthAnimated.start()
    widthAnimated.reset()
    widthAnimated.start()
  }, [activeSlide, prevWidthAnimated, widthAnimated])

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
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-3">
        {results?.map((_, index) => (
          <Animated.View
            className={`h-2.5 rounded-[10px] ${index === activeSlide ? 'bg-[#cccccc]' : 'bg-[#808080]'}`}
            key={`overview-list-dot-${index}`}
            style={[
              { width: 10 },
              index === activeSlide && { width },
              direction === 'right' && index + 1 === activeSlide && { width: prevWidth },
              direction === 'left' && index - 1 === activeSlide && { width: prevWidth },
            ]}
          />
        ))}
      </View>
    </View>
  )
}
