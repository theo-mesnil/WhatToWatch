import { useNavigation } from 'expo-router';
import React from 'react';
import { useIntl } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { Animated, StyleSheet } from 'react-native';
import { theme } from 'theme';

import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { Header } from 'components/Header';
import { Text } from 'components/Text';
import { TextInput } from 'components/TextInput';
import { Thumb } from 'components/Thumb';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

export default function Search() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const navigation = useNavigation();
  const { formatMessage } = useIntl();
  const { containerStyle } = useSafeHeights(true);

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetTrending({
    maxPages: 3
  });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({
    item: { media_type, poster_path }
  }: ListRenderItemInfo<
    UseGetTrendingApiResponse['all']['results'][number]
  >) => {
    return (
      <Thumb
        isLoading={isLoading}
        type={media_type}
        imageUrl={poster_path}
        imageWidth="w300"
      />
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: ({ options: { title } }: HeaderOptions) => (
        <Header
          title={title}
          scrollY={scrollYPosition}
          component={
            <TextInput
              enterKeyHint="search"
              placeholder={formatMessage({
                id: 'search.textInput.placeholder'
              })}
            />
          }
        />
      )
    });
  }, [formatMessage, navigation, scrollYPosition]);

  return (
    <BasicLayout isView>
      <VerticalList
        id="search-trending"
        isLoading={isLoading}
        renderItem={renderItem}
        getScrollYPosition={getScrollYPosition}
        results={data?.pages?.map((page) => page.results).flat()}
        onEndReached={loadMore}
        numColumns={2}
        contentContainerStyle={containerStyle}
        ListHeaderComponent={
          <Text variant="h2" style={styles.listTitle}>
            {formatMessage({ id: 'search.title' })}
          </Text>
        }
      />
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    marginTop: theme.space.xl
  }
});
