import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import type {
  UseGetMovieCreditsApiResponse,
  UseGetMovieSimilarApiResponse,
  UseGetMovieVideosApiResponse,
} from '~/api/movie'
import {
  useGetMovie,
  useGetMovieCredits,
  useGetMovieImages,
  useGetMovieSimilar,
  useGetMovieVideos,
} from '~/api/movie'
import { Actions } from '~/components/Actions'
import { Badge } from '~/components/Badge'
import { Images } from '~/components/Images'
import { List } from '~/components/List'
import { NetworkButton } from '~/components/NetworkButton'
import { PersonThumb } from '~/components/PersonThumb'
import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { TrailerButton } from '~/components/TrailerButton'
import { VideoThumb } from '~/components/VideoThumb'
import { ContentLayout } from '~/layouts//Content'
import { moviePath, personPath } from '~/routes'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'
import { isUserFeatureEnabled } from '~/utils/flags'
import { formatTime } from '~/utils/time'

type CastItem = UseGetMovieCreditsApiResponse['cast'][number]
type MovieItem = UseGetMovieSimilarApiResponse['results'][number]
type VideoItem = UseGetMovieVideosApiResponse['results'][number]

export default function Movie() {
  const params = useLocalSearchParams<{ id: string }>()
  const movieID = Number(params?.id)

  const { data, isLoading } = useGetMovie({ id: movieID })
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id: movieID,
    type: 'movie',
  })
  const { data: videos, isLoading: isLoadingVideos } = useGetMovieVideos({
    id: movieID,
  })
  const { data: credits, isLoading: isLoadingCredits } = useGetMovieCredits({
    enabled: !isLoading,
    id: movieID,
  })
  const { data: images, isLoading: isLoadingImages } = useGetMovieImages({
    enabled: !isLoading,
    id: movieID,
  })
  const { data: similar, isLoading: isLoadingSimilar } = useGetMovieSimilar({
    enabled: !isLoading,
    id: movieID,
  })

  const casting = credits?.cast
  const coverUrl = data?.coverUrl
  const genres = data?.genres
  const networkLink = data?.networkLink
  const overview = data?.overview
  const rating = data?.rating
  const releaseDate = data?.releaseDate
  const runtime = data?.runtime
  const title = data?.title
  const tagline = data?.tagline
  const trailer = videos?.results?.filter(video => video.type === 'Trailer')?.[0]

  const renderItemCast: FlashListProps<CastItem>['renderItem'] = ({
    item: { character, id, name, profile_path },
  }) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb character={character} imageUrl={profile_path} name={name} />
    </ThumbLink>
  )

  const renderItemMovie: FlashListProps<MovieItem>['renderItem'] = ({
    item: { id, poster_path },
  }) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb imageUrl={poster_path} type="movie" />
    </ThumbLink>
  )

  const renderItemVideo: FlashListProps<VideoItem>['renderItem'] = ({
    item: { key, name, site },
  }) => <VideoThumb id={key} name={name} platform={site} type="movie" />

  return (
    <ContentLayout
      badges={
        !isLoading && (
          <>
            {!!releaseDate && (
              <Badge testID="release-date">
                <FormattedDate
                  day="numeric"
                  month="long"
                  value={new Date(releaseDate)}
                  year="numeric"
                />
              </Badge>
            )}
            {!!runtime && (
              <Badge icon="clock-fill" testID="runtime">
                {formatTime(runtime)}
              </Badge>
            )}
            {!!rating && (
              <Badge icon="star-fill" testID="votes">
                {rating.votes} ({rating.count})
              </Badge>
            )}
          </>
        )
      }
      imageUrl={coverUrl}
      isLoading={isLoading || isLoadingLogo}
      logo={logo}
      subtitle={genres}
      title={!isLoadingLogo && title}
    >
      {isUserFeatureEnabled && <Actions id={movieID} type="movie" />}
      {!!networkLink && (
        <NetworkButton id={networkLink.id} link={networkLink.link} style={globalStyles.centered} />
      )}
      {!!trailer && (
        <TrailerButton
          id={trailer.key}
          platform={trailer.site}
          style={[globalStyles.centered, styles.playButton]}
        />
      )}
      <View style={styles.content}>
        {(!!overview || !!tagline) && (
          <Text style={styles.tagline} variant="lg">
            {overview || tagline}
          </Text>
        )}
        {!!casting && casting.length > 0 && (
          <List<CastItem>
            id="cast"
            isLoading={isLoadingCredits}
            renderItem={renderItemCast}
            results={casting}
            title={<FormattedMessage defaultMessage="Casting" id="arTEbw" />}
          />
        )}
        {(isLoadingVideos || (!!videos?.results && videos.results.length > 0)) && (
          <List<VideoItem>
            id="videos"
            isLoading={isLoadingVideos}
            numberOfItems={1}
            renderItem={renderItemVideo}
            results={videos?.results}
            title={<FormattedMessage defaultMessage="Videos" id="4XfMux" />}
          />
        )}
        {(isLoadingImages || !!images) && (
          <View style={globalStyles.centered}>
            <Images
              backdrops={images?.backdrops}
              id={movieID}
              isLoading={isLoadingImages}
              posters={images?.posters}
              type="movie"
            />
          </View>
        )}
        {(isLoadingSimilar || similar?.results.length > 0) && (
          <List<MovieItem>
            id="similar"
            isLoading={isLoadingSimilar}
            renderItem={renderItemMovie}
            results={similar?.results}
            title={<FormattedMessage defaultMessage="In the same spirit" id="bxLtNh" />}
          />
        )}
      </View>
    </ContentLayout>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space.xl,
  },
  playButton: {
    marginTop: theme.space.sm,
  },
  tagline: {
    color: theme.colors.white,
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList,
  },
})
