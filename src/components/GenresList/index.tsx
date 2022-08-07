import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { useGenres } from 'contexts/genres';
import { GenreThumb } from 'components/GenreThumb';

import { Actions } from './Actions';

import { List } from 'components/List';

export function GenresList({ type = 'all', ...rest }) {
  const navigation = useNavigation();
  const bothTypes = type === 'all';
  const [typeSelected, setTypeSelected] = useState(bothTypes ? 'tv' : type);
  const { movie, tv } = useGenres();
  const isTV = typeSelected === 'tv';

  const navigateToGenre = ({ id, name }) =>
    navigation.push('Genre', { id, type: typeSelected, name });

  return (
    <List
      keyName="genre"
      data={isTV ? tv : movie}
      onPress={navigateToGenre}
      listItem={GenreThumb}
      title={<FormattedMessage id="common.genres" />}
      itemPerPage={3}
      actions={
        bothTypes && (
          <Actions handleClick={setTypeSelected} type={typeSelected} />
        )
      }
      {...rest}
    />
  );
}
