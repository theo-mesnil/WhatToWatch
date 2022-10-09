import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components/native';

import { useGetSearch } from 'api/search';
import { useGetTrending } from 'api/trending';
import { Box } from 'components/Box';
import { CategoryThumb } from 'components/CategoryThumb';
import { Centered } from 'components/Centered';
import {
  CrossIcon,
  Icon,
  MovieFillIcon,
  PeopleFillIcon,
  SearchIcon,
  TvFillIcon
} from 'components/Icon';
import { RenderItemList } from 'components/RenderItemList';
import { Text } from 'components/Text';
import { TextInput } from 'components/TextInput';
import { Touchable } from 'components/Touchable';
import { VerticalList } from 'components/VerticalList';
import { windowWidth } from 'constants/screen';
import { useHeaderHeights } from 'constants/statusBar';
import { BasicLayout } from 'layouts/Basic';
import { useHandlePressItemList } from 'utils/lists';

function renderItem(props) {
  return <RenderItemList data={props} />;
}

export function SearchScreen() {
  const [query, setQuery] = useState(undefined);
  const [trending, setTrending] = useState('loading');
  const [results, setResults] = useState(undefined);
  const getSearch = useGetSearch();
  const getTrending = useGetTrending();
  const handlePressItemList = useHandlePressItemList();
  const navigation = useNavigation();
  const theme = useTheme();
  const noSearchYet = results === undefined;
  const resultsLength = results?.length > 0;
  const { headerHeight } = useHeaderHeights();

  const noResultForSearch = !noSearchYet && !resultsLength;

  useEffect(() => {
    getTrending({ callback: setTrending, type: 'all' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!query) {
      setResults(undefined);
    }
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        getSearch({
          callback: setResults,
          params: [{ name: 'query', value: query }]
        });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function resetSearch() {
    setQuery(undefined);
  }

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => (
        <Box height={50}>
          <Box
            width={windowWidth - theme.space.lg * 2}
            height={40}
            backgroundColor="dark400"
            borderRadius="md"
            px="sm"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Icon color="light900" mr="sm" size={18} icon={SearchIcon} />
            <TextInput onChangeText={setQuery} value={query} />
            {!!query && (
              <Touchable ml="sm" onPress={resetSearch}>
                <Icon color="light900" icon={CrossIcon} />
              </Touchable>
            )}
          </Box>
        </Box>
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, query]);

  if (noResultForSearch) {
    return (
      <Centered alignItems="center" mt={headerHeight}>
        <Text textAlign="center" variant="h2" maxWidth="80%">
          <FormattedMessage id="search.noResults.subtitle" values={{ query }} />
        </Text>
      </Centered>
    );
  }

  return (
    <BasicLayout>
      <VerticalList
        resultsData={query ? results : trending}
        renderItem={renderItem}
        maxPage={1}
        numberOfColumns={3}
        onPress={handlePressItemList}
        contentContainerStyle={{ paddingTop: headerHeight }}
        ListHeaderComponent={
          !query && (
            <>
              <Box
                px="lg"
                mb="lg"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Box width={'32%'}>
                  <CategoryThumb
                    onPress={() =>
                      navigation.navigate('Trend', { type: 'movie' })
                    }
                    title={<FormattedMessage id="common.movies" />}
                    icon={MovieFillIcon}
                  />
                </Box>
                <Box width={'32%'}>
                  <CategoryThumb
                    onPress={() => navigation.navigate('Trend', { type: 'tv' })}
                    title={<FormattedMessage id="common.tvShows" />}
                    icon={TvFillIcon}
                  />
                </Box>
                <Box width={'32%'}>
                  <CategoryThumb
                    onPress={() =>
                      navigation.navigate('Trend', { type: 'person' })
                    }
                    title={<FormattedMessage id="common.person" />}
                    icon={PeopleFillIcon}
                  />
                </Box>
              </Box>
              <Text px="lg" mb="sm" numberOfLines={1} variant="h2">
                <FormattedMessage id="search.title" />
              </Text>
            </>
          )
        }
      />
    </BasicLayout>
  );
}
