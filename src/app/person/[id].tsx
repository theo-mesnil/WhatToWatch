import { intervalToDuration } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import {
  useGetPerson,
  useGetPersonImages,
  useGetPersonMovieCredits,
  useGetPersonTvCredits
} from 'api/person';
import { Badge } from 'components/Badge';
import { Images } from 'components/Images';
import { Text } from 'components/Text';
import { ThumbLink } from 'components/ThumbLink';
import { ContentLayout } from 'layouts/Content';

import { ItemThumb } from './components/ItemThumb';
import { ReadMore } from './components/ReadMore';

export default function Person() {
  const params = useLocalSearchParams<{ id: string }>();
  const personID = Number(params?.id);

  const { data, isLoading } = useGetPerson({ id: personID });
  const { data: images, isLoading: isLoadingImages } = useGetPersonImages({
    id: personID
  });

  const { data: movies, isLoading: isLoadingMovies } = useGetPersonMovieCredits(
    { id: personID }
  );
  const { data: tv, isLoading: isLoadingTv } = useGetPersonTvCredits({
    id: personID
  });

  const biography = data?.biography;
  const birthday = data?.birthday;
  const coverUrl = data?.coverUrl;
  const deathday = data?.deathday;
  const department = data?.department;
  const name = data?.name;
  const placeOfBirth = data?.placeOfBirth;
  const numberOfMovies = movies?.length;
  const numberOfTvShows = tv?.length;

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingMovies || isLoadingTv}
      imageUrl={coverUrl}
      title={name}
      badges={
        <>
          {!!department && <Badge>{department}</Badge>}
          {!!birthday && (
            <Badge>
              <>
                <FormattedMessage defaultMessage="Born on" key="born_on" />{' '}
                <FormattedDate
                  day="numeric"
                  year="numeric"
                  month="long"
                  value={new Date(birthday)}
                />
                {!deathday && (
                  <>
                    {' ('}
                    {
                      intervalToDuration({
                        start: new Date(birthday),
                        end: new Date()
                      }).years
                    }
                    <FormattedMessage defaultMessage="y" key="age" />)
                  </>
                )}
              </>
            </Badge>
          )}
          {!!deathday && (
            <Badge>
              <FormattedMessage defaultMessage="Died on" key="died_on" />{' '}
              <FormattedDate
                day="numeric"
                year="numeric"
                month="long"
                value={new Date(deathday)}
              />
              <>
                {' ('}
                {
                  intervalToDuration({
                    start: new Date(birthday),
                    end: new Date(deathday)
                  }).years
                }
                <FormattedMessage defaultMessage="y" key="age" />)
              </>
            </Badge>
          )}
          {!!placeOfBirth && <Badge>{placeOfBirth}</Badge>}
          {!!numberOfMovies && (
            <Badge>
              {numberOfMovies}{' '}
              {numberOfMovies === 1 && (
                <FormattedMessage id="movie" defaultMessage="movie" />
              )}
              {numberOfMovies > 1 && (
                <FormattedMessage id="movies" defaultMessage="movies" />
              )}
            </Badge>
          )}
          {!!numberOfTvShows && (
            <Badge>
              {numberOfTvShows}{' '}
              {numberOfTvShows === 1 && (
                <FormattedMessage id="serie" defaultMessage="serie" />
              )}
              {numberOfTvShows > 1 && (
                <FormattedMessage id="series" defaultMessage="series" />
              )}
            </Badge>
          )}
        </>
      }
    >
      <View style={styles.content}>
        {!!biography && <ReadMore>{biography}</ReadMore>}
        {!!movies && movies.length > 0 && (
          <View>
            <Text variant="h1" style={styles.sectionTitle}>
              <FormattedMessage id="movies" defaultMessage="movies" />
            </Text>
            <View style={styles.items}>
              {movies.map(
                (
                  { character, id, overview, poster_path, release_date, title },
                  index
                ) => (
                  <ThumbLink
                    key={`movie-${index}-${id}`}
                    isLoading={isLoading}
                    href={`/movie/${id}`}
                  >
                    <ItemThumb
                      date={release_date}
                      overview={overview}
                      posterUrl={poster_path}
                      subtitle={character}
                      title={title}
                      type="movie"
                    />
                  </ThumbLink>
                )
              )}
            </View>
          </View>
        )}
        {!!tv && tv.length > 0 && (
          <View>
            <Text variant="h1" style={styles.sectionTitle}>
              <FormattedMessage id="series" defaultMessage="series" />
            </Text>
            <View style={styles.items}>
              {tv.map(
                (
                  {
                    character,
                    first_air_date,
                    id,
                    name,
                    overview,
                    poster_path
                  },
                  index
                ) => (
                  <ThumbLink
                    key={`tv-${index}-${id}`}
                    isLoading={isLoading}
                    href={`/tv/${id}`}
                  >
                    <ItemThumb
                      type="tv"
                      date={first_air_date}
                      title={name}
                      posterUrl={poster_path}
                      subtitle={character}
                      overview={overview}
                    />
                  </ThumbLink>
                )
              )}
            </View>
          </View>
        )}
        <Images
          id={personID}
          type="person"
          isLoading={isLoadingImages}
          profiles={images}
        />
      </View>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space.xl,
    ...globalStyles.centered
  },
  items: {
    marginTop: theme.space.md,
    gap: theme.space.md
  },
  sectionTitle: {
    textTransform: 'capitalize'
  }
});
