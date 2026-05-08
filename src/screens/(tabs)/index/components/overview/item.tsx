import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'
import { ScopedTheme, withUniwind } from 'uniwind'

import { useGetGenreMovieList, useGetGenreTvList } from '~/api/genres'
import { useGetContentLogo } from '~/api/logo'
import { Badge } from '~/components/badge'
import { Button } from '~/components/button'
import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { WatchlistButton } from '~/components/watchlist-button'
import { routeByType } from '~/routes/utils'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

type ItemProps = {
  genres?: number[]
  id: number
  imageUrl: string
  overview?: string
  title: string
  type: 'movie' | 'tv'
}

export function Item({ genres, id, imageUrl, overview, title, type }: ItemProps) {
  const { data: genreMovie, isLoading: isLoadingGenreMovie } = useGetGenreMovieList()
  const { data: genreSerie, isLoading: isLoadingGenreSerie } = useGetGenreTvList()
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id,
    type,
  })

  const isLoading = !id || isLoadingGenreMovie || isLoadingGenreSerie || isLoadingLogo

  const formatGenre = (genreId: number) => {
    if (type === 'movie') {
      return genreMovie?.find(genre => genre.id === genreId)?.name
    } else {
      return genreSerie?.find(genre => genre.id === genreId)?.name
    }
  }

  return (
    <View>
      <Thumb
        aspectRatio={2.9 / 4}
        imageUrl={getImageUrl(imageUrl, 'w1280')}
        isLoading={isLoading}
        type={type}
      >
        {isLoading && <Loader className="w-full" />}
        {!isLoading && (
          <>
            <View className="absolute top-1/4 bottom-0 bg-linear-180 from-transparent via-background-fixed/80 to-background-fixed/95 left-0 right-0" />
            <ScopedTheme theme="dark">
              <View className="mt-auto gap-2 p-6 z-1">
                {!isLoadingLogo && logo && (
                  <UniwindImage
                    className="max-h-30 max-w-70 m-auto mb-3"
                    contentFit="contain"
                    source={getImageUrl(logo.url, 'w500')}
                    style={{ aspectRatio: logo.aspectRatio }}
                    transition={150}
                  />
                )}
                {!isLoadingLogo && !logo && <Text variant="h0">{title}</Text>}
                {overview && (
                  <Text className="my-1" numberOfLines={2}>
                    {overview}
                  </Text>
                )}
                <View className="flex-row flex-wrap items-center gap-1 mb-2 max-w-full">
                  <Badge icon={type === 'movie' ? 'film' : 'tv'}>
                    {type === 'movie' ? (
                      <FormattedMessage defaultMessage="Movie" id="u06TNf" />
                    ) : (
                      <FormattedMessage defaultMessage="Serie" id="5RN6T/" />
                    )}
                  </Badge>
                  {genres?.slice(0, 2).map(genreId => (
                    <Badge className="max-w-28" key={`badge-${id}-${genreId}`}>
                      {formatGenre(genreId)}
                    </Badge>
                  ))}
                </View>
                <View className="flex-row items-center gap-3 w-full">
                  <View className="flex-1">
                    <Link asChild href={routeByType({ id, type })}>
                      <Button
                        className="w-full"
                        icon="arrow-forward"
                        size="xl"
                        variant="tertiary"
                        withHaptic
                      >
                        <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
                      </Button>
                    </Link>
                  </View>
                  <WatchlistButton id={id} type={type} />
                </View>
              </View>
            </ScopedTheme>
          </>
        )}
      </Thumb>
    </View>
  )
}
