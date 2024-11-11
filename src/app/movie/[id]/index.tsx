import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { moviePath, personPath } from 'routes';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetContentLogo } from 'api/logo';
import type {
  UseGetMovieCreditsApiResponse,
  UseGetMovieSimilarApiResponse,
  UseGetMovieVideosApiResponse
} from 'api/movie';
import {
  useGetMovie,
  useGetMovieCredits,
  useGetMovieImages,
  useGetMovieSimilar,
  useGetMovieVideos
} from 'api/movie';
import { Badge } from 'components/Badge';
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
import { formatTime } from 'utils/time';

export default function Movie() {
  const params = useLocalSearchParams<{ id: string }>();
  const movieID = Number(params?.id);

  const { data, isLoading } = useGetMovie({ id: movieID });
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id: movieID,
    type: 'movie'
  });
  const { data: videos, isLoading: isLoadingVideos } = useGetMovieVideos({
    id: movieID
  });
  const { data: credits, isLoading: isLoadingCredits } = useGetMovieCredits({
    id: movieID,
    enabled: !isLoading
  });
  const { data: images, isLoading: isLoadingImages } = useGetMovieImages({
    id: movieID,
    enabled: !isLoading
  });
  const { data: similar, isLoading: isLoadingSimilar } = useGetMovieSimilar({
    id: movieID,
    enabled: !isLoading
  });

  const casting = credits?.cast;
  const coverUrl = data?.coverUrl;
  const genres = data?.genres;
  const networkLink = data?.networkLink;
  const overview = data?.overview;
  const rating = data?.rating;
  const releaseDate = data?.releaseDate;
  const runtime = data?.runtime;
  const title = data?.title;
  const tagline = data?.tagline;
  const trailer = videos?.results?.filter(
    (video) => video.type === 'Trailer'
  )?.[0];

  const renderItemCast = ({
    item: { character, id, name, profile_path }
  }: ListRenderItemInfo<UseGetMovieCreditsApiResponse['cast'][number]>) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb imageUrl={profile_path} name={name} character={character} />
    </ThumbLink>
  );

  const renderItemMovie = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetMovieSimilarApiResponse['results'][number]>) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb type="movie" imageUrl={poster_path} />
    </ThumbLink>
  );

  const renderItemVideo = ({
    item: { key, name, site }
  }: ListRenderItemInfo<UseGetMovieVideosApiResponse['results'][number]>) => (
    <VideoThumb id={key} type="movie" platform={site} name={name} />
  );

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingLogo}
      imageUrl={coverUrl}
      title={!isLoadingLogo && title}
      subtitle={genres}
      logo={logo}
      badges={
        !isLoading && (
          <>
            {!!releaseDate && (
              <Badge testID="release-date">
                <FormattedDate
                  day="numeric"
                  year="numeric"
                  month="long"
                  value={new Date(releaseDate)}
                />
              </Badge>
            )}
            {!!runtime && (
              <Badge testID="runtime" icon="TimeFill">
                {formatTime(runtime)}
              </Badge>
            )}
            {!!rating && (
              <Badge testID="votes" icon="StarFill">
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
      <View style={styles.content}>
        {(!!overview || !!tagline) && (
          <Text variant="lg" style={styles.tagline}>
            {overview || tagline}
          </Text>
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
        {(isLoadingVideos ||
          (!!videos?.results && videos.results.length > 0)) && (
          <List
            numberOfItems={1}
            title={<FormattedMessage id="videos" defaultMessage="Videos" />}
            isLoading={isLoadingVideos}
            id="videos"
            renderItem={renderItemVideo}
            results={videos?.results}
          />
        )}
        {(isLoadingImages || !!images) && (
          <View style={globalStyles.centered}>
            <Images
              id={movieID}
              type="movie"
              posters={images?.posters}
              backdrops={images?.backdrops}
              isLoading={isLoadingImages}
            />
          </View>
        )}
        {(isLoadingSimilar || similar?.results.length > 0) && (
          <List
            title={
              <FormattedMessage
                id="similar"
                defaultMessage="In the same spirit"
              />
            }
            id="similar"
            isLoading={isLoadingSimilar}
            renderItem={renderItemMovie}
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
    gap: theme.space.xl
  },
  playButton: {
    marginTop: theme.space.sm
  }
});
