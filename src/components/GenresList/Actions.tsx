import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

export function Actions({ handleClick, type }) {
  return (
    <>
      <Touchable onPress={() => handleClick('tv')}>
        <Text
          variant="h3"
          color={type !== 'tv' ? 'light400' : undefined}
          py="xxs"
          px="xs"
        >
          <FormattedMessage id="common.tvShows" />
        </Text>
      </Touchable>
      <Touchable onPress={() => handleClick('movie')}>
        <Text
          variant="h3"
          color={type !== 'movie' ? 'light400' : undefined}
          py="xxs"
          pl="xs"
        >
          <FormattedMessage id="common.movies" />
        </Text>
      </Touchable>
    </>
  );
}
