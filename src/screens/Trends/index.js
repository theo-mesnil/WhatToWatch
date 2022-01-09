import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { FormattedMessage } from 'react-intl';

import { Box } from 'components/Box';
import { useGetTrending } from 'api/trending';
import { BasicLayout } from 'layouts/Basic';
import { CategoryThumb } from 'components/CategoryThumb';
import { getTrendTitle } from 'utils/trends';
import { GridFillIcon, MovieFillIcon, TvFillIcon } from 'components/Icon';

export function TrendsScreen() {
  const [trendingMovie, setTrendingMovie] = useState('loading');
  const [trendingTv, setTrendingTv] = useState('loading');
  const [trendingPeople, setTrendingPeople] = useState('loading');
  const getTrending = useGetTrending();
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    getTrending(setTrendingTv);
    getTrending(setTrendingMovie, 'movie');
    getTrending(setTrendingPeople, 'person');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function CategoryItem(props) {
    return (
      <Box width={`${100 / 2}%`} p="xs">
        <Box>
          <CategoryThumb {...props} />
        </Box>
      </Box>
    );
  }

  return (
    <BasicLayout>
      <Box p="sm" flexDirection="row" flexWrap="wrap">
        <CategoryItem
          imageUrl={trendingMovie?.[0].backdrop_path}
          isLoading={trendingMovie === 'loading'}
          onPress={() => navigation.navigate('Trend', { type: 'movie' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('movie')}
        />
        <CategoryItem
          imageUrl={trendingTv?.[0].backdrop_path}
          isLoading={trendingTv === 'loading'}
          onPress={() => navigation.navigate('Trend', { type: 'tv' })}
          subtitle={<FormattedMessage id="common.trends" />}
          title={getTrendTitle('tv')}
        />
        <CategoryItem
          imageUrl={trendingPeople?.[0].profile_path}
          isLoading={trendingPeople === 'loading'}
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
