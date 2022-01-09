import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { FormattedMessage } from 'react-intl';

import { Header } from 'components/Header';
import { Box } from 'components/Box';
import { VerticalList } from 'components/VerticalList';
import { useGetDiscoverMovie, useGetDiscoverTvShow } from 'api/discover';
import { TvShowThumb } from 'components/TvShowThumb';
import { MovieThumb } from 'components/MovieThumb';
import { Text } from 'components/Text';
import { Gradient } from 'components/Gradient';
import { ColorCover } from 'components/ColorCover';

export function GenreScreen() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = useState(300);
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const genreID = route?.params?.id;
  const contentType = route?.params?.type;
  const genreName = route?.params?.name;
  const isTV = contentType === 'tv';
  const getDiscoverTvShow = useGetDiscoverTvShow();
  const getDiscoverMovie = useGetDiscoverMovie();
  const inputRange = titleOffset - 100;

  return (
    <>
      <Header
        title={genreName}
        subtitle={
          <FormattedMessage id={`common.${isTV ? 'tvShows' : 'movies'}`} />
        }
        offset={titleOffset}
        opacity={scrollY.interpolate({
          inputRange: [inputRange, inputRange],
          outputRange: [0, 1]
        })}
      />
      <VerticalList
        getApi={isTV ? getDiscoverTvShow : getDiscoverMovie}
        renderItem={isTV ? TvShowThumb : MovieThumb}
        params={[{ name: 'with_genres', value: `${genreID}` }]}
        onPress={({ id }) => navigation.push(isTV ? 'TvShow' : 'Movie', { id })}
        handleScroll={setScrollY}
      >
        <>
          <ColorCover>
            <Gradient
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              opacity={0.6}
              colors={
                theme.colors.genres[genreID] || theme.colors.genres.default
              }
              angle={-0.4}
            />
            <Text variant="h1">{genreName}</Text>
          </ColorCover>
          <Box
            onLayout={({
              nativeEvent: {
                layout: { y }
              }
            }) => setTitleOffset(y)}
          />
        </>
      </VerticalList>
    </>
  );
}
