import * as React from 'react'
import type { ListRenderItemInfo } from 'react-native'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

import type { UseGetMovieImagesApiResponse } from 'api/movie'
import type { UseGetPersonImagesApiResponse } from 'api/person'
import type { UseGetTvImagesApiResponse } from 'api/tv'
import { Thumb } from 'components/Thumb'
import { theme } from 'theme'
import type { ContentType } from 'types/content'

type Images =
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetPersonImagesApiResponse['profiles']

export type FullScreenImagesProps = {
  images: Images
  isLoading?: boolean
  startAt?: number
  type: ContentType
}

const GAP = theme.space.lg
const CARD_LIST_INSET = theme.space.marginList

export default function FullScreenImagesList({
  images,
  isLoading,
  startAt = 0,
  type,
}: FullScreenImagesProps) {
  const hasOneImage = images?.length === 1
  const CARD_WIDTH = hasOneImage
    ? Dimensions.get('window').width - CARD_LIST_INSET * 2
    : Dimensions.get('window').width * 0.8

  const renderItem = ({
    item: { aspect_ratio, file_path },
  }: ListRenderItemInfo<Images[number]>) => (
    <View style={[{ width: CARD_WIDTH }, styles.thumb]}>
      <Thumb type={type} aspectRatio={aspect_ratio} imageUrl={file_path} imageWidth="w780" />
    </View>
  )

  function getItemOffset(index: number) {
    return CARD_WIDTH * index + GAP * index - CARD_LIST_INSET - GAP / 2
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getItemLayout(_: any, index: number) {
    return {
      length: CARD_WIDTH,
      offset:
        CARD_WIDTH * index + CARD_LIST_INSET + GAP * index - Dimensions.get('window').width * 0.1,
      index,
    }
  }

  return (
    <View style={styles.list}>
      <Animated.FlatList
        numColumns={1}
        initialScrollIndex={startAt}
        initialNumToRender={2}
        pagingEnabled
        id="images"
        decelerationRate="fast"
        snapToOffsets={[...Array(images?.length)].map((_, i) => getItemOffset(i))}
        contentContainerStyle={styles.listContainer}
        getItemLayout={getItemLayout}
        data={images}
        keyExtractor={(item, index) =>
          isLoading ? `loading_${index}_image` : `${index}_${item.file_path}_image`
        }
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: CARD_LIST_INSET,
    gap: GAP,
  },
  thumb: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
