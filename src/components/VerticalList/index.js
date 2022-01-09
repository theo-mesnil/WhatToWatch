import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Box } from 'components/Box';
import { fakeData30 } from 'constants/mocks';

export function VerticalList({
  aspectRatio,
  children,
  getApi,
  handleScroll,
  initialNumToRender = 20,
  maxPage = 20,
  numberOfColumns = 3,
  onPress,
  paddingTop,
  param,
  params = [],
  renderItem: Item,
  resultsData
}) {
  const [scrollY] = useState(new Animated.Value(0));
  const [results, setResults] = useState(resultsData || 'loading');
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const allParams = [{ name: 'page', value: page }].concat(params);
  const resultFromParent = !!resultsData;
  const isLoading = results === 'loading' || resultsData === 'loading';
  const dataFormatted = isLoading ? fakeData30 : results;

  useEffect(() => {
    handleScroll && handleScroll(scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  function renderItem({ item }) {
    return (
      <Box flex={1} maxWidth={`${100 / numberOfColumns}%`} p="xs">
        <Item
          item={item}
          aspectRatio={aspectRatio}
          onPress={() =>
            onPress &&
            onPress({
              id: item?.id,
              name: item?.name,
              mediaType: item?.media_type
            })
          }
          isLoading={isLoading}
        />
      </Box>
    );
  }

  function setNewPage() {
    if (page < maxPage) {
      setPage(page + 1);
    }
  }

  function getNewPageData(newData) {
    setResults(results.concat(newData));
  }

  useEffect(() => {
    if (!resultFromParent) {
      if (page === 1) {
        param
          ? getApi(setResults, param, allParams)
          : getApi(setResults, allParams);
      } else if (page < maxPage) {
        param
          ? getApi(getNewPageData, param, allParams)
          : getApi(getNewPageData, allParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setResults(resultsData);
  }, [resultsData]);

  return (
    <Animated.FlatList
      bounces={false}
      data={dataFormatted}
      initialNumToRender={initialNumToRender}
      keyExtractor={(item, index) =>
        isLoading ? `loading_${index}` : `${index}_${item.id}`
      }
      ListHeaderComponent={
        <Box mb="lg" pt={paddingTop}>
          {children}
        </Box>
      }
      ListFooterComponent={<Box mt="lg" />}
      numColumns={numberOfColumns}
      onEndReached={!resultFromParent && setNewPage}
      onEndReachedThreshold={1}
      columnWrapperStyle={{ paddingHorizontal: theme.space.md }}
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
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}
