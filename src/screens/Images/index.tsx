import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Box } from 'components/Box';
import { windowWidth } from 'constants/screen';

import { Item } from './Item';

export function ImagesScreen() {
  const route = useRoute<RootStackScreenProps<'Images'>['route']>();
  const images = route?.params?.images;
  const startAt = route?.params?.startAt || 0;

  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <FlatList
          initialNumToRender={1}
          getItemLayout={(_, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index
          })}
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
