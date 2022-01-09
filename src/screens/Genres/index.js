import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { FormattedMessage } from 'react-intl';

import { GenreThumb } from 'components/GenreThumb';
import { useGenres } from 'contexts/genres';
import { Header } from 'components/Header';
import { VerticalList } from 'components/VerticalList';

export function GenresScreen() {
  const genres = useGenres();
  const route = useRoute();
  const navigation = useNavigation();
  const type = route?.params?.type || 'movie';
  const genre = genres[type];

  return (
    <>
      <Header
        title={<FormattedMessage id="common.genres" />}
        subtitle={
          <FormattedMessage
            id={`common.${type === 'movie' ? 'movies' : 'tvShows'}`}
          />
        }
        opacity={1}
        position="relative"
      />
      {genre && (
        <VerticalList
          numberOfColumns={3}
          aspectRatio={5 / 4}
          resultsData={genre}
          onPress={({ id, name }) =>
            navigation.push('Genre', { id, name, type })
          }
          renderItem={GenreThumb}
        />
      )}
    </>
  );
}
