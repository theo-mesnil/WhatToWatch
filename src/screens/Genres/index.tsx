import { useNavigation, useRoute } from '@react-navigation/core';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { useIntl } from 'react-intl';

import { GenreThumb } from 'components/GenreThumb';
import { Header } from 'components/Header';
import { VerticalList } from 'components/VerticalList';
import { useGenres } from 'contexts/genres';

export function GenresScreen() {
  const { formatMessage } = useIntl();
  const genres = useGenres();
  const route = useRoute<RootStackScreenProps<'Genres'>['route']>();
  const navigation =
    useNavigation<RootStackScreenProps<'Genre'>['navigation']>();
  const type = route?.params?.type || 'movie';
  const genre = genres[type];

  return (
    <>
      <Header
        title={formatMessage({ id: 'common.genres' })}
        subtitle={formatMessage({
          id: `common.${type === 'movie' ? 'movies' : 'tvShows'}`
        })}
        opacity={1}
        position="relative"
      />
      {genre && (
        <VerticalList
          numberOfColumns={2}
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
