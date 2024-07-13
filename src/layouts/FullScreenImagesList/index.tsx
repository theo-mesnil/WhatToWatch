import { useNavigation } from 'expo-router';
import React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { UseGetMovieImagesApiResponse } from 'api/movie';
import type { UseGetPersonImagesApiResponse } from 'api/person';
import type { UseGetTvImagesApiResponse } from 'api/tv';
import { Button } from 'components/Button';
import { CrossIcon, Icon } from 'components/Icon';
import { Thumb } from 'components/Thumb';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';
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
  type: ContentType;
};

const GAP = theme.space.lg;
const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_LIST_INSET = theme.space.marginList;

export default function FullScreenImagesList({
  images,
  isLoading,
  type
}: FullScreenImagesProps) {
  const navigation = useNavigation();
  const { statusBarHeight } = useSafeHeights();

  const HeaderComponent = React.useCallback(
    () => (
      <View
        style={[styles.header, isAndroid && { paddingTop: statusBarHeight }]}
      >
        <Button
          isCustomChildren
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon icon={CrossIcon} />
        </Button>
      </View>
    ),
    [navigation, statusBarHeight]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  const renderItem = ({
    item: { aspect_ratio, file_path }
  }: ListRenderItemInfo<Images[number]>) => (
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

  function getItemLayout(_: any, index: number) {
    return {
      length: CARD_WIDTH,
      offset: getItemOffset(index),
      index
    };
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        <Animated.FlatList
          numColumns={1}
          initialNumToRender={2}
          pagingEnabled
          id="images"
          bounces={false}
          decelerationRate="fast"
          snapToOffsets={[...Array(images.length)].map((x, i) =>
            getItemOffset(i)
          )}
          contentContainerStyle={styles.listContainer}
          getItemLayout={getItemLayout}
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.behind,
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.behind
  },
  list: {
    width: '100%',
    height: '80%',
    justifyContent: 'center'
  },
  listContainer: {
    paddingHorizontal: CARD_LIST_INSET - GAP / 2
  },
  thumb: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: GAP / 2
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 0,
    backgroundColor: theme.colors['default-600'],
    marginRight: theme.space.md,
    marginTop: theme.space.md
  }
});
