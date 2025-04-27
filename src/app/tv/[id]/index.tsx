import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import type {
  UseGetTvApiResponse,
  UseGetTvCreditsApiResponse,
  UseGetTvSimilarApiResponse,
  UseGetTvVideosApiResponse,
} from '~/api/tv'
import {
  useGetTv,
  useGetTvCredits,
  useGetTvImages,
  useGetTvSeason,
  useGetTvSimilar,
  useGetTvVideos,
} from '~/api/tv'
import { EpisodeThumb } from '~/components/app/tv/EpisodeThumb'
import { Badge } from '~/components/Badge'
import { Button } from '~/components/Button'
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
import { personPath, tvPath } from '~/routes'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'
import { formatTime } from '~/utils/time'

type CastItem = UseGetTvCreditsApiResponse['cast'][number]
type SeasonItem = UseGetTvApiResponse['seasons'][number]
type TvItem = UseGetTvSimilarApiResponse['results'][number]
type VideoItem = UseGetTvVideosApiResponse['results'][number]

export default function Tv() {
  const [selectedSeason, setSelectedSeason] = React.useState<number>(1)
  const params = useLocalSearchParams<{ id: string }>()
  const tvID = Number(params?.id)

  const { data, isLoading } = useGetTv({ id: tvID })

  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id: tvID,
    type: 'tv',
  })
  const { data: season, isLoading: isLoadingSeason } = useGetTvSeason({
    id: tvID,
    seasonNumber: selectedSeason,
  })
  const { data: videos, isLoading: isLoadingVideos } = useGetTvVideos({
    id: tvID,
  })
  const { data: credits, isLoading: isLoadingCredits } = useGetTvCredits({
    enabled: !isLoadingSeason,
    id: tvID,
  })
  const { data: images, isLoading: isLoadingImages } = useGetTvImages({
    enabled: !isLoadingCredits,
    id: tvID,
  })
  const { data: similar, isLoading: isLoadingSimilar } = useGetTvSimilar({
    enabled: !isLoadingCredits,
    id: tvID,
  })

  const tagline = data?.tagline
  const coverUrl = data?.coverUrl
  const name = data?.name
  const genres = data?.genres
  const startYear = data?.startYear
  const endYear = data?.endYear
  const networkLink = data?.networkLink
  const overview = data?.overview
  const rating = data?.rating
  const runtime = data?.runtime
  const seasons = data?.seasons?.filter(item => item.season_number > 0 && item.episode_count > 0)
  const seasonsLength = seasons?.length
  const seasonAirDate = season?.air_date
  const casting = credits?.cast
  const trailer = videos?.results?.filter(video => video.type === 'Trailer')?.[0]

  const renderItemSeason: FlashListProps<SeasonItem>['renderItem'] = ({
    item: { season_number },
  }) => (
    <Button
      isRounded
      onPress={() => setSelectedSeason(season_number)}
      size="lg"
      variant={selectedSeason === season_number ? 'secondary' : 'primary'}
    >
      S{season_number}
    </Button>
  )

  const renderItemCast: FlashListProps<CastItem>['renderItem'] = ({
    item: { id, name, profile_path, roles },
  }) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb character={roles?.[0]?.character} imageUrl={profile_path} name={name} />
    </ThumbLink>
  )

  const renderItemSimilar: FlashListProps<TvItem>['renderItem'] = ({
    item: { id, poster_path },
  }) => (
    <ThumbLink href={tvPath({ id })}>
      <Thumb imageUrl={poster_path} type="tv" />
    </ThumbLink>
  )

  const renderItemVideo: FlashListProps<VideoItem>['renderItem'] = ({
    item: { key, name, site },
  }) => <VideoThumb id={key} name={name} platform={site} type="tv" />

  return (
    <ContentLayout
      badges={
        !isLoading && (
          <>
            {!!seasonsLength && (
              <Badge testID="seasons">
                {seasonsLength}{' '}
                {seasonsLength === 1 && <FormattedMessage defaultMessage="season" id="FQ0kXF" />}
                {seasonsLength > 1 && <FormattedMessage defaultMessage="seasons" id="zTL1+t" />}
              </Badge>
            )}
            {!!startYear && (
              <Badge testID="release-date">
                {startYear}
                {endYear && ` - ${endYear}`}
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
      title={!isLoadingLogo && name}
    >
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
      {(!!overview || !!tagline) && (
        <Text style={styles.tagline} variant="lg">
          {overview || tagline}
        </Text>
      )}
      <View style={styles.content}>
        {!!seasonsLength && (
          <View>
            <List<SeasonItem>
              gap={theme.space.sm}
              id="seasons-buttons"
              renderItem={renderItemSeason}
              results={seasonsLength > 1 ? seasons : null}
              withoutSizing
            />
            {isLoadingSeason && (
              <View style={styles.seasonLoading}>
                <Text variant="h1">
                  <FormattedMessage defaultMessage="Episodes" id="oIih5v" />
                </Text>
              </View>
            )}
            {!isLoadingSeason && (
              <View
                style={[
                  styles.episodesContent,
                  seasonsLength > 1 && styles.episodesContentMultipleSeasons,
                ]}
              >
                <Text variant="h1">
                  <FormattedMessage defaultMessage="Episodes" id="oIih5v" />
                </Text>
                <Text>
                  <FormattedMessage
                    defaultMessage="{count} episodes on season {seasonNumber}"
                    id="mYKY3z"
                    values={{
                      count: season.episodes.length,
                      seasonNumber: season.season_number,
                    }}
                  />
                  {seasonAirDate && ` • ${new Date(seasonAirDate).getFullYear()}`}
                </Text>
                <View style={styles.episodesList}>
                  {season.episodes.map((episode, index) => (
                    <EpisodeThumb
                      airDate={episode.air_date}
                      imageUrl={episode.still_path}
                      key={`${index}-${episode.id}`}
                      name={episode.name}
                      number={index + 1}
                      overview={episode.overview}
                      runtime={episode.runtime}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        {(isLoadingCredits || (!!casting && casting.length > 0)) && (
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
              id={tvID}
              isLoading={isLoadingImages}
              posters={images?.posters}
              type="tv"
            />
          </View>
        )}
        {(isLoadingSimilar || similar?.results.length > 0) && (
          <List<TvItem>
            id="similar"
            isLoading={isLoadingSimilar}
            renderItem={renderItemSimilar}
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
    marginTop: theme.space.xxl,
  },
  episodesContent: {
    paddingHorizontal: theme.space.marginList,
  },
  episodesContentMultipleSeasons: {
    marginTop: theme.space.xl,
  },
  episodesList: {
    gap: theme.space.xl,
    marginTop: theme.space.lg,
  },
  playButton: {
    marginTop: theme.space.sm,
  },
  seasonLoading: {
    height: 700,
    marginTop: theme.space.xl,
  },
  tagline: {
    color: theme.colors.white,
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList,
  },
})
