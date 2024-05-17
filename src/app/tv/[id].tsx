import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { UseGetTvApiResponse, UseGetTvCreditsApiResponse } from 'api/tv';
import {
  useGetTv,
  useGetTvCredits,
  useGetTvImages,
  useGetTvSeason
} from 'api/tv';
import { Badge } from 'components/Badge';
import { Button } from 'components/Button';
import { ButtonNetwork } from 'components/ButtonNetwork';
import { ClockFillIcon, StarFillIcon } from 'components/Icon';
import { List } from 'components/List';
import { PeopleThumb } from 'components/PeopleThumb';
import { Text } from 'components/Text';
import { ContentLayout } from 'layouts/Content';
import { formatTime } from 'utils/time';

import { EpisodeThumb } from './components/EpisodeThumb';

export default function Tv() {
  const [selectedSeason, setSelectedSeason] = React.useState<number>(1);
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const tvID = Number(params?.id);

  const { data, isLoading } = useGetTv({ id: tvID });
  const { data: images, isLoading: isLoadingImages } = useGetTvImages({
    id: tvID
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
  const logoUrl = images?.logo;
  const startYear = data?.startYear;
  const endYear = data?.endYear;
  const runtime = data?.runtime;
  const networkLink = data?.networkLink;
  const rating = data?.rating;
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
      variant={selectedSeason === season_number ? 'secondary' : 'primary'}
      onPress={() => setSelectedSeason(season_number)}
    >
      S{season_number}
    </Button>
  );

  const renderItemCast = ({
    item: { name, profile_path, roles }
  }: ListRenderItemInfo<UseGetTvCreditsApiResponse['cast'][number]>) => (
    <PeopleThumb
      imageUrl={profile_path}
      name={name}
      character={roles?.[0]?.character}
    />
  );

  React.useEffect(() => {
    navigation.setOptions({
      presentation: 'modal'
    });
  }, [navigation]);

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingImages}
      imageUrl={coverUrl}
      title={name}
      subtitle={genres}
      logo={logoUrl}
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
          style={styles.buttonNetwork}
        />
      )}
      {!!tagline && (
        <Text variant="lg" style={styles.tagline}>
          {tagline}
        </Text>
      )}
      <View style={styles.content}>
        {!!seasonsLength && (
          <View>
            <List
              title={
                <FormattedMessage
                  key="episodes-title"
                  defaultMessage="Episodes"
                />
              }
              gap={theme.space.sm}
              withoutSizing
              id="seasons-buttons"
              renderItem={renderItemSeason}
              results={seasonsLength > 1 ? seasons : null}
            />
            {isLoadingSeason && <View style={styles.seasonLoading} />}
            {!isLoadingSeason && (
              <View style={styles.episodesContent}>
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
                      key={episode.id}
                      id={episode.id}
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
        {!!casting && (
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
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList
  },
  episodesList: {
    marginTop: theme.space.lg,
    gap: theme.space.xl
  },
  seasonLoading: {
    height: 700
  },
  buttonNetwork: {
    marginHorizontal: theme.space.marginList
  }
});
