import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetContentLogo } from 'api/logo';
import type { UseGetTvApiResponse, UseGetTvCreditsApiResponse } from 'api/tv';
import { useGetTv, useGetTvCredits, useGetTvSeason } from 'api/tv';
import { Badge } from 'components/Badge';
import { Button } from 'components/Button';
import { ButtonNetwork } from 'components/ButtonNetwork';
import { ClockFillIcon, StarFillIcon } from 'components/Icon';
import { List } from 'components/List';
import { PersonThumb } from 'components/PersonThumb';
import { Text } from 'components/Text';
import { ThumbLink } from 'components/ThumbLink';
import { ContentLayout } from 'layouts/Content';
import { formatTime } from 'utils/time';

import { EpisodeThumb } from './components/EpisodeThumb';

export default function Tv() {
  const [selectedSeason, setSelectedSeason] = React.useState<number>(1);
  const params = useLocalSearchParams();
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
  const { data: credits, isLoading: isLoadingCredits } = useGetTvCredits({
    id: tvID
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
    <ThumbLink href={`person/${id}`}>
      <PersonThumb
        imageUrl={profile_path}
        name={name}
        character={roles?.[0]?.character}
      />
    </ThumbLink>
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
              <Badge>
                {seasonsLength}{' '}
                {seasonsLength === 1 && (
                  <FormattedMessage id="season" defaultMessage="season" />
                )}
                {seasonsLength > 1 && (
                  <FormattedMessage id="seasons" defaultMessage="seasons" />
                )}
              </Badge>
            )}
            {!!startYear && (
              <Badge>
                {startYear}
                {endYear && ` - ${endYear}`}
              </Badge>
            )}
            {!!runtime && (
              <Badge icon={ClockFillIcon}>{formatTime(runtime)}</Badge>
            )}
            {!!rating && (
              <Badge icon={StarFillIcon}>
                {rating.votes} ({rating.count})
              </Badge>
            )}
          </>
        )
      }
    >
      {!!networkLink && (
        <ButtonNetwork
          id={networkLink.id}
          link={networkLink.link}
          style={globalStyles.centered}
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
                  <FormattedMessage
                    key="episodes-title"
                    defaultMessage="Episodes"
                  />
                </Text>
              </View>
            )}
            {!isLoadingSeason && (
              <View style={styles.episodesContent}>
                <Text variant="h1">
                  <FormattedMessage
                    key="episodes-title"
                    defaultMessage="Episodes"
                  />
                </Text>
                <Text>
                  <FormattedMessage
                    defaultMessage="{count} episodes on season {seasonNumber}"
                    values={{
                      count: season.episodes.length,
                      seasonNumber: season.season_number
                    }}
                    key="episodes_number"
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
        {!!casting && casting.length > 0 && (
          <List
            title={<FormattedMessage id="casting" defaultMessage="Casting" />}
            isLoading={isLoadingCredits}
            id="cast"
            renderItem={renderItemCast}
            results={casting}
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
    marginTop: theme.space.xl,
    paddingHorizontal: theme.space.marginList
  },
  episodesList: {
    marginTop: theme.space.lg,
    gap: theme.space.xl
  },
  seasonLoading: {
    marginTop: theme.space.xl,
    height: 700
  }
});
