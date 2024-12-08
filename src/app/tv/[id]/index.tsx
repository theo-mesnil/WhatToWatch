import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { personPath, tvPath } from 'routes';
import { globalStyles } from 'styles';

import { useGetContentLogo } from 'api/logo';
import type {
  UseGetTvApiResponse,
  UseGetTvCreditsApiResponse,
  UseGetTvSimilarApiResponse,
  UseGetTvVideosApiResponse
} from 'api/tv';
import {
  useGetTv,
  useGetTvCredits,
  useGetTvImages,
  useGetTvSeason,
  useGetTvSimilar,
  useGetTvVideos
} from 'api/tv';
import { EpisodeThumb } from 'components/app/tv/EpisodeThumb';
import { Badge } from 'components/Badge';
import { Button } from 'components/Button';
import { ClockFillIcon, StarFillIcon } from 'components/Icon';
import { Images } from 'components/Images';
import { List } from 'components/List';
import { NetworkButton } from 'components/NetworkButton';
import { PersonThumb } from 'components/PersonThumb';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { TrailerButton } from 'components/TrailerButton';
import { VideoThumb } from 'components/VideoThumb';
import { ContentLayout } from 'layouts/Content';
import { theme } from 'theme';
import { formatTime } from 'utils/time';

export default function Tv() {
  const [selectedSeason, setSelectedSeason] = React.useState<number>(1);
  const params = useLocalSearchParams<{ id: string }>();
  const tvID = Number(params?.id);

  const { data, isLoading } = useGetTv({ id: tvID });

  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id: tvID,
    type: 'tv'
  });
  const { data: season, isLoading: isLoadingSeason } = useGetTvSeason({
    id: tvID,
    seasonNumber: selectedSeason
  });
  const { data: videos, isLoading: isLoadingVideos } = useGetTvVideos({
    id: tvID
  });
  const { data: credits, isLoading: isLoadingCredits } = useGetTvCredits({
    id: tvID,
    enabled: !isLoadingSeason
  });
  const { data: images, isLoading: isLoadingImages } = useGetTvImages({
    id: tvID,
    enabled: !isLoadingCredits
  });
  const { data: similar, isLoading: isLoadingSimilar } = useGetTvSimilar({
    id: tvID,
    enabled: !isLoadingCredits
  });

  const tagline = data?.tagline;
  const coverUrl = data?.coverUrl;
  const name = data?.name;
  const genres = data?.genres;
  const startYear = data?.startYear;
  const endYear = data?.endYear;
  const networkLink = data?.networkLink;
  const overview = data?.overview;
  const rating = data?.rating;
  const runtime = data?.runtime;
  const seasons = data?.seasons?.filter(
    (item) => item.season_number > 0 && item.episode_count > 0
  );
  const seasonsLength = seasons?.length;
  const seasonAirDate = season?.air_date;
  const casting = credits?.cast;
  const trailer = videos?.results?.filter(
    (video) => video.type === 'Trailer'
  )?.[0];

  const renderItemSeason = ({
    item: { season_number }
  }: ListRenderItemInfo<UseGetTvApiResponse['seasons'][number]>) => (
    <Button
      size="lg"
      isRounded
      variant={selectedSeason === season_number ? 'secondary' : 'primary'}
      onPress={() => setSelectedSeason(season_number)}
    >
      S{season_number}
    </Button>
  );

  const renderItemCast = ({
    item: { id, name, profile_path, roles }
  }: ListRenderItemInfo<UseGetTvCreditsApiResponse['cast'][number]>) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb
        imageUrl={profile_path}
        name={name}
        character={roles?.[0]?.character}
      />
    </ThumbLink>
  );

  const renderItemSimilar = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetTvSimilarApiResponse['results'][number]>) => (
    <ThumbLink href={tvPath({ id })}>
      <Thumb type="tv" imageUrl={poster_path} />
    </ThumbLink>
  );

  const renderItemVideo = ({
    item: { key, name, site }
  }: ListRenderItemInfo<UseGetTvVideosApiResponse['results'][number]>) => (
    <VideoThumb id={key} type="tv" platform={site} name={name} />
  );

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingLogo}
      imageUrl={coverUrl}
      title={!isLoadingLogo && name}
      subtitle={genres}
      logo={logo}
      badges={
        !isLoading && (
          <>
            {!!seasonsLength && (
              <Badge testID="seasons">
                {seasonsLength}{' '}
                {seasonsLength === 1 && (
                  <FormattedMessage defaultMessage="season" id="FQ0kXF" />
                )}
                {seasonsLength > 1 && (
                  <FormattedMessage defaultMessage="seasons" id="zTL1+t" />
                )}
              </Badge>
            )}
            {!!startYear && (
              <Badge testID="release-date">
                {startYear}
                {endYear && ` - ${endYear}`}
              </Badge>
            )}
            {!!runtime && (
              <Badge testID="runtime" icon={ClockFillIcon}>
                {formatTime(runtime)}
              </Badge>
            )}
            {!!rating && (
              <Badge testID="votes" icon={StarFillIcon}>
                {rating.votes} ({rating.count})
              </Badge>
            )}
          </>
        )
      }
    >
      {!!networkLink && (
        <NetworkButton
          id={networkLink.id}
          link={networkLink.link}
          style={globalStyles.centered}
        />
      )}
      {!!trailer && (
        <TrailerButton
          id={trailer.key}
          platform={trailer.site}
          style={[globalStyles.centered, styles.playButton]}
        />
      )}
      {(!!overview || !!tagline) && (
        <Text variant="lg" style={styles.tagline}>
          {overview || tagline}
        </Text>
      )}
      <View style={styles.content}>
        {!!seasonsLength && (
          <View>
            <List
              gap={theme.space.sm}
              withoutSizing
              id="seasons-buttons"
              renderItem={renderItemSeason}
              results={seasonsLength > 1 ? seasons : null}
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
                  seasonsLength > 1 && styles.episodesContentMultipleSeasons
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
                      seasonNumber: season.season_number
                    }}
                  />
                  {seasonAirDate &&
                    ` • ${new Date(seasonAirDate).getFullYear()}`}
                </Text>
                <View style={styles.episodesList}>
                  {season.episodes.map((episode, index) => (
                    <EpisodeThumb
                      airDate={episode.air_date}
                      number={index + 1}
                      runtime={episode.runtime}
                      key={`${index}-${episode.id}`}
                      name={episode.name}
                      imageUrl={episode.still_path}
                      overview={episode.overview}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        {(isLoadingCredits || (!!casting && casting.length > 0)) && (
          <List
            title={<FormattedMessage defaultMessage="Casting" id="arTEbw" />}
            isLoading={isLoadingCredits}
            id="cast"
            renderItem={renderItemCast}
            results={casting}
          />
        )}
        {(isLoadingVideos ||
          (!!videos?.results && videos.results.length > 0)) && (
          <List
            numberOfItems={1}
            title={<FormattedMessage defaultMessage="Videos" id="4XfMux" />}
            isLoading={isLoadingVideos}
            id="videos"
            renderItem={renderItemVideo}
            results={videos?.results}
          />
        )}
        {(isLoadingImages || !!images) && (
          <View style={globalStyles.centered}>
            <Images
              id={tvID}
              isLoading={isLoadingImages}
              backdrops={images?.backdrops}
              posters={images?.posters}
              type="tv"
            />
          </View>
        )}
        {(isLoadingSimilar || similar?.results.length > 0) && (
          <List
            title={
              <FormattedMessage
                defaultMessage="In the same spirit"
                id="bxLtNh"
              />
            }
            id="similar"
            isLoading={isLoadingSimilar}
            renderItem={renderItemSimilar}
            results={similar?.results}
          />
        )}
      </View>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  tagline: {
    color: theme.colors.white,
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList
  },
  content: {
    marginTop: theme.space.xxl,
    gap: theme.space.xl
  },
  episodesContent: {
    paddingHorizontal: theme.space.marginList
  },
  episodesContentMultipleSeasons: {
    marginTop: theme.space.xl
  },
  episodesList: {
    marginTop: theme.space.lg,
    gap: theme.space.xl
  },
  seasonLoading: {
    marginTop: theme.space.xl,
    height: 700
  },
  playButton: {
    marginTop: theme.space.sm
  }
});
