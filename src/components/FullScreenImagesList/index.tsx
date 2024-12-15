import type { FlashListProps } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import type { UseGetMovieImagesApiResponse } from 'api/movie';
import type { UseGetPersonImagesApiResponse } from 'api/person';
import type { UseGetTvImagesApiResponse } from 'api/tv';
import { Thumb } from 'components/Thumb';
import { theme } from 'theme';
import type { ContentType } from 'types/content';

type Images =
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetPersonImagesApiResponse['profiles'];

export type FullScreenImagesProps = {
  images: Images;
  isLoading?: boolean;
  startAt?: number;
  type: ContentType;
};

const GAP = theme.space.lg;
const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_LIST_INSET = theme.space.marginList;

export default function FullScreenImagesList({
  images,
  isLoading,
  startAt = 0,
  type
}: FullScreenImagesProps) {
  const flashListRef = React.useRef(null);

  const renderItem: FlashListProps<Images[number]>['renderItem'] = ({
    item: { aspect_ratio, file_path }
  }) => (
    <View style={[{ width: CARD_WIDTH }, styles.thumb]}>
      <Thumb
        type={type}
        aspectRatio={aspect_ratio}
        imageUrl={file_path}
        imageWidth="w780"
      />
    </View>
  );

  function getItemOffset(index: number) {
    return CARD_WIDTH * index + GAP * index - CARD_LIST_INSET - GAP / 2;
  }

  function onLoad() {
    if (startAt === images?.length) {
      flashListRef.current.scrollToEnd();
    } else {
      flashListRef.current.scrollToOffset({
        offset: getItemOffset(startAt)
      });
    }
  }

  function renderSeparators() {
    return <View style={{ width: GAP }} />;
  }

  return (
    <View style={styles.list}>
      <FlashList
        onLoad={onLoad}
        ref={flashListRef}
        numColumns={1}
        ItemSeparatorComponent={renderSeparators}
        estimatedItemSize={CARD_WIDTH}
        pagingEnabled
        id="images"
        decelerationRate="fast"
        snapToOffsets={[...Array(images?.length)].map((_, i) =>
          getItemOffset(i)
        )}
        contentContainerStyle={{
          paddingHorizontal: CARD_LIST_INSET
        }}
        data={images}
        keyExtractor={(item, index) =>
          isLoading
            ? `loading_${index}_image`
            : `${index}_${item.file_path}_image`
        }
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '80%',
    justifyContent: 'center'
  },
  thumb: {
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
