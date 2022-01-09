import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import { ContentLayout } from 'layouts/Content';
import {
  useGetTvShow,
  useGetTvShowCredits,
  useGetTvShowImages,
  useGetTvShowRecommendations,
  useGetTvShowSimilar,
  useGetTvShowVideos
} from 'api/tvshow';
import { ContentCover } from 'components/ContentCover';
import { ContentOverview } from 'components/ContentOverview';
import { ContentActions } from 'components/ContentActions';
import { VideoThumb } from 'components/VideoThumb';
import { PeopleThumb } from 'components/PeopleThumb';
import { List } from 'components/List';
import { ScreenSection } from 'components/ScreenSection';
import { ContentMedia } from 'components/ContentMedia';
import { GenreThumb } from 'components/GenreThumb';
import { Centered } from 'components/Centered';
import { Text } from 'components/Text';
import { InformationCredits } from 'components/InformationCredits';
import { Information } from 'components/Information';
import { TvShowThumb } from 'components/TvShowThumb';
import { formatTvShowSubtitle } from 'utils/tvshows';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { SeasonThumb } from 'components/SeasonThumb';
import { InformationCompanies } from 'components/InformationCompanies';

export function TvShowScreen() {
  const route = useRoute();
  const [tvShow, setTvShow] = useState({
    backdrop: 'loading',
    description: 'loading',
    genres: 'loading',
    seasons: 'loading'
  });
  const [credits, setCredits] = useState({
    cast: 'loading'
  });
  const [videos, setVideos] = useState('loading');
  const [images, setImages] = useState({ backdrops: null, posters: null });
  const [recommendations, setRecommendations] = useState();
  const [similar, setSimilar] = useState();
  const [titleOffset, setTitleOffset] = useState();
  const navigation = useNavigation();
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
  const showInformation =
    !!creators ||
    !!originalTitle ||
    !!seasonsNumber ||
    !!episodesNumber ||
    !!type ||
    withNetworks;
  const isVideosLoading = videos === 'loading';
  const isSeasonLoading = seasons === 'loading';

  useEffect(
    () => {
      getTvShow(setTvShow);
      getTvShowVideos(setVideos);
      getTvShowCredits(setCredits);
      getTvShowImages(setImages);
      getTvShowRecommendations(setRecommendations);
      getTvShowSimilar(setSimilar);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ContentLayout title={title} titleOffset={titleOffset}>
      <ContentCover
        subtitle={!!status && formatTvShowSubtitle(airDate, status)}
        backdrop={backdrop}
        title={title}
        setTitleOffset={setTitleOffset}
        type="tv"
      />
      <ContentOverview description={description} genres={genres} />
      <ContentActions
        homepage={homepage}
        runtime={runtime}
        videos={videos}
        isLoading={isVideosLoading}
        votes={votes}
      />
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
                        seasonTitle: season.name,
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
                onPress={({ id }) => navigation.push('People', { id })}
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
          </Centered>
        </ScreenSection>
      )}
      {((!!genres && genres?.length > 0) || !!showMedia) && (
        <ScreenSection>
          {!!genres && (
            <List
              data={genres !== 'loading' && genres}
              keyName="genres"
              onPress={({ id, name }) =>
                navigation.push('Genre', { id, type: 'tv', name })
              }
              listItem={GenreThumb}
              title={<FormattedMessage id="common.genres" />}
              itemPerPage={3}
              aspectRatio={5 / 2}
            />
          )}
          {showMedia && (
            <ContentMedia
              mt={genres ? 'xl' : undefined}
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
              onPress={({ id }) => navigation.push('TvShow', { id })}
              keyName="similar"
              title={<FormattedMessage id="common.similar" />}
              listItem={TvShowThumb}
            />
          )}
          {!!recommendations && (
            <List
              keyName="recommendations"
              onPress={({ id }) => navigation.push('TvShow', { id })}
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
