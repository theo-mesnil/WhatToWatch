import * as React from 'react'
import type { ListRenderItemInfo } from 'react-native'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

import type { UseGetMovieImagesApiResponse } from '~/api/movie'
import type { UseGetPersonImagesApiResponse } from '~/api/person'
import type { UseGetTvImagesApiResponse } from '~/api/tv'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'

export type FullScreenImagesProps = {
  images: Images
  isLoading?: boolean
  startAt?: number
  type: ContentType
}

type Images =
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetPersonImagesApiResponse['profiles']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']

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
      <Thumb aspectRatio={aspect_ratio} imageUrl={file_path} imageWidth="w780" type={type} />
    </View>
  )

  function getItemOffset(index: number) {
    return CARD_WIDTH * index + GAP * index - CARD_LIST_INSET - GAP / 2
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getItemLayout(_: any, index: number) {
    return {
      index,
      length: CARD_WIDTH,
      offset:
        CARD_WIDTH * index + CARD_LIST_INSET + GAP * index - Dimensions.get('window').width * 0.1,
    }
  }

  return (
    <View style={styles.list}>
      <Animated.FlatList
        contentContainerStyle={styles.listContainer}
        data={images}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        horizontal
        id="images"
        initialNumToRender={2}
        initialScrollIndex={startAt}
        keyExtractor={(item, index) =>
          isLoading ? `loading_${index}_image` : `${index}_${item.file_path}_image`
        }
        numColumns={1}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[...Array(images?.length)].map((_, i) => getItemOffset(i))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    height: '80%',
    justifyContent: 'center',
    width: '100%',
  },
  listContainer: {
    gap: GAP,
    paddingHorizontal: CARD_LIST_INSET,
  },
  thumb: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
