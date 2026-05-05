import React from 'react'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetMovieImagesApiResponse } from '~/api/movie'
import { ListTitle } from '~/components/list-title'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { movieImagesPath, tvImagesPath } from '~/routes'

type ImagesProps = {
  backdrops?: UseGetMovieImagesApiResponse['backdrops']
  id: number
  isLoading: boolean
  posters?: UseGetMovieImagesApiResponse['posters']
  type: 'movie' | 'tv'
}

export function Images({ backdrops, id, isLoading, posters, type }: ImagesProps) {
  if (isLoading || ((backdrops?.length ?? 0) > 0 && (posters?.length ?? 0) > 0)) {
    return (
      <View>
        <ListTitle>
          <FormattedMessage defaultMessage="Images" id="Fip4H8" />
        </ListTitle>
        <View className="aspect-video flex-row gap-4">
          {(backdrops?.length ?? 0) > 0 && (
            <View className="h-full w-3/5">
              <ThumbLink
                href={
                  type === 'movie'
                    ? movieImagesPath({ id, type: 'backdrops' })
                    : tvImagesPath({ id, type: 'backdrops' })
                }
              >
                <Thumb
                  aspectRatio={backdrops?.[0]?.aspect_ratio}
                  height="100%"
                  imageUrl={backdrops?.[0]?.file_path}
                  imageWidth="w780"
                  isLoading={isLoading}
                  type="movie"
                >
                  <View className="absolute bottom-0 left-0 right-0 top-1/2 justify-end pb-3 pl-5 bg-linear-180 from-transparent via-background-fixed/80 to-background-fixed/95">
                    <Text className="light:text-white" variant="h3">
                      <FormattedMessage defaultMessage="Backdrops" id="eBDmdm" />
                    </Text>
                  </View>
                </Thumb>
              </ThumbLink>
            </View>
          )}
          {(posters?.length ?? 0) > 0 && (
            <View className="flex-1 h-full">
              <ThumbLink
                href={
                  type === 'movie'
                    ? movieImagesPath({ id, type: 'posters' })
                    : tvImagesPath({ id, type: 'posters' })
                }
              >
                <Thumb
                  aspectRatio={posters?.[0]?.aspect_ratio}
                  height="100%"
                  imageUrl={posters?.[0]?.file_path}
                  imageWidth="w780"
                  isLoading={isLoading}
                  type="movie"
                >
                  <View className="absolute bottom-0 left-0 right-0 top-1/2 justify-end pb-3 pl-5 bg-linear-180 from-transparent via-background-fixed/80 to-background-fixed/95">
                    <Text className="light:text-white" variant="h3">
                      <FormattedMessage defaultMessage="Posters" id="4NCdJM" />
                    </Text>
                  </View>
                </Thumb>
              </ThumbLink>
            </View>
          )}
        </View>
      </View>
    )
  }

  return null
}
