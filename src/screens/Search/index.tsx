import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetSearch } from 'api/search';
import { useGetTrending } from 'api/trending';
import { Box } from 'components/Box';
import { Centered } from 'components/Centered';
import { headerHeight } from 'components/Header';
import { CrossIcon, Icon, SearchIcon } from 'components/Icon';
import { Image } from 'components/Image';
import { RenderItemList } from 'components/RenderItemList';
import { Text } from 'components/Text';
import { TextInput } from 'components/TextInput';
import { Touchable } from 'components/Touchable';
import { VerticalList } from 'components/VerticalList';
import { isAndroid } from 'constants/screen';
import { statusBarHeight } from 'constants/statusBar';
import { useHandlePressItemList } from 'utils/lists';

const searchHeaderHeight = headerHeight + 5;
const searchPaddingTop = isAndroid ? statusBarHeight + 10 : statusBarHeight;

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
  const noSearchYet = results === undefined;
  const resultsLength = results?.length > 0;
  const noResultForSearch = !noSearchYet && !resultsLength;

  useEffect(() => {
    getTrending(setTrending, 'all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!query) {
      setResults(undefined);
    }
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        getSearch(setResults, [{ name: 'query', value: query }]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function resetSearch() {
    setQuery(undefined);
  }

  return (
    <>
      <Box
        paddingTop={searchPaddingTop}
        height={searchHeaderHeight}
        alignItems="center"
        backgroundColor="ahead"
        position="absolute"
        zIndex="1"
        width={1}
      >
        <Box
          width="90%"
          height={40}
          maxWidth={360}
          backgroundColor="dark600"
          borderRadius="md"
          px="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Icon color="light900" mr="sm" size={18} icon={SearchIcon} />
          <TextInput autoFocus onChangeText={setQuery} value={query} />
          {!!query && (
            <Touchable ml="sm" onPress={resetSearch}>
              <Icon color="light900" icon={CrossIcon} />
            </Touchable>
          )}
        </Box>
      </Box>
      <VerticalList
        resultsData={query ? results : trending}
        renderItem={renderItem}
        maxPage={1}
        numberOfColumns={3}
        onPress={handlePressItemList}
        paddingTop={searchHeaderHeight}
      >
        <Centered alignItems={noResultForSearch ? 'center' : undefined}>
          {noResultForSearch && (
            <>
              <Text
                fontSize={50}
                weight="bold"
                lineHeight="60px"
                mt="xxl"
                mb="md"
                color="primary500"
              >
                <FormattedMessage id="search.noResults.title" />
              </Text>
              <Text mb={30}>
                <FormattedMessage id="search.noResults.subtitle" />
              </Text>
              <Image
                source={require('assets/images/pause.png')}
                width={300}
                height={300}
              />
            </>
          )}
          {!query && (
            <Text variant="h2" mt="xl">
              <FormattedMessage id="search.title" />
            </Text>
          )}
        </Centered>
      </VerticalList>
    </>
  );
}
