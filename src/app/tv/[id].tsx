import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { UseGetTvApiResponse } from 'api/tv';
import { useGetTv, useGetTvImages, useGetTvSeason } from 'api/tv';
import { Badge } from 'components/Badge';
import { Button } from 'components/Button';
import { ClockFillIcon } from 'components/Icon';
import { List } from 'components/List';
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
  const seasons = data?.seasons?.filter((season) => season.season_number > 0);
  const seasonsLength = seasons?.length;

  const { data: images, isLoading: isLoadingImages } = useGetTvImages({
    id: tvID
  });

  const { data: season, isLoading: isLoadingSeason } = useGetTvSeason({
    id: tvID,
    seasonNumber: selectedSeason
  });

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

  React.useEffect(() => {
    navigation.setOptions({
      presentation: 'modal'
    });
  }, [navigation]);

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingImages}
      imageUrl={data?.coverUrl}
      title={data?.name}
      subtitle={data?.genres}
      logo={images?.logo}
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
            {!!data?.startYear && (
              <Badge>
                {data.startYear}
                {data?.endYear && ` - ${data.endYear}`}
              </Badge>
            )}
            {!!data?.runtime && (
              <Badge icon={ClockFillIcon}>{formatTime(data.runtime)}</Badge>
            )}
          </>
        )
      }
    >
      {!!data?.tagline && (
        <Text variant="lg" style={styles.tagline}>
          {data.tagline}
        </Text>
      )}
      {!!seasonsLength && (
        <View style={styles.episodes}>
          {seasonsLength > 1 && (
            <List
              title={
                <FormattedMessage
                  key="episodes-title"
                  defaultMessage="Episodes"
                />
              }
              withoutSizing
              id="seasons-buttons"
              renderItem={renderItemSeason}
              results={seasons}
            />
          )}
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
                />{' '}
              </Text>
              <View style={styles.episodesList}>
                {season.episodes.map((episode, index) => (
                  <EpisodeThumb
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
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  tagline: {
    color: theme.colors.white,
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList
  },
  episodes: {
    marginTop: theme.space.xxl
  },
  episodesContent: {
    marginTop: theme.space.md,
    paddingHorizontal: theme.space.marginList
  },
  episodesList: {
    marginTop: theme.space.xl,
    gap: theme.space.xl
  }
});
