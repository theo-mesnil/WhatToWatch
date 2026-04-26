import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { View } from 'react-native'

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
import { Actions } from '~/components/actions'
import { Badge } from '~/components/badge'
import { Images } from '~/components/images'
import { List } from '~/components/list'
import { NetworkButton } from '~/components/network-button'
import { PersonThumb } from '~/components/person-thumb'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { TrailerButton } from '~/components/trailer-button'
import { VideoThumb } from '~/components/video-thumb'
import { ContentLayout } from '~/layouts/content'
import { moviePath, personPath } from '~/routes'
import { formatTime } from '~/utils/time'

type CastItem = NonNullable<UseGetMovieCreditsApiResponse['cast']>[number]
type MovieItem = NonNullable<UseGetMovieSimilarApiResponse['results']>[number]
type VideoItem = NonNullable<UseGetMovieVideosApiResponse['results']>[number]

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
  }) => <VideoThumb id={key ?? ''} name={name ?? ''} platform={site ?? ''} type="movie" />

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
              <Badge icon="time" testID="runtime">
                {formatTime(runtime)}
              </Badge>
            )}
            {!!rating && (
              <Badge icon="star" testID="votes">
                {rating.votes} ({rating.count})
              </Badge>
            )}
          </>
        )
      }
      imageUrl={coverUrl}
      isLoading={isLoading || isLoadingLogo}
      logo={logo ?? undefined}
      subtitle={genres}
      title={!isLoadingLogo ? title : undefined}
    >
      <Actions id={movieID} type="movie" />
      {!!networkLink && (
        <NetworkButton className="mx-screen" id={networkLink.id} link={networkLink.link} />
      )}
      {!!trailer && (
        <TrailerButton
          className="items-center justify-center mt-2"
          id={trailer.key ?? ''}
          platform={trailer.site ?? ''}
        />
      )}
      <View className="gap-6">
        {(!!overview || !!tagline) && (
          <Text className="px-screen mt-3 text-text-maximal" variant="lg">
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
          <View className="mx-screen">
            <Images
              backdrops={images?.backdrops}
              id={movieID}
              isLoading={isLoadingImages}
              posters={images?.posters}
              type="movie"
            />
          </View>
        )}
        {(isLoadingSimilar || (similar?.results?.length ?? 0) > 0) && (
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
