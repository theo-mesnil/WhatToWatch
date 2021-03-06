import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { NetworkThumb } from 'components/NetworkThumb';
import { TvShowThumb } from 'components/TvShowThumb';
import { PeopleThumb } from 'components/PeopleThumb';
import { useGetTrending } from 'api/trending';
import { List } from 'components/List';
import { networksList } from 'constants/networks';
import { CoverLayout } from 'layouts/Cover';
import { GenresList } from 'components/GenresList';
import { MovieThumb } from 'components/MovieThumb';
import { useGetUpcoming } from 'api/movie';
import { useGetDiscoverMovie, useGetDiscoverTvShow } from 'api/discover';
import { useGetPopular } from 'api/popular';

export function DiscoverScreen({ navigation }) {
  const [spotlight, setSpotlight] = useState();
  const [trendingTv, setTrendingTv] = useState();
  const [popularTv, setPopularTv] = useState();
  const [trendingMovie, setTrendingMovie] = useState();
  const [popularMovie, setPopularMovie] = useState();
  const [trendingPeople, setTrendingPeople] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [family, setFamily] = useState();
  const [comedies, setComedies] = useState();
  const [reality, setReality] = useState();
  const [horror, setHorror] = useState();
  const [drama, setDrama] = useState();
  const getTrending = useGetTrending();
  const getPopular = useGetPopular();
  const getUpcoming = useGetUpcoming();
  const getDiscoverMovie = useGetDiscoverMovie();
  const getDiscoverTv = useGetDiscoverTvShow();

  function spotlightPress({ id, type }) {
    if (type === 'movie') {
      navigation.push('Movie', { id });
    }
    if (type === 'tv') {
      navigation.push('TvShow', { id });
    }
    if (type === 'people') {
      navigation.push('People', { id });
    }
  }

  useEffect(() => {
    getTrending(setTrendingPeople, 'person');
    getTrending(setTrendingTv);
    getTrending(setTrendingMovie, 'movie');
    setTimeout(() => {
      getDiscoverTv(setComedies, [{ name: 'with_genres', value: '35' }]);
      getUpcoming(setUpcomingMovies);
      getPopular(setPopularTv);
    }, 500);
    setTimeout(() => {
      getPopular(setPopularMovie, 'movie');
      getDiscoverTv(setDocumentaries, [{ name: 'with_genres', value: '99' }]);
      getDiscoverMovie(setFamily, [{ name: 'with_genres', value: '10751' }]);
      getDiscoverTv(setReality, [{ name: 'with_genres', value: '10764' }]);
      getDiscoverMovie(setHorror, [{ name: 'with_genres', value: '27' }]);
      getDiscoverTv(setDrama, [{ name: 'with_genres', value: '18' }]);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // format first strate for spotlight
  useEffect(() => {
    if (trendingTv && trendingMovie && trendingPeople) {
      const formatSpotlight = [
        {
          id: trendingTv[0]?.id,
          backdrop_path: trendingTv[0]?.backdrop_path,
          name: trendingTv[0]?.name,
          type: 'tv'
        },
        {
          id: trendingMovie[0]?.id,
          backdrop_path: trendingMovie[0]?.backdrop_path,
          name: trendingMovie[0]?.title,
          type: 'movie'
        }
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .concat([
          {
            id: trendingPeople[0]?.id,
            backdrop_path: trendingPeople[0]?.profile_path,
            name: trendingPeople[0]?.name,
            type: 'people'
          }
        ]);

      setSpotlight(formatSpotlight);
    }
  }, [trendingTv, trendingMovie, trendingPeople]);

  return (
    <CoverLayout imageUrl={spotlight?.[0]?.backdrop_path}>
      <List
        keyName="spotlight"
        data={spotlight}
        onPress={spotlightPress}
        itemPerPage={1}
        pagingEnabled
        aspectRatio={7 / 4}
        withBackdropImage
        withTitleOnCover
        imageWidth={780}
        listItem={MovieThumb}
      />
      <List
        keyName="trending_shows"
        mt="xl"
        listItem={TvShowThumb}
        imageWidth={342}
        data={trendingTv}
        title={<FormattedMessage id="discover.trendsShows" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
        itemPerPage={2}
        withNumber
      />
      <List
        mt="xl"
        data={networksList}
        keyName="networks"
        title={<FormattedMessage id="common.networks" />}
        listItem={NetworkThumb}
        onPress={({ id }) => navigation.push('Network', { id })}
        itemPerPage={4}
      />
      <List
        mt="xl"
        listItem={MovieThumb}
        keyName="trending_movies"
        data={trendingMovie}
        onPress={({ id }) => navigation.push('Movie', { id })}
        itemPerPage={2}
        title={<FormattedMessage id="discover.trendsMovies" />}
        imageWidth={342}
        withNumber
      />
      <List
        mt="xl"
        keyName="people"
        data={trendingPeople}
        title={<FormattedMessage id="discover.popularPeople" />}
        itemPerPage={4}
        onPress={({ id }) => navigation.push('People', { id })}
        listItem={PeopleThumb}
      />
      <GenresList mt="xl" />
      <List
        keyName="comedies"
        mt="xl"
        listItem={TvShowThumb}
        data={comedies}
        title={<FormattedMessage id="discover.comedies" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
      />
      <List
        keyName="upcoming_movies"
        mt="xl"
        listItem={MovieThumb}
        data={upcomingMovies}
        title={<FormattedMessage id="discover.upcomingMovies" />}
        onPress={({ id }) => navigation.push('Movie', { id })}
      />
      <List
        keyName="popular_shows"
        mt="xl"
        listItem={TvShowThumb}
        data={popularTv}
        title={<FormattedMessage id="discover.popularShows" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
      />
      <List
        keyName="popular_movies"
        mt="xl"
        listItem={MovieThumb}
        data={popularMovie}
        title={<FormattedMessage id="discover.popularMovies" />}
        onPress={({ id }) => navigation.push('Movie', { id })}
      />
      <List
        keyName="documentaries"
        mt="xl"
        listItem={TvShowThumb}
        data={documentaries}
        title={<FormattedMessage id="discover.documentaries" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
      />
      <List
        keyName="family"
        mt="xl"
        listItem={MovieThumb}
        data={family}
        title={<FormattedMessage id="discover.family" />}
        onPress={({ id }) => navigation.push('Movie', { id })}
      />
      <List
        keyName="reality"
        mt="xl"
        listItem={TvShowThumb}
        data={reality}
        title={<FormattedMessage id="discover.reality" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
      />
      <List
        keyName="horror"
        mt="xl"
        listItem={MovieThumb}
        data={horror}
        title={<FormattedMessage id="discover.horror" />}
        onPress={({ id }) => navigation.push('Movie', { id })}
      />
      <List
        keyName="drama"
        mt="xl"
        listItem={TvShowThumb}
        data={drama}
        title={<FormattedMessage id="discover.drama" />}
        onPress={({ id }) => navigation.push('TvShow', { id })}
      />
    </CoverLayout>
  );
}
