import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'

import { useGetGenreMovieList, useGetGenreTvList } from '~/api/genres'
import { useGetContentLogo } from '~/api/logo'
import { Badge } from '~/components/badge'
import { Button } from '~/components/button'
import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { routeByType } from '~/routes/utils'
import type { ContentType } from '~/types/content'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

type ItemProps = {
  genres?: number[]
  id: number
  imageUrl: string
  title: string
  type: ContentType
}

export function Item({ genres, id, imageUrl, title, type }: ItemProps) {
  const { data: genreMovie, isLoading: isLoadingGenreMovie } = useGetGenreMovieList()
  const { data: genreSerie, isLoading: isLoadingGenreSerie } = useGetGenreTvList()
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id,
    type,
  })

  const isLoading = isLoadingGenreMovie || isLoadingGenreSerie || isLoadingLogo

  const formatGenre = (genreId: number) => {
    if (type === 'movie') {
      return genreMovie?.find(genre => genre.id === genreId)?.name
    } else {
      return genreSerie?.find(genre => genre.id === genreId)?.name
    }
  }

  return (
    <View>
      <Thumb aspectRatio={3 / 4} imageUrl={getImageUrl(imageUrl, 'w1280')} type={type}>
        {isLoading && <Loader className="w-full" />}
        {!isLoading && (
          <>
            <View className="absolute top-1/4 bottom-0 bg-linear-180 from-transparent via-foreground-fixed/70 to-foreground-fixed left-0 right-0" />
            <View className="mt-auto items-center pb-8 px-1 z-1">
              {!isLoadingLogo && logo && (
                <UniwindImage
                  className="max-h-cover-top w-70 m-auto"
                  contentFit="contain"
                  source={getImageUrl(logo.url, 'w500')}
                  style={{ aspectRatio: logo.aspectRatio }}
                  transition={150}
                />
              )}
              {!isLoadingLogo && !logo && <Text variant="h0">{title}</Text>}
              <View className="flex-row flex-wrap items-center gap-1 mt-8 mb-2 max-w-full">
                <Badge icon={type === 'movie' ? 'film' : 'tv'} variant="secondary">
                  {type === 'movie' ? (
                    <FormattedMessage defaultMessage="Movie" id="u06TNf" />
                  ) : (
                    <FormattedMessage defaultMessage="Serie" id="5RN6T/" />
                  )}
                </Badge>
                {genres?.slice(0, 2).map(genreId => (
                  <Badge className="max-w-30" key={`badge-${id}-${genreId}`}>
                    {formatGenre(genreId)}
                  </Badge>
                ))}
              </View>
              <Link asChild href={routeByType({ id, type })}>
                <Button
                  className="mt-2 w-full"
                  icon="arrow-forward"
                  size="xl"
                  variant="secondary"
                  withHaptic
                >
                  <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
                </Button>
              </Link>
            </View>
          </>
        )}
      </Thumb>
    </View>
  )
}
