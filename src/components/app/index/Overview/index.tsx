import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import * as React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { Loader } from '~/components/Loader'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'

import { Item } from './Item'

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

  const itemSize = Dimensions.get('window').width

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const active = viewableItems?.[0]?.index

      if (active || active === 0) {
        setActiveSlide(active)
      }
    },
    []
  )

  const renderItem: FlashListProps<
    UseGetTrendingApiResponse['all']['results'][number]
  >['renderItem'] = ({
    // @ts-expect-error (name is for tv type)
    item: { backdrop_path, id, media_type, name, overview, title },
  }) => {
    return (
      <View style={{ width: itemSize }}>
        <Item
          description={overview}
          id={id}
          imageUrl={backdrop_path}
          title={title || name}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide])

  if (isLoading) {
    return (
      <View style={styles.item}>
        <Loader />
      </View>
    )
  }
  return (
    <View>
      <AnimatedFlashList
        bounces={false}
        data={results}
        estimatedItemSize={itemSize}
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
      <View style={styles.dots}>
        {results?.map((_, index) => (
          <Animated.View
            key={`overview-list-dot-${index}`}
            style={[
              styles.dot,
              index === activeSlide && {
                width,
              },
              direction === 'right' &&
                index + 1 === activeSlide && {
                  width: prevWidth,
                },
              direction === 'left' &&
                index - 1 === activeSlide && {
                  width: prevWidth,
                },
              index === activeSlide && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: theme.colors['default-100'],
  },
  dot: {
    backgroundColor: theme.colors['default-400'],
    borderRadius: 10,
    height: 10,
    width: 10,
  },
  dots: {
    bottom: theme.space.md,
    flexDirection: 'row',
    gap: theme.space.md,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  item: { height: 600 },
})
