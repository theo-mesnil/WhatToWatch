import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

import { useGetDiscoverMovie, useGetDiscoverTvShow } from 'api/discover';
import { Box } from 'components/Box';
import { ColorCover } from 'components/ColorCover';
import { Gradient } from 'components/Gradient';
import { Header } from 'components/Header';
import { MovieThumb } from 'components/MovieThumb';
import { Text } from 'components/Text';
import { TvShowThumb } from 'components/TvShowThumb';
import { VerticalList } from 'components/VerticalList';

export function GenreScreen() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = useState(300);
  const navigation =
    useNavigation<RootStackScreenProps<'Movie'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Genre'>['route']>();
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
        opacity={
          scrollY.interpolate({
            inputRange: [inputRange, inputRange],
            outputRange: [0, 1]
          }) as Animated.Value
        }
      />
      <VerticalList
        getApi={isTV ? getDiscoverTvShow : getDiscoverMovie}
        renderItem={isTV ? TvShowThumb : MovieThumb}
        params={[{ name: 'with_genres', value: `${genreID}` }]}
        onPress={({ id, name }) =>
          navigation.push(isTV ? 'TvShow' : 'Movie', { id, name })
        }
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
