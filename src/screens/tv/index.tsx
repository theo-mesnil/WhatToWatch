import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import type {
  UseGetTvApiResponse,
  UseGetTvCreditsApiResponse,
  UseGetTvSeasonApiResponse,
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
import { Actions } from '~/components/actions'
import { Badge } from '~/components/badge'
import { Button } from '~/components/button'
import { Images } from '~/components/images'
import { List } from '~/components/list'
import { Loader } from '~/components/loader'
import { PersonThumb } from '~/components/person-thumb'
import { ReadMore } from '~/components/read-more'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { VideoThumb } from '~/components/video-thumb'
import { ContentLayout } from '~/layouts/content'
import { personPath, tvEpisodePath, tvPath } from '~/routes'
import { EpisodeThumb } from '~/screens/tv/composants/episode-thumb'
import { formatTime } from '~/utils/time'

type CastItem = NonNullable<UseGetTvCreditsApiResponse['cast']>[number]
type EpisodeItem = NonNullable<UseGetTvSeasonApiResponse['episodes']>[number]
type SeasonItem = NonNullable<UseGetTvApiResponse['seasons']>[number]
type TvItem = NonNullable<UseGetTvSimilarApiResponse['results']>[number]
type VideoItem = NonNullable<UseGetTvVideosApiResponse['results']>[number]

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
      onPress={() => setSelectedSeason(season_number)}
      size="lg"
      variant={selectedSeason === season_number ? 'secondary' : 'primary'}
    >
      <FormattedMessage defaultMessage="Season" id="3wSEx3" /> {season_number}
    </Button>
  )

  const renderItemEpisode: FlashListProps<EpisodeItem>['renderItem'] = ({
    item: { air_date, episode_number, name, overview, still_path },
  }) => (
    <ThumbLink
      href={tvEpisodePath({
        episode: episode_number,
        id: tvID,
        season: selectedSeason,
      })}
    >
      <EpisodeThumb
        airDate={air_date}
        imageUrl={still_path}
        name={name}
        number={episode_number}
        overview={overview}
        runtime={runtime}
      />
    </ThumbLink>
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
  }) => <VideoThumb id={key ?? ''} name={name ?? ''} platform={site ?? ''} type="tv" />

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
              <Badge icon="time" testID="runtime">
                {formatTime(runtime)}
              </Badge>
            )}
            {!!rating && (
              <Badge icon="star" testID="votes" variant="vote">
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
      title={!isLoadingLogo ? name : undefined}
    >
      <Actions
        id={tvID}
        networkLink={networkLink}
        trailer={
          trailer && trailer.key && trailer.site
            ? {
                key: trailer.key,
                platform: trailer.site,
              }
            : undefined
        }
        type="tv"
      />
      {(!!overview || !!tagline) && (
        <ReadMore className="px-screen mt-3">{overview || tagline}</ReadMore>
      )}
      <View className="gap-6 mt-4">
        {!!seasonsLength && (
          <View>
            <List<SeasonItem>
              id="seasons-buttons"
              renderItem={renderItemSeason}
              results={seasonsLength > 1 ? seasons : null}
              withoutSizing
            />
            <View className={`mx-screen mb-2 ${seasonsLength > 1 ? 'mt-4' : ''}`}>
              {isLoadingSeason ? (
                <Loader className="h-5 w-32 rounded" />
              ) : (
                <Text variant="h3">
                  <FormattedMessage
                    defaultMessage="{count} episodes"
                    id="Oux7WC"
                    values={{
                      count: season?.episodes?.length ?? 0,
                    }}
                  />
                  {seasonAirDate && ` • ${new Date(seasonAirDate).getFullYear()}`}
                </Text>
              )}
            </View>
            <List<EpisodeItem>
              id="episodes"
              isLoading={isLoadingSeason}
              numberOfItems={1.3}
              renderItem={renderItemEpisode}
              results={season?.episodes}
            />
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
          <View className="mx-screen">
            <Images
              backdrops={images?.backdrops}
              id={tvID}
              isLoading={isLoadingImages}
              posters={images?.posters}
              type="tv"
            />
          </View>
        )}
        {(isLoadingSimilar || (similar?.results?.length ?? 0) > 0) && (
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
