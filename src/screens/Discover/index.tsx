import { useNavigation } from '@react-navigation/native';
import { MainTabScreenProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetDiscoverMovie, useGetDiscoverTvShow } from 'api/discover';
import { useGetUpcoming } from 'api/movie';
import { useGetPopular } from 'api/popular';
import { useGetTrending } from 'api/trending';
import { ContentThumb } from 'components/ContentThumb';
import { GenresList } from 'components/GenresList';
import { List } from 'components/List';
import { MovieThumb } from 'components/MovieThumb';
import { NetworkThumb } from 'components/NetworkThumb';
import { PeopleThumb } from 'components/PeopleThumb';
import { SpotlightList } from 'components/SpotlightList';
import { TopList } from 'components/TopList';
import { TvShowThumb } from 'components/TvShowThumb';
import { networksList } from 'constants/networks';
import { CoverLayout } from 'layouts/Cover';

export function DiscoverScreen() {
  const [trendings, setTrendings] = useState(undefined);
  const [trendingTv, setTrendingTv] = useState(undefined);
  const [trendingMovie, setTrendingMovie] = useState(undefined);
  const [trendingPeople, setTrendingPeople] = useState(undefined);
  const [upcomingMovies, setUpcomingMovies] = useState(undefined);
  const [documentaries, setDocumentaries] = useState(undefined);
  const [family, setFamily] = useState();
  const [comedies, setComedies] = useState();
  const [reality, setReality] = useState();
  const [horror, setHorror] = useState();
  const [drama, setDrama] = useState();
  const [spotlightActiveSlide, setSpotlightActiveSlide] = React.useState(0);
  const getTrending = useGetTrending();
  const getPopular = useGetPopular();
  const getUpcoming = useGetUpcoming();
  const getDiscoverMovie = useGetDiscoverMovie();
  const getDiscoverTv = useGetDiscoverTvShow();
  const navigation =
    useNavigation<MainTabScreenProps<'Discover'>['navigation']>();

  function spotlightPress({ id, name, type }) {
    if (type === 'movie') {
      navigation.push('Movie', { id, name });
    }
    if (type === 'tv') {
      navigation.push('TvShow', { id, name });
    }
    if (type === 'person') {
      navigation.push('People', { id, name });
    }
  }

  useEffect(() => {
    getTrending({ callback: setTrendings, type: 'all' });
    getTrending({ callback: setTrendingTv });
    getTrending({ callback: setTrendingMovie, type: 'movie' });
    setTimeout(() => {
      getPopular({ callback: setTrendingPeople, type: 'person' });
      getDiscoverTv({
        callback: setComedies,
        params: [{ name: 'with_genres', value: '35' }]
      });
      getUpcoming({
        callback: setUpcomingMovies
      });
    }, 500);
    setTimeout(() => {
      getDiscoverTv({
        callback: setDocumentaries,
        params: [{ name: 'with_genres', value: '99' }]
      });
      getDiscoverMovie({
        callback: setFamily,
        params: [{ name: 'with_genres', value: '10751' }]
      });
      getDiscoverTv({
        callback: setReality,
        params: [{ name: 'with_genres', value: '10764' }]
      });
      getDiscoverMovie({
        callback: setHorror,
        params: [{ name: 'with_genres', value: '27' }]
      });
      getDiscoverTv({
        callback: setDrama,
        params: [{ name: 'with_genres', value: '18' }]
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getActiveSlide(activeSlide) {
    setSpotlightActiveSlide(activeSlide);
  }

  return (
    <CoverLayout imageUrl={trendings?.[spotlightActiveSlide]?.backdrop_path}>
      <SpotlightList
        keyName="trendings"
        data={trendings?.slice(0, 5)}
        onPress={spotlightPress}
        listItem={ContentThumb}
        getActiveSlide={getActiveSlide}
      />
      <List
        mt="xl"
        data={networksList}
        keyName="networks"
        listItem={NetworkThumb}
        onPress={({ id }) => navigation.push('Network', { id })}
        itemPerPage={4}
      />
      <List
        keyName="upcoming_movies"
        mt="xl"
        listItem={MovieThumb}
        data={upcomingMovies}
        title={<FormattedMessage id="discover.upcomingMovies" />}
        onPress={({ id, name }) => navigation.push('Movie', { id, name })}
      />
      <TopList
        mt="xl"
        listItem={ContentThumb}
        keyName="top10"
        data={trendings?.slice(0, 10)}
        onPress={spotlightPress}
        title="Top 10"
        imageWidth={342}
        itemPerPage={2}
      />
      <List
        keyName="trending_shows"
        mt="xl"
        listItem={TvShowThumb}
        imageWidth={342}
        data={trendingTv}
        title={<FormattedMessage id="discover.trendsShows" />}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
      />
      <List
        mt="xl"
        keyName="people"
        data={trendingPeople}
        title={<FormattedMessage id="discover.popularPeople" />}
        itemPerPage={4}
        onPress={({ id, name }) => navigation.push('People', { id, name })}
        listItem={PeopleThumb}
      />
      <List
        mt="xl"
        listItem={MovieThumb}
        keyName="trending_movies"
        data={trendingMovie}
        onPress={({ id, name }) => navigation.push('Movie', { id, name })}
        title={<FormattedMessage id="discover.trendsMovies" />}
        imageWidth={342}
      />
      <GenresList mt="xl" />
      <List
        keyName="comedies"
        mt="xl"
        listItem={TvShowThumb}
        data={comedies}
        title={<FormattedMessage id="discover.comedies" />}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
      />
      <List
        keyName="documentaries"
        mt="xl"
        listItem={TvShowThumb}
        data={documentaries}
        title={<FormattedMessage id="discover.documentaries" />}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
      />
      <List
        keyName="family"
        mt="xl"
        listItem={MovieThumb}
        data={family}
        title={<FormattedMessage id="discover.family" />}
        onPress={({ id, name }) => navigation.push('Movie', { id, name })}
      />
      <List
        keyName="reality"
        mt="xl"
        listItem={TvShowThumb}
        data={reality}
        title={<FormattedMessage id="discover.reality" />}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
      />
      <List
        keyName="horror"
        mt="xl"
        listItem={MovieThumb}
        data={horror}
        title={<FormattedMessage id="discover.horror" />}
        onPress={({ id, name }) => navigation.push('Movie', { id, name })}
      />
      <List
        keyName="drama"
        mt="xl"
        listItem={TvShowThumb}
        data={drama}
        title={<FormattedMessage id="discover.drama" />}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
      />
    </CoverLayout>
  );
}
