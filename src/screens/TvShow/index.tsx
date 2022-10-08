import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  useGetTvShow,
  useGetTvShowCredits,
  useGetTvShowImages,
  useGetTvShowRecommendations,
  useGetTvShowSimilar,
  useGetTvShowVideos
} from 'api/tvshow';
import { Box } from 'components/Box';
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
import { Loader } from 'components/Loader';
import { PeopleThumb } from 'components/PeopleThumb';
import { ScreenSection } from 'components/ScreenSection';
import { SeasonThumb } from 'components/SeasonThumb';
import { Text } from 'components/Text';
import { TvShowThumb } from 'components/TvShowThumb';
import { VideoThumb } from 'components/VideoThumb';
import { ContentLayout } from 'layouts/Content';
import { formatTvShowSubtitle } from 'utils/tvshows';

function getReleaseDate(first, last) {
  if (first || last) {
    const firstYear = `${new Date(first).getFullYear()}`;
    const lastYear = `${new Date(last).getFullYear()}`;

    if (firstYear === lastYear) {
      return firstYear;
    }

    return `${firstYear}/${lastYear}`;
  }

  return;
}

export function TvShowScreen() {
  const route = useRoute<RootStackScreenProps<'TvShow'>['route']>();
  const [tvShow, setTvShow] = useState({
    backdrop: 'loading',
    description: 'loading',
    genres: 'loading',
    seasons: 'loading',
    airDate: undefined,
    creators: undefined,
    episodesNumber: undefined,
    homepage: undefined,
    networks: undefined,
    originalTitle: undefined,
    runtime: undefined,
    seasonsNumber: undefined,
    status: undefined,
    title: undefined,
    type: undefined,
    votes: undefined
  });
  const [credits, setCredits] = useState({
    cast: 'loading'
  });
  const [videos, setVideos] = useState<Videos | 'loading'>('loading');
  const [images, setImages] = useState({ backdrops: null, posters: null });
  const [recommendations, setRecommendations] = useState();
  const [similar, setSimilar] = useState();
  const [titleOffset, setTitleOffset] = useState(0);
  const navigation =
    useNavigation<
      RootStackScreenProps<
        'TvShow' | 'People' | 'Genre' | 'People'
      >['navigation']
    >();
  const tvID = route?.params?.id || 1399;
  const getTvShow = useGetTvShow(tvID);
  const getTvShowCredits = useGetTvShowCredits(tvID);
  const getTvShowVideos = useGetTvShowVideos(tvID);
  const getTvShowImages = useGetTvShowImages(tvID);
  const getTvShowRecommendations = useGetTvShowRecommendations(tvID);
  const getTvShowSimilar = useGetTvShowSimilar(tvID);
  const {
    airDate,
    backdrop,
    creators,
    description,
    episodesNumber,
    genres,
    homepage,
    networks,
    originalTitle,
    runtime,
    seasons,
    seasonsNumber,
    status,
    title,
    type,
    votes
  } = tvShow;
  const { cast } = credits;
  const { backdrops, posters } = images;
  const showMedia = !!posters && !!backdrops;
  const withNetworks = !!networks && networks?.length > 0;
  const withGenres = !!genres && genres?.length > 0 && genres !== 'loading';
  const showInformation =
    !!creators ||
    !!originalTitle ||
    !!seasonsNumber ||
    !!episodesNumber ||
    !!type ||
    withNetworks ||
    withGenres;
  const isVideosLoading = videos === 'loading';
  const isSeasonLoading = seasons === 'loading';
  const airDateFormatted = !!status && formatTvShowSubtitle(airDate, status);
  const releaseYears = getReleaseDate(airDate?.first, airDate?.last);

  useEffect(
    () => {
      getTvShow({ callback: setTvShow });
      getTvShowVideos({ callback: setVideos });
      getTvShowCredits({ callback: setCredits });
      getTvShowImages({ callback: setImages });
      getTvShowRecommendations({ callback: setRecommendations });
      getTvShowSimilar({ callback: setSimilar });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ContentLayout titleOffset={titleOffset}>
      <ContentCover
        backdrop={backdrop}
        title={title}
        setTitleOffset={setTitleOffset}
        type="tv"
      />
      <ContentOverview
        releaseDate={releaseYears}
        genres={genres}
        runtime={runtime}
      />
      <ContentActions
        homepage={homepage}
        isLoading={isVideosLoading}
        videos={videos}
      />
      <ContentDescription description={description} votes={votes} />
      {!!seasons && (
        <ScreenSection>
          <Centered>
            <Text variant="h2" mb="md">
              <FormattedMessage id="tvShows.seasons" />
            </Text>
            {isSeasonLoading && (
              <>
                <Loader borderRadius="md" mb="md" height={80} />
                <Loader borderRadius="md" mb="md" height={80} />
                <Loader borderRadius="md" height={80} />
              </>
            )}
            {!isSeasonLoading &&
              Array.isArray(seasons) &&
              seasons?.length > 0 &&
              seasons.map((season, index) =>
                season.episode_count === 0 ? null : (
                  <SeasonThumb
                    key={`${season.title}_${season.season_number}`}
                    title={season.name}
                    imageUrl={season.poster_path}
                    episodes={season.episode_count}
                    airDate={season.air_date}
                    mb={seasons?.length - 1 > index ? 'md' : undefined}
                    onPress={() =>
                      navigation.push('Season', {
                        seasonNumber: season.season_number,
                        name: season.name,
                        tvID,
                        tvShowTitle: title
                      })
                    }
                  />
                )
              )}
          </Centered>
        </ScreenSection>
      )}
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
            <Text variant="h2">Information</Text>
            {!!airDateFormatted && (
              <Information title="Date" mt="sm">
                <Text>{airDateFormatted}</Text>
              </Information>
            )}
            {!!creators && (
              <Information
                title={<FormattedMessage id="tvShows.creators" />}
                mt="sm"
              >
                <InformationCredits credits={creators} />
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
            {(!!seasonsNumber || !!episodesNumber || !!type) && (
              <Box flexDirection="row" mt="md">
                {!!seasonsNumber && (
                  <Information
                    title={<FormattedMessage id="tvShows.seasons" />}
                    mr="md"
                  >
                    <Text>{seasonsNumber}</Text>
                  </Information>
                )}
                {!!episodesNumber && (
                  <Information
                    title={<FormattedMessage id="tvShows.episodes" />}
                    mr="md"
                  >
                    <Text>{episodesNumber}</Text>
                  </Information>
                )}
                {!!type && (
                  <Information title={<FormattedMessage id="tvShows.type" />}>
                    <Text>{type}</Text>
                  </Information>
                )}
              </Box>
            )}
            {withNetworks && (
              <Information
                title={<FormattedMessage id="common.networks" />}
                mt="sm"
              >
                <InformationCompanies companies={networks} />
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
      {!!showMedia && (
        <ScreenSection>
          {showMedia && (
            <ContentMedia
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
              onPress={({ id, name }) =>
                navigation.push('TvShow', { id, name })
              }
              keyName="similar"
              title={<FormattedMessage id="common.similar" />}
              listItem={TvShowThumb}
            />
          )}
          {!!recommendations && (
            <List
              keyName="recommendations"
              onPress={({ id, name }) =>
                navigation.push('TvShow', { id, name })
              }
              mt={similar ? 'xl' : undefined}
              data={recommendations}
              title={<FormattedMessage id="common.recommendations" />}
              listItem={TvShowThumb}
            />
          )}
        </ScreenSection>
      )}
    </ContentLayout>
  );
}
