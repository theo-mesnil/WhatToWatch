import * as React from 'react';
import type { FlatListProps, ListRenderItemInfo } from 'react-native';
import { Animated, Dimensions, View } from 'react-native';
import { space } from 'theme/space';

import { fakeData30 } from 'constants/mocks';

type VerticalListProps = Pick<
  FlatListProps<any>,
  | 'contentContainerStyle'
  | 'initialNumToRender'
  | 'ListHeaderComponent'
  | 'numColumns'
  | 'onEndReached'
  | 'renderItem'
> & {
  gap?: number;
  getScrollYPosition?: (value: Animated.Value) => void;
  /** uniq id for performance */
  id: string;
  isLoading?: boolean;
  marginList?: number;
  results?: any;
};

export function VerticalList({
  contentContainerStyle = {},
  gap = space.sm,
  getScrollYPosition,
  id,
  initialNumToRender = 20,
  isLoading,
  ListHeaderComponent,
  marginList = space.md,
  numColumns = 3,
  onEndReached,
  renderItem,
  results
}: VerticalListProps) {
  const dataFormatted = isLoading ? fakeData30 : results;

  const screenWidth = Dimensions.get('window').width;
  const availableSpace = screenWidth - marginList * 2 - (numColumns - 1) * gap;
  const itemSize = availableSpace / numColumns;
  const [scrollY] = React.useState(new Animated.Value(0));

  React.useEffect(
    () => getScrollYPosition?.(scrollY),
    [getScrollYPosition, scrollY]
  );

  function internalRenderItem(props: ListRenderItemInfo<any>) {
    if (renderItem) {
      return <View style={{ width: itemSize }}>{renderItem(props)}</View>;
    }

    return null;
  }

  function renderListHeaderComponent() {
    if (ListHeaderComponent) {
      return (
        <View style={{ width: screenWidth - marginList * 2 }}>
          {ListHeaderComponent as React.ReactElement}
        </View>
      );
    }

    return null;
  }

  return (
    <Animated.FlatList
      onEndReached={onEndReached}
      bounces={false}
      data={dataFormatted}
      initialNumToRender={initialNumToRender}
      keyExtractor={(item, index) =>
        isLoading ? `loading_${index}_${id}` : `${index}_${item.id}_${id}`
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
          useNativeDriver: false
        }
      )}
      numColumns={numColumns}
      onEndReachedThreshold={1}
      ListHeaderComponent={renderListHeaderComponent}
      renderItem={internalRenderItem}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={[
        {
          gap,
          marginLeft: marginList
        },
        contentContainerStyle
      ]}
    />
  );
}
