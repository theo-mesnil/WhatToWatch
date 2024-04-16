import * as React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { space } from 'theme/space';

import { fakeData30 } from 'constants/mocks';

type VerticalListProps = {
  ListHeaderComponent?: React.ReactNode;
  aspectRatio?: number;
  contentContainerStyle?: any;
  gap?: number;
  getScrollYPosition?: (value: Animated.Value) => void;
  initialNumToRender?: number;
  isLoading?: boolean;
  item: React.ElementType;
  listMargin?: number;
  maxPage?: number;
  numColumns?: number;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  results?: any;
};

export function VerticalList({
  aspectRatio,
  contentContainerStyle = {},
  gap = space.sm,
  getScrollYPosition,
  initialNumToRender = 20,
  isLoading,
  item: Item,
  ListHeaderComponent,
  listMargin = space.md,
  numColumns = 3,
  onEndReached,
  results
}: VerticalListProps) {
  const dataFormatted = isLoading ? fakeData30 : results;

  const screenWidth = Dimensions.get('window').width;
  const availableSpace = screenWidth - listMargin * 2 - (numColumns - 1) * gap;
  const itemSize = availableSpace / numColumns;
  const [scrollY] = React.useState(new Animated.Value(0));

  React.useEffect(
    () => getScrollYPosition?.(scrollY),
    [getScrollYPosition, scrollY]
  );

  function renderItem(props: any) {
    return (
      <View style={{ width: itemSize }}>
        <Item {...props} isLoading={isLoading} aspectRatio={aspectRatio} />
      </View>
    );
  }

  return (
    <Animated.FlatList
      onEndReached={onEndReached}
      bounces={false}
      data={dataFormatted}
      initialNumToRender={initialNumToRender}
      keyExtractor={(item, index) =>
        isLoading ? `loading_${index}` : `${index}_${item.id}`
      }
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollY }
            }
          }
        ],
        {
          useNativeDriver: true
        }
      )}
      numColumns={numColumns}
      onEndReachedThreshold={1}
      ListHeaderComponent={
        ListHeaderComponent ? (
          <View style={{ width: screenWidth - listMargin * 2 }}>
            {ListHeaderComponent}
          </View>
        ) : undefined
      }
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={{
        gap,
        marginLeft: listMargin,
        ...contentContainerStyle
      }}
    />
  );
}
