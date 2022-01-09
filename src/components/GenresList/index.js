import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import { Actions } from './Actions';

import { useGenres } from 'contexts/genres';
import { List } from 'components/List';
import { GenreThumb } from 'components/GenreThumb';

export function GenresList({ type = 'all', ...rest }) {
  const navigation = useNavigation();
  const bothTypes = type === 'all';
  const [typeSelected, setTypeSelected] = useState(bothTypes ? 'tv' : type);
  const { movie, tv } = useGenres();
  const isTV = typeSelected === 'tv';

  return (
    <List
      keyName="genre"
      data={isTV ? tv : movie}
      onPress={({ id, name }) =>
        navigation.push('Genre', { id, type: typeSelected, name })
      }
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
