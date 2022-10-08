import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  useGetMovie,
  useGetMovieCredits,
  useGetMovieImages,
  useGetMovieRecommendations,
  useGetMovieSimilar,
  useGetMovieVideos
} from 'api/movie';
import { Centered } from 'components/Centered';
import { ContentActions } from 'components/ContentActions';
import { ContentCover } from 'components/ContentCover';
import { ContentDescription } from 'components/ContentDescription';
import { ContentMedia } from 'components/ContentMedia';
import { ContentOverview } from 'components/ContentOverview';
import { Information } from 'components/Information';
import { InformationCompanies } from 'components/InformationCompanies';
import { InformationCredits } from 'components/InformationCredits';
import { List } from 'components/List';
import { MovieThumb } from 'components/MovieThumb';
import { PeopleThumb } from 'components/PeopleThumb';
import { ScreenSection } from 'components/ScreenSection';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { VideoThumb } from 'components/VideoThumb';
import { ContentLayout } from 'layouts/Content';
import { useFormatReleasedDate } from 'utils/dates';
import { formatMoney } from 'utils/formatMoney';

export function MovieScreen() {
  const [movie, setMovie] = useState({
    backdrop: 'loading',
    description: 'loading',
    genres: 'loading',
    budget: undefined,
    collection: undefined,
    homepage: undefined,
    originalTitle: undefined,
    productionCompanies: undefined,
    releaseDate: undefined,
    revenue: undefined,
    runtime: undefined,
    title: undefined,
    votes: undefined
  });
  const [credits, setCredits] = useState<{
    cast: Credit[] | 'loading';
    directors?: Credit[];
    writers?: Credit[];
  }>({
    cast: 'loading',
    directors: undefined,
    writers: undefined
  });
  const [videos, setVideos] = useState<Videos | 'loading'>('loading');
  const [images, setImages] = useState({ backdrops: null, posters: null });
  const [recommendations, setRecommendations] = useState();
  const [similar, setSimilar] = useState();
  const [titleOffset, setTitleOffset] = useState(undefined);
  const formatReleasedDate = useFormatReleasedDate();
  const route = useRoute<RootStackScreenProps<'Movie'>['route']>();
  const navigation =
    useNavigation<
      RootStackScreenProps<'Movie' | 'Collection' | 'People'>['navigation']
    >();
  const movieID = route?.params?.id || 516486;
  const getMovie = useGetMovie(movieID);
  const getMovieCredits = useGetMovieCredits(movieID);
  const getMovieVideos = useGetMovieVideos(movieID);
  const getMovieImages = useGetMovieImages(movieID);
  const getMovieRecommendations = useGetMovieRecommendations(movieID);
  const getMovieSimilar = useGetMovieSimilar(movieID);
  const {
    backdrop,
    budget,
    collection,
    description,
    genres,
    homepage,
    originalTitle,
    productionCompanies,
    releaseDate,
    revenue,
    runtime,
    title,
    votes
  } = movie;
  const { cast, directors, writers } = credits;
  const { backdrops, posters } = images;
  const withProductions =
    !!productionCompanies && productionCompanies?.length > 0;
  const withGenres = !!genres && genres?.length > 0 && genres !== 'loading';
  const showInformation =
    !!directors ||
    !!writers ||
    !!originalTitle ||
    !!budget ||
    !!revenue ||
    withProductions ||
    withGenres;
  const isVideosLoading = videos === 'loading';
  const showMedia = !!posters && !!backdrops;
  const releaseYear =
    !!releaseDate && new Date(releaseDate).getFullYear()?.toString();

  useEffect(() => {
    getMovie({ callback: setMovie });
    getMovieVideos({ callback: setVideos });
    getMovieCredits({ callback: setCredits });
    getMovieImages({ callback: setImages });
    getMovieRecommendations({ callback: setRecommendations });
    getMovieSimilar({ callback: setSimilar });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentLayout titleOffset={titleOffset}>
      <ContentCover
        backdrop={backdrop}
        title={title}
        setTitleOffset={setTitleOffset}
        type="movie"
      />
      <ContentOverview
        releaseDate={releaseYear}
        genres={genres}
        runtime={runtime}
      />
      <ContentActions
        homepage={homepage}
        isLoading={isVideosLoading}
        videos={videos}
      />
      <ContentDescription description={description} votes={votes} />
      {(!!cast || !!videos) && (
        <ScreenSection>
          <>
            {!!cast && (
              <List
                data={cast === 'loading' ? undefined : cast}
                keyName="casting"
                title={<FormattedMessage id="common.casting" />}
                itemPerPage={4}
                onPress={({ id, name }) =>
                  navigation.push('People', { id, name })
                }
                listItem={PeopleThumb}
              />
            )}
            {!!videos && (
              <List
                mt={cast ? 'xl' : undefined}
                keyName="videos"
                data={isVideosLoading ? undefined : videos}
                title={<FormattedMessage id="common.videos" />}
                aspectRatio={16 / 9}
                itemPerPage={2}
                listItem={VideoThumb}
              />
            )}
          </>
        </ScreenSection>
      )}
      {showInformation && (
        <ScreenSection>
          <Centered>
            <Text variant="h2">
              <FormattedMessage id="common.information" />
            </Text>
            {!!releaseDate && (
              <Information title="Date" mt="sm">
                <Text>{formatReleasedDate(releaseDate)}</Text>
              </Information>
            )}
            {!!directors && (
              <Information
                title={<FormattedMessage id="movie.directors" />}
                mt="sm"
              >
                <InformationCredits credits={directors} />
              </Information>
            )}
            {!!writers && (
              <Information
                title={<FormattedMessage id="movie.writers" />}
                mt="sm"
              >
                <InformationCredits credits={writers} />
              </Information>
            )}
            {!!originalTitle && (
              <Information
                title={<FormattedMessage id="common.originalTitle" />}
                mt="sm"
              >
                <Text>{originalTitle}</Text>
              </Information>
            )}
            {!!budget && (
              <Information
                title={<FormattedMessage id="movie.budget" />}
                mt="sm"
              >
                <Text>{formatMoney(budget)}</Text>
              </Information>
            )}
            {!!revenue && (
              <Information
                title={<FormattedMessage id="movie.revenue" />}
                mt="sm"
              >
                <Text>{formatMoney(revenue)}</Text>
              </Information>
            )}
            {withProductions && (
              <Information
                title={<FormattedMessage id="movie.productionCompanies" />}
                mt="sm"
              >
                <InformationCompanies companies={productionCompanies} />
              </Information>
            )}
            {withGenres && Array.isArray(genres) && (
              <Information
                title={<FormattedMessage id="common.genres" />}
                mt="sm"
              >
                <>
                  {genres.map(
                    (genre, index) => `${index === 0 ? '' : ', '}${genre.name}`
                  )}
                </>
              </Information>
            )}
          </Centered>
        </ScreenSection>
      )}
      {(!!collection || !!showMedia) && (
        <ScreenSection>
          {!!collection && (
            <Centered maxWidth={700}>
              <Thumb
                aspectRatio={16 / 9}
                title={collection?.name}
                onPress={() =>
                  navigation.push('Collection', {
                    id: collection?.id,
                    name: collection?.name
                  })
                }
                imageUrl={collection?.backdrop_path}
                imageWidth={780}
                withTitleOnCover
              />
            </Centered>
          )}
          {showMedia && (
            <ContentMedia
              mt={collection ? 'xl' : undefined}
              posters={posters}
              backdrops={backdrops}
              title={title}
            />
          )}
        </ScreenSection>
      )}
      {(!!similar || !!recommendations) && (
        <ScreenSection backgroundColor="dark600">
          {!!similar && (
            <List
              data={similar}
              onPress={({ id, name }) => navigation.push('Movie', { id, name })}
              keyName="similar"
              title={<FormattedMessage id="common.similar" />}
              listItem={MovieThumb}
            />
          )}
          {!!recommendations && (
            <List
              keyName="recommendations"
              onPress={({ id, name }) => navigation.push('Movie', { id, name })}
              mt={similar ? 'xl' : undefined}
              data={recommendations}
              title={<FormattedMessage id="common.recommendations" />}
              listItem={MovieThumb}
            />
          )}
        </ScreenSection>
      )}
    </ContentLayout>
  );
}
