import React from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import type { UseGetMovieImagesApiResponse } from '~/api/movie'
import { Button } from '~/components/Button'
import { ListTitle } from '~/components/ListTitle'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { movieImagesPath, tvImagesPath } from '~/routes'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export type ImagesProps = {
  backdrops?: UseGetMovieImagesApiResponse['backdrops']
  id: number
  isLoading: boolean
  posters?: UseGetMovieImagesApiResponse['posters']
  type: 'movie' | 'tv'
}

export function Images({ backdrops, id, isLoading, posters, type }: ImagesProps) {
  if (isLoading || (backdrops?.length > 0 && posters?.length > 0)) {
    return (
      <View>
        <ListTitle>
          <FormattedMessage defaultMessage="Images" id="Fip4H8" />
        </ListTitle>
        <View style={styles.images}>
          {backdrops?.length > 0 && (
            <View style={styles.backdrops}>
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
                  <View style={[globalStyles.absoluteFill, styles.content]}>
                    <Button size="lg" style={styles.button} variant="secondary">
                      <FormattedMessage defaultMessage="Backdrops" id="eBDmdm" />
                    </Button>
                  </View>
                </>
              </ThumbLink>
            </View>
          )}
          {posters?.length > 0 && (
            <View style={styles.posters}>
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
                  <View style={[globalStyles.absoluteFill, styles.content]}>
                    <Button size="lg" style={styles.button} variant="secondary">
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

const styles = StyleSheet.create({
  backdrops: {
    height: '100%',
    width: '60%',
  },
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: '100%',
  },
  content: {
    justifyContent: 'flex-end',
  },
  images: {
    aspectRatio: 16 / 9,
    flexDirection: 'row',
    gap: theme.space.lg,
  },
  posters: {
    flex: 1,
    height: '100%',
  },
})
