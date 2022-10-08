import * as React from 'react';

import { BoxProps } from 'components/Box';
import { Centered } from 'components/Centered';
import { ClockFillIcon, Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { formatGenreList } from 'utils/genres';

type ContentOverviewProps = {
  genres?: Genre[] | string;
  releaseDate?: string | React.ReactElement;
  runtime?: number;
  mb?: BoxProps['mb'];
};

export function ContentOverview({
  genres,
  mb,
  releaseDate,
  runtime
}: ContentOverviewProps) {
  const withGenres = !!genres && genres !== 'loading' && genres?.length > 0;

  return withGenres || releaseDate || runtime ? (
    <Centered mt={-20} mb={mb}>
      {(releaseDate || withGenres) && (
        <Text textAlign="center" variant="subtitle1" numberOfLines={1}>
          {releaseDate}
          {releaseDate && withGenres && ' • '}
          {formatGenreList(genres?.slice(0, 2))}
          {!!runtime && (
            <>
              {releaseDate && withGenres && ' • '}
              <Icon size={12} icon={ClockFillIcon} color="light400" />{' '}
              <Text variant="subtitle1" mt="xxs">
                {runtime}
              </Text>
            </>
          )}
        </Text>
      )}
    </Centered>
  ) : null;
}
