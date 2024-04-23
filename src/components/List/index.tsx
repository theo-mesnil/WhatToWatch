import * as React from 'react';
import type { FlatListProps, ListRenderItemInfo } from 'react-native';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import { space } from 'theme/space';

import { Text } from 'components/Text';
import { fakeData30 } from 'constants/mocks';

type VerticalListProps = Pick<
  FlatListProps<any>,
  'initialNumToRender' | 'ListHeaderComponent' | 'renderItem'
> & {
  gap?: number;
  /** uniq id for performance */
  id: string;
  isLoading?: boolean;
  marginList?: number;
  numberOfItems?: number;
  results?: any;
  title?: JSX.Element | string;
};

export function List({
  gap = space.md,
  id,
  initialNumToRender = 20,
  isLoading,
  ListHeaderComponent,
  marginList = space.md,
  numberOfItems = 3,
  renderItem,
  results,
  title
}: VerticalListProps) {
  const dataFormatted = isLoading ? fakeData30 : results;

  const screenWidth = Dimensions.get('window').width;

  const itemSize = React.useMemo(
    () =>
      screenWidth / numberOfItems -
      gap -
      marginList / numberOfItems -
      theme.space.xl / numberOfItems,
    [screenWidth, numberOfItems, gap, marginList]
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
        <View style={{ width: itemSize }}>
          {ListHeaderComponent as React.ReactElement}
        </View>
      );
    }

    return null;
  }

  return (
    <View style={styles.wrapper}>
      {title && (
        <Text variant="h2" style={{ marginLeft: marginList }}>
          {title}
        </Text>
      )}
      <Animated.FlatList
        data={dataFormatted}
        initialNumToRender={initialNumToRender}
        keyExtractor={(item, index) =>
          isLoading ? `loading_${index}_${id}` : `${index}_${item.id}_${id}`
        }
        ListHeaderComponent={renderListHeaderComponent}
        renderItem={internalRenderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          {
            gap,
            paddingHorizontal: marginList
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.lg },
  itemHeader: {
    flex: 1
  }
});
