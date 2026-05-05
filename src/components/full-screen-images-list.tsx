import * as React from 'react'
import type { ListRenderItemInfo } from 'react-native'
import { useWindowDimensions, View } from 'react-native'
import Animated from 'react-native-reanimated'

import type { UseGetMovieImagesApiResponse } from '~/api/movie'
import type { UseGetPersonImagesApiResponse } from '~/api/person'
import type { UseGetTvImagesApiResponse } from '~/api/tv'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type FullScreenImagesProps = {
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

const GAP = 16
const CARD_LIST_INSET = 16

export default function FullScreenImagesList({
  images,
  isLoading,
  startAt = 0,
  type,
}: FullScreenImagesProps) {
  const { width } = useWindowDimensions()
  const hasOneImage = images?.length === 1
  const cardWidth = hasOneImage ? width - CARD_LIST_INSET * 2 : width * 0.8

  const renderItem = React.useCallback(
    ({ item: { aspect_ratio, file_path } }: ListRenderItemInfo<NonNullable<Images>[number]>) => (
      <View className="self-center justify-center" style={{ width: cardWidth }}>
        <Thumb aspectRatio={aspect_ratio} imageUrl={file_path} imageWidth="w780" type={type} />
      </View>
    ),
    [cardWidth, type]
  )

  const getItemOffset = React.useCallback(
    (index: number) => cardWidth * index + GAP * index - CARD_LIST_INSET - GAP / 2,
    [cardWidth]
  )

  const snapToOffsets = React.useMemo(
    () => [...Array(images?.length)].map((_, i) => getItemOffset(i)),
    [images?.length, getItemOffset]
  )

  function getItemLayout(_: unknown, index: number) {
    return {
      index,
      length: cardWidth,
      offset: cardWidth * index + CARD_LIST_INSET + GAP * index - width * 0.1,
    }
  }

  return (
    <View className="h-[80%] w-full justify-center">
      <Animated.FlatList
        contentContainerClassName="gap-4 px-4"
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
        snapToOffsets={snapToOffsets}
      />
    </View>
  )
}
