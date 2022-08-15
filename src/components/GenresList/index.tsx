import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { useGenres } from 'contexts/genres';

import { Actions } from './Actions';

export function GenresList({ type = 'all', ...rest }) {
  const navigation = useNavigation();
  const bothTypes = type === 'all';
  const [typeSelected, setTypeSelected] = React.useState(
    bothTypes ? 'tv' : type
  );
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
