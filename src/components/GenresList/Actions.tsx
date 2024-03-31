import * as React from 'react';
import { useIntl } from 'react-intl';

import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

type Type = 'tv' | 'movie';

type ActionsProps = {
  handleClick: (type: Type) => void;
  type: Type;
};

export function Actions({ handleClick, type }: ActionsProps) {
  const { formatMessage } = useIntl();

  return (
    <>
      <Touchable onPress={() => handleClick('tv')}>
        <Text
          variant="h3"
          color={type !== 'tv' ? 'light400' : undefined}
          py="xxs"
          px="xs"
        >
          {formatMessage({ id: 'common.tvShows' })}
        </Text>
      </Touchable>
      <Touchable onPress={() => handleClick('movie')}>
        <Text
          variant="h3"
          color={type !== 'movie' ? 'light400' : undefined}
          py="xxs"
          pl="xs"
        >
          {formatMessage({ id: 'common.movies' })}
        </Text>
      </Touchable>
    </>
  );
}
