import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { Animated, Dimensions, View } from 'react-native';

import { fakeData30 } from 'constants/mocks';
import { theme } from 'theme';

type VerticalListProps<ItemProps> = Pick<
  FlashListProps<ItemProps>,
  | 'contentContainerStyle'
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
  results?: any;
};

export function VerticalList<ItemProps>({
  contentContainerStyle = {},
  gap = theme.space.sm,
  getScrollYPosition,
  id,
  isLoading,
  ListHeaderComponent,
  numColumns = 3,
  onEndReached,
  renderItem,
  results
}: VerticalListProps<ItemProps>) {
  const dataFormatted = isLoading ? fakeData30 : results;

  const screenWidth = Dimensions.get('window').width;
  const availableSpace = screenWidth - theme.space.marginList * 2;
  const itemSize = (availableSpace - gap * (numColumns - 1)) / numColumns;
  const [scrollY] = React.useState(new Animated.Value(0));

  React.useEffect(
    () => getScrollYPosition?.(scrollY),
    [getScrollYPosition, scrollY]
  );

  const internalRenderItem = React.useCallback(
    (props: ListRenderItemInfo<ItemProps>) => {
      if (renderItem) {
        return (
          <View
            style={{
              width: itemSize,
              marginRight: gap,
              marginBottom: gap
            }}
          >
            {renderItem(props)}
          </View>
        );
      }
    },
    [itemSize, renderItem, gap]
  );

  function renderListHeaderComponent() {
    if (ListHeaderComponent) {
      return (
        <View
          style={{
            width: availableSpace,
            marginBottom: theme.space.lg
          }}
        >
          {ListHeaderComponent as React.ReactElement}
        </View>
      );
    }

    return null;
  }

  return (
    <FlashList
      onEndReached={onEndReached}
      bounces={false}
      data={dataFormatted}
      keyExtractor={(_, index: number) =>
        isLoading ? `loading_${id}_${index}` : `${id}_${index}`
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
      contentContainerStyle={{
        ...contentContainerStyle,
        paddingLeft: theme.space.marginList,
        paddingRight: theme.space.marginList - gap
      }}
      estimatedItemSize={itemSize / (3 / 4)}
    />
  );
}
