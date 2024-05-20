import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import type { UseGetMovieCreditsApiResponse } from 'api/movie';
import { useGetMovie, useGetMovieCredits, useGetMovieImages } from 'api/movie';
import { Badge } from 'components/Badge';
import { ButtonNetwork } from 'components/ButtonNetwork';
import { ClockFillIcon, StarFillIcon } from 'components/Icon';
import { List } from 'components/List';
import { PersonThumb } from 'components/PersonThumb';
import { Text } from 'components/Text';
import { ThumbLink } from 'components/ThumbLink';
import { ContentLayout } from 'layouts/Content';
import { formatTime } from 'utils/time';

export default function Movie() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const movieID = Number(params?.id);

  const { data, isLoading } = useGetMovie({ id: movieID });
  const { data: images, isLoading: isLoadingImages } = useGetMovieImages({
    id: movieID
  });
  const { data: credits, isLoading: isLoadingCredits } = useGetMovieCredits({
    id: movieID
  });

  const casting = credits?.cast;
  const coverUrl = data?.coverUrl;
  const genres = data?.genres;
  const logoUrl = images?.logo;
  const networkLink = data?.networkLink;
  const overview = data?.overview;
  const rating = data?.rating;
  const releaseDate = data?.releaseDate;
  const runtime = data?.runtime;
  const title = data?.title;

  const renderItemCast = ({
    item: { character, id, name, profile_path }
  }: ListRenderItemInfo<UseGetMovieCreditsApiResponse['cast'][number]>) => (
    <ThumbLink href={`person/${id}`}>
      <PersonThumb imageUrl={profile_path} name={name} character={character} />
    </ThumbLink>
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
      title={!isLoadingImages && title}
      subtitle={genres}
      logo={logoUrl}
      badges={
        !isLoading && (
          <>
            {!!releaseDate && (
              <Badge>
                <FormattedDate
                  day="numeric"
                  year="numeric"
                  month="long"
                  value={new Date(releaseDate)}
                />
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
      <View style={styles.content}>
        {!!overview && (
          <Text variant="lg" style={styles.tagline}>
            {overview}
          </Text>
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
    gap: theme.space.xl
  }
});
