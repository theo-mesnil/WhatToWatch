import React from 'react';

import { Centered } from 'components/Centered';
import { MoreLessText } from 'components/MoreLessText';
import { ScreenSection } from 'components/ScreenSection';
import { formatGenreList } from 'utils/genres';
import { Text } from 'components/Text';

export function ContentOverview({ description, genres }) {
  const withGenres = !!genres && genres !== 'loading' && genres?.length > 0;

  return withGenres || !!description ? (
    <ScreenSection>
      <Centered>
        {withGenres && (
          <Text
            variant="subtitle1"
            numberOfLines={1}
            mb={description ? 'sm' : undefined}
          >
            {formatGenreList(genres)}
          </Text>
        )}
        {!!description && (
          <>
            <MoreLessText maxWidth="90%">{description}</MoreLessText>
          </>
        )}
      </Centered>
    </ScreenSection>
  ) : null;
}
