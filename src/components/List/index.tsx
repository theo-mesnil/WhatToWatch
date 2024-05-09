import { type Href, Link } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import type { FlatListProps, ListRenderItemInfo } from 'react-native';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { ArrowNextIcon, Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';
import { fakeData30 } from 'constants/mocks';

type VerticalListProps = Pick<
  FlatListProps<any>,
  'initialNumToRender' | 'ListHeaderComponent' | 'renderItem'
> & {
  gap?: number;
  /** uniq id for performance */
  id: string;
  isLoading?: boolean;
  numberOfItems?: number;
  results?: any;
  title?: JSX.Element | string;
  titleHref?: Href<any>;
  /** remove resize from List render item */
  withoutSizing?: boolean;
};

export function List({
  gap = theme.space.xs,
  id,
  initialNumToRender = 20,
  isLoading,
  ListHeaderComponent,
  numberOfItems = 3,
  renderItem,
  results,
  title,
  titleHref,
  withoutSizing
}: VerticalListProps) {
  const dataFormatted = isLoading ? fakeData30 : results;

  const screenWidth = Dimensions.get('window').width;

  const itemSize = React.useMemo(
    () =>
      screenWidth / numberOfItems -
      gap -
      theme.space.marginList / numberOfItems -
      theme.space.lg / numberOfItems,
    [screenWidth, numberOfItems, gap]
  );

  const internalRenderItem = React.useCallback(
    (props: ListRenderItemInfo<any>) => {
      if (renderItem) {
        return (
          <View style={{ width: withoutSizing ? undefined : itemSize }}>
            {renderItem(props)}
          </View>
        );
      }

      return null;
    },
    [itemSize, renderItem, withoutSizing]
  );

  function renderListHeaderComponent() {
    return (
      <View style={{ width: withoutSizing ? undefined : itemSize }}>
        {ListHeaderComponent as React.ReactElement}
      </View>
    );
  }

  function getItemLayout(_: any, index: number) {
    return {
      length: itemSize,
      offset: itemSize * index + theme.space.marginList + gap * index,
      index
    };
  }

  const renderTitle = React.useMemo(() => {
    if (title) {
      const element = (
        <Text
          variant="h2"
          style={{
            marginHorizontal: theme.space.marginList
          }}
        >
          {title}
        </Text>
      );

      if (titleHref) {
        return (
          <View
            style={[styles.title, { paddingRight: theme.space.marginList }]}
          >
            {element}
            <Link href={titleHref} asChild>
              <Touchable>
                <View style={styles.moreWrapper}>
                  <Text variant="lg" style={styles.moreText}>
                    <FormattedMessage key="all-link" defaultMessage="More" />
                  </Text>
                  <Icon color="brand-700" size={20} icon={ArrowNextIcon} />
                </View>
              </Touchable>
            </Link>
          </View>
        );
      }

      return element;
    }

    return null;
  }, [title, titleHref]);

  return (
    <View style={styles.wrapper}>
      {renderTitle}
      <Animated.FlatList
        getItemLayout={withoutSizing ? undefined : getItemLayout}
        data={dataFormatted}
        initialNumToRender={initialNumToRender}
        keyExtractor={(item, index) =>
          isLoading ? `loading_${index}_${id}` : `${index}_${item.id}_${id}`
        }
        ListHeaderComponent={
          ListHeaderComponent ? renderListHeaderComponent : undefined
        }
        renderItem={internalRenderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          {
            gap,
            paddingHorizontal: theme.space.marginList
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xs },
  title: {
    flexDirection: 'row',
    gap: theme.space.xs,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreWrapper: {
    gap: theme.space.xxs,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreText: {
    color: theme.colors['brand-700']
  },
  itemHeader: {
    flex: 1
  }
});
