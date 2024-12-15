import type { FlashListProps, ViewToken } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { Loader } from 'components/Loader';
import { theme } from 'theme';
import type { ContentType } from 'types/content';

import { Item } from './Item';

type Item = UseGetTrendingApiResponse['all']['results'][number];

export function Overview() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [lastContentOffset, setLastContentOffset] = React.useState(0);
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const [width] = React.useState(new Animated.Value(10));
  const [prevWidth] = React.useState(new Animated.Value(20));

  const { data, isLoading } = useGetTrending();
  const results = data?.pages
    ?.map((page) => page.results)
    .flat()
    .slice(0, 5);

  const itemSize = Dimensions.get('window').width;

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const active = viewableItems?.[0]?.index;

      if (active || active === 0) {
        setActiveSlide(active);
      }
    },
    []
  );

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    // @ts-expect-error (name is for tv type)
    item: { backdrop_path, id, media_type, name, overview, title }
  }) => {
    return (
      <View style={{ width: itemSize }}>
        <Item
          type={media_type as ContentType}
          id={id}
          title={title || name}
          imageUrl={backdrop_path}
          description={overview}
        />
      </View>
    );
  };

  const widthAnimated = Animated.timing(width, {
    toValue: 20,
    duration: 200,
    useNativeDriver: false
  });

  const prevWidthAnimated = Animated.timing(prevWidth, {
    toValue: 10,
    duration: 200,
    useNativeDriver: false
  });

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (lastContentOffset > event.nativeEvent.contentOffset.x) {
      if (isScrolling) {
        setDirection('left');
      }
    } else if (lastContentOffset < event.nativeEvent.contentOffset.x) {
      if (isScrolling) {
        setDirection('right');
      }
    }
    setLastContentOffset(event.nativeEvent.contentOffset.x);
  }

  function onScrollBeginDrag() {
    setIsScrolling(true);
  }

  function onScrollEndDrag() {
    setIsScrolling(true);
  }

  React.useEffect(() => {
    prevWidthAnimated.reset();
    prevWidthAnimated.start();
    widthAnimated.reset();
    widthAnimated.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide]);

  if (isLoading) {
    return (
      <View style={styles.item}>
        <Loader />
      </View>
    );
  }
  return (
    <View>
      <FlashList
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onViewableItemsChanged={onViewableItemsChanged}
        numColumns={1}
        pagingEnabled
        bounces={false}
        estimatedItemSize={itemSize}
        data={results}
        keyExtractor={(item, index) =>
          isLoading
            ? `loading_${index}_overview`
            : `${index}_${item.id}_overview`
        }
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.dots}>
        {results?.map((_, index) => (
          <Animated.View
            style={[
              styles.dot,
              index === activeSlide && {
                width
              },
              direction === 'right' &&
                index + 1 === activeSlide && {
                  width: prevWidth
                },
              direction === 'left' &&
                index - 1 === activeSlide && {
                  width: prevWidth
                },
              index === activeSlide && styles.activeDot
            ]}
            key={`overview-list-dot-${index}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { height: 600 },
  dots: {
    position: 'absolute',
    bottom: theme.space.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: theme.space.md,
    justifyContent: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors['default-400']
  },
  activeDot: {
    backgroundColor: theme.colors['default-100']
  }
});
