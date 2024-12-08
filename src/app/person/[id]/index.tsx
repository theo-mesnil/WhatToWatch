import { intervalToDuration } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { personImagePath, personMoviesPath, personTvPath } from 'routes';
import { routeByType } from 'routes/utils';
import { globalStyles } from 'styles';

import type {
  UseGetPersonCreditsApiResponse,
  UseGetPersonImagesApiResponse
} from 'api/person';
import {
  useGetPerson,
  useGetPersonCredits,
  useGetPersonImages,
  useGetPersonMovieCredits,
  useGetPersonTvCredits
} from 'api/person';
import { CreditNumberThumb } from 'components/app/person/CreditNumberThumb';
import { ReadMore } from 'components/app/person/ReadMore';
import { Badge } from 'components/Badge';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { ContentLayout } from 'layouts/Content';
import { theme } from 'theme';

export default function Person() {
  const params = useLocalSearchParams<{ id: string }>();
  const personID = Number(params?.id);

  const { data, isLoading } = useGetPerson({ id: personID });
  const { data: images, isLoading: isLoadingImages } = useGetPersonImages({
    id: personID
  });

  const biography = data?.biography;
  const birthday = data?.birthday;
  const coverUrl = data?.coverUrl;
  const deathday = data?.deathday;
  const department = data?.department;
  const isActing = department === 'Acting';
  const name = data?.name;
  const placeOfBirth = data?.placeOfBirth;

  const { data: tv, isLoading: isLoadingTv } = useGetPersonTvCredits({
    id: personID,
    isActing
  });
  const { data: credits, isLoading: isLoadingCredits } = useGetPersonCredits({
    id: personID,
    isActing
  });
  const { data: movies, isLoading: isLoadingMovies } = useGetPersonMovieCredits(
    { id: personID, isActing }
  );

  const numberOfMovies = movies?.length;
  const numberOfTvShows = tv?.length;

  const renderItemImage = ({
    index,
    item: { file_path }
  }: ListRenderItemInfo<UseGetPersonImagesApiResponse['profiles'][number]>) => (
    <ThumbLink href={personImagePath({ id: personID, start: index })}>
      <Thumb type="person" imageUrl={file_path} />
    </ThumbLink>
  );

  const renderCreditImage = ({
    item: { id, media_type, poster_path }
  }: ListRenderItemInfo<UseGetPersonCreditsApiResponse['cast'][number]>) => {
    const type = media_type === 'movie' ? 'movie' : 'tv';

    return (
      <ThumbLink href={routeByType({ type, id })}>
        <Thumb imageWidth="w500" type={type} imageUrl={poster_path} />
      </ThumbLink>
    );
  };

  return (
    <ContentLayout
      isPersonContent
      isLoading={isLoading || isLoadingMovies || isLoadingTv}
      imageUrl={coverUrl}
      title={name}
      badges={
        <>
          {!!department && <Badge testID="department">{department}</Badge>}
          {!!birthday && (
            <Badge testID="birthday">
              <>
                <FormattedMessage defaultMessage="Born on" id="/QsGmC" />{' '}
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
                    <FormattedMessage defaultMessage="y" id="EhtHdK" />)
                  </>
                )}
              </>
            </Badge>
          )}
          {!!deathday && (
            <Badge testID="deathday">
              <FormattedMessage defaultMessage="Died on" id="jMuk1E" />{' '}
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
                <FormattedMessage defaultMessage="y" id="EhtHdK" />)
              </>
            </Badge>
          )}
          {!!placeOfBirth && (
            <Badge testID="place-of-birth">{placeOfBirth}</Badge>
          )}
          {!!numberOfMovies && (
            <Badge testID="movies">
              {numberOfMovies}{' '}
              {numberOfMovies === 1 && (
                <FormattedMessage defaultMessage="movie" id="RzXthk" />
              )}
              {numberOfMovies > 1 && (
                <FormattedMessage defaultMessage="movies" id="2xXGzb" />
              )}
            </Badge>
          )}
          {!!numberOfTvShows && (
            <Badge testID="series">
              {numberOfTvShows}{' '}
              {numberOfTvShows === 1 && (
                <FormattedMessage defaultMessage="serie" id="rwqNY9" />
              )}
              {numberOfTvShows > 1 && (
                <FormattedMessage defaultMessage="series" id="INk7fF" />
              )}
            </Badge>
          )}
        </>
      }
    >
      <View style={styles.content}>
        {!!biography && (
          <View style={globalStyles.centered}>
            <ReadMore>{biography}</ReadMore>
          </View>
        )}
        {(isLoadingCredits || credits?.length > 0) && (
          <List
            title={<FormattedMessage defaultMessage="Know for" id="//VHfC" />}
            id="similar"
            numberOfItems={2}
            isLoading={isLoadingCredits}
            renderItem={renderCreditImage}
            results={credits?.slice(0, 8)}
          />
        )}
        {(!!numberOfMovies || !!numberOfTvShows) && (
          <View style={[globalStyles.centered, styles.creditNumbers]}>
            {!!numberOfMovies && (
              <ThumbLink
                style={styles.creditNumber}
                href={personMoviesPath({ id: personID })}
              >
                <CreditNumberThumb
                  type="movie"
                  title={
                    <FormattedMessage defaultMessage="movies" id="2xXGzb" />
                  }
                  number={numberOfMovies}
                />
              </ThumbLink>
            )}
            {!!numberOfTvShows && (
              <ThumbLink
                style={styles.creditNumber}
                href={personTvPath({ id: personID })}
              >
                <CreditNumberThumb
                  type="tv"
                  title={
                    <FormattedMessage defaultMessage="series" id="INk7fF" />
                  }
                  number={numberOfTvShows}
                />
              </ThumbLink>
            )}
          </View>
        )}
        {(isLoadingImages || images?.length > 0) && (
          <List
            title={<FormattedMessage defaultMessage="Pictures" id="DOPilz" />}
            id="similar"
            isLoading={isLoadingImages}
            renderItem={renderItemImage}
            results={images}
          />
        )}
      </View>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space.xl,
    marginBottom: theme.space.xl
  },
  creditNumbers: { flexDirection: 'row', gap: theme.space.lg },
  creditNumber: {
    flex: 1
  }
});
