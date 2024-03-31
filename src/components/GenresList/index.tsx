import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { useIntl } from 'react-intl';

import { BoxProps } from 'components/Box';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { useGenres } from 'contexts/genres';

import { Actions } from './Actions';

type GenresListProps = BoxProps & {
  type?: 'movie' | 'tv' | 'all';
};

export function GenresList({ type = 'all', ...rest }: GenresListProps) {
  const { formatMessage } = useIntl();
  const navigation =
    useNavigation<RootStackScreenProps<'Genre'>['navigation']>();
  const bothTypes = type === 'all';
  const [typeSelected, setTypeSelected] = React.useState<'tv' | 'movie'>(
    bothTypes ? 'tv' : 'movie'
  );
  const { movie, tv } = useGenres();
  const isTV = typeSelected === 'tv';

  const navigateToGenre = ({ id, name }: { id: number; name: string }) =>
    navigation.push('Genre', { id, type: typeSelected, name });

  return (
    <List
      keyName="genre"
      data={isTV ? tv : movie}
      onPress={navigateToGenre}
      listItem={GenreThumb}
      itemProps={{ isTV, withIcon: true }}
      title={formatMessage({ id: 'common.genres' })}
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
