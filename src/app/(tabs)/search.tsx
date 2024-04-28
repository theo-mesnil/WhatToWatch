import { useNavigation } from 'expo-router';
import debounce from 'lodash.debounce';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { useGetSearch } from 'api/search';
import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { Icon, SearchFillIcon } from 'components/Icon';
import { Text } from 'components/Text';
import { TextInput } from 'components/TextInput';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

export default function Search() {
  const [querySearch, setQuerySearch] = React.useState(null);
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const navigation = useNavigation();
  const intl = useIntl();
  const { containerStyle } = useSafeHeights(true);

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetTrending({
    maxPages: 3
  });

  const {
    data: searchResults,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isLoading: isSearchLoading
  } = useGetSearch({
    params: [{ name: 'query', value: querySearch }],
    enabled: !!querySearch
  });

  const results = querySearch
    ? searchResults?.pages?.map((page) => page.results).flat()
    : data?.pages?.map((page) => page.results).flat();

  const loadMore = () => {
    if (querySearch) {
      if (hasSearchNextPage) {
        fetchSearchNextPage();
      }
    } else {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  const renderItem = ({
    item: { id, media_type, poster_path }
  }: ListRenderItemInfo<
    UseGetTrendingApiResponse['all']['results'][number]
  >) => {
    const isLoadingItem = isLoading || isSearchLoading;

    if (media_type === 'tv') {
      return (
        <ThumbLink href={`/tv/${id}`} isLoading={isLoadingItem}>
          <Thumb type={media_type} imageUrl={poster_path} imageWidth="w300" />
        </ThumbLink>
      );
    }

    return (
      <Thumb
        isLoading={isLoadingItem}
        type={media_type}
        imageUrl={poster_path}
        imageWidth="w300"
      />
    );
  };

  const renderListHeaderComponent = querySearch ? (
    <>
      {!isSearchLoading && !results.length ? (
        <View style={styles.noResults}>
          <Icon icon={SearchFillIcon} size={80} color="brand-500" />
          <Text variant="h1" style={styles.noResultsTitle}>
            <FormattedMessage
              key="no-results"
              defaultMessage="Oh no! We have found nothing 🥺"
            />
          </Text>
        </View>
      ) : (
        <Text variant="h2" style={styles.listTitle}>
          <FormattedMessage
            key="search-list-title"
            defaultMessage="We offer you:"
          />
        </Text>
      )}
    </>
  ) : (
    <Text variant="h2" style={styles.listTitle}>
      <FormattedMessage key="list-title" defaultMessage="Latest trends" />
    </Text>
  );

  const HeaderComponent = React.useCallback(
    ({ options: { title } }: HeaderOptions) => {
      return (
        <Header
          title={title}
          scrollY={scrollYPosition}
          component={
            <TextInput
              onChangeText={debounce(setQuerySearch, 300)}
              enterKeyHint="search"
              clearButtonMode="always"
              placeholder={intl.formatMessage({
                // @ts-expect-error
                key: 'placeholder',
                defaultMessage: 'What would you like to watch?'
              })}
            />
          }
        />
      );
    },
    [intl, scrollYPosition]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout isView>
      <GradientHeader scrollY={scrollYPosition} />
      <VerticalList
        id="search-trending"
        isLoading={isLoading || isSearchLoading}
        renderItem={renderItem}
        getScrollYPosition={getScrollYPosition}
        results={results}
        onEndReached={loadMore}
        numColumns={2}
        contentContainerStyle={containerStyle}
        ListHeaderComponent={renderListHeaderComponent}
      />
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    marginTop: theme.space.xl
  },
  noResults: {
    marginTop: theme.space.xl,
    alignItems: 'center'
  },
  noResultsTitle: {
    textAlign: 'center',
    marginTop: theme.space.md,
    maxWidth: 250
  }
});
