import React from 'react'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetMovieImagesApiResponse } from '~/api/movie'
import { Button } from '~/components/button'
import { ListTitle } from '~/components/list-title'
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
                <>
                  <Thumb
                    aspectRatio={backdrops?.[0]?.aspect_ratio}
                    height="100%"
                    imageUrl={backdrops?.[0]?.file_path}
                    imageWidth="w780"
                    isLoading={isLoading}
                    type="movie"
                  />
                  <View className="absolute inset-0 justify-end">
                    <Button size="lg" variant="secondary">
                      <FormattedMessage defaultMessage="Backdrops" id="eBDmdm" />
                    </Button>
                  </View>
                </>
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
                <>
                  <Thumb
                    aspectRatio={posters?.[0]?.aspect_ratio}
                    height="100%"
                    imageUrl={posters?.[0]?.file_path}
                    imageWidth="w780"
                    isLoading={isLoading}
                    type="movie"
                  />
                  <View className="absolute inset-0 justify-end">
                    <Button size="lg" variant="secondary">
                      <FormattedMessage defaultMessage="Posters" id="4NCdJM" />
                    </Button>
                  </View>
                </>
              </ThumbLink>
            </View>
          )}
        </View>
      </View>
    )
  }

  return null
}
