import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components/native';

import { useGetTrending } from 'api/trending';
import { Box } from 'components/Box';
import { CategoryThumb } from 'components/CategoryThumb';
import { GridFillIcon, MovieFillIcon, TvFillIcon } from 'components/Icon';
import { BasicLayout } from 'layouts/Basic';
import { getTrendTitle } from 'utils/trends';

type Trending = {
  backdrop_path: string;
  profile_path: string;
}[];

function CategoryItem(props) {
  return (
    <Box width={'50%'} p="xs">
      <Box>
        <CategoryThumb {...props} />
      </Box>
    </Box>
  );
}

export function TrendsScreen() {
  const [trendingMovie, setTrendingMovie] = useState<Trending | 'loading'>(
    'loading'
  );
  const [trendingTv, setTrendingTv] = useState<Trending | 'loading'>('loading');
  const [trendingPeople, setTrendingPeople] = useState<Trending | 'loading'>(
    'loading'
  );
  const getTrending = useGetTrending();
  const theme = useTheme();
  const navigation = useNavigation();
  const trendingMovieIsLoading = trendingMovie === 'loading';
  const trendingTvIsLoading = trendingTv === 'loading';
  const trendingPeopleIsLoading = trendingPeople === 'loading';

  useEffect(() => {
    getTrending(setTrendingTv);
    getTrending(setTrendingMovie, 'movie');
    getTrending(setTrendingPeople, 'person');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BasicLayout>
      <Box p="sm" flexDirection="row" flexWrap="wrap">
        <CategoryItem
          imageUrl={!trendingMovieIsLoading && trendingMovie?.[0].backdrop_path}
          isLoading={trendingMovieIsLoading}
          onPress={() => navigation.navigate('Trend', { type: 'movie' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('movie')}
        />
        <CategoryItem
          imageUrl={!trendingTvIsLoading && trendingTv?.[0].backdrop_path}
          isLoading={trendingTvIsLoading}
          onPress={() => navigation.navigate('Trend', { type: 'tv' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('tv')}
        />
        <CategoryItem
          imageUrl={
            !trendingPeopleIsLoading && trendingPeople?.[0].profile_path
          }
          isLoading={trendingPeopleIsLoading}
          onPress={() => navigation.navigate('Trend', { type: 'people' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('people')}
        />
        <CategoryItem
          gradient={theme.colors.genres[10767]}
          onPress={() => navigation.navigate('Trend', { type: 'all' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('all')}
          icon={GridFillIcon}
        />
        <CategoryItem
          gradient={theme.colors.genres[10764]}
          onPress={() => navigation.navigate('Genres', { type: 'movie' })}
          subtitle={<FormattedMessage id="common.genres" />}
          title={<FormattedMessage id="common.movies" />}
          icon={MovieFillIcon}
        />
        <CategoryItem
          gradient={theme.colors.genres[99]}
          onPress={() => navigation.navigate('Genres', { type: 'tv' })}
          subtitle={<FormattedMessage id="common.genres" />}
          title={<FormattedMessage id="common.tvShows" />}
          icon={TvFillIcon}
        />
      </Box>
    </BasicLayout>
  );
}
