import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Box } from 'components/Box';
import { Header } from 'components/Header';
import { windowWidth } from 'constants/screen';

import { Item } from './Item';

export function ImagesScreen() {
  const route = useRoute<RootStackScreenProps<'Images'>['route']>();
  const images = route?.params?.images;
  const title = route?.params?.title;
  const startAt = route?.params?.startAt || 0;
  const [currentIndexes, setCurrentIndexes] = useState({
    index: startAt,
    prevIndex: startAt
  });

  const onViewableItemsChanged = useCallback(({ changed }) => {
    const newItem = changed?.[0];
    if (newItem !== undefined) {
      const nextIndex = newItem.index;
      if (newItem.isViewable) {
        setCurrentIndexes((prevState) => ({ ...prevState, index: nextIndex }));
      }
    }
  }, []);

  return (
    <>
      <Header
        position="relative"
        withCrossIcon
        opacity={1}
        title={`${currentIndexes?.index + 1} / ${images?.length}`}
        subtitle={title}
      />
      <Box flex={1} justifyContent="center" alignItems="center">
        <FlatList
          initialNumToRender={1}
          getItemLayout={(_, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index
          })}
          onViewableItemsChanged={onViewableItemsChanged}
          pagingEnabled
          bounces={false}
          initialScrollIndex={startAt}
          horizontal
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          data={images}
          keyExtractor={(_, index) => `image_${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={(props) => <Item {...props} />}
        />
      </Box>
    </>
  );
}
