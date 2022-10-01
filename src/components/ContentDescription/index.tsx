import * as React from 'react';

import { Box } from 'components/Box';
import { Centered } from 'components/Centered';
import { Icon, StarFillIcon } from 'components/Icon';
import { MoreLessText } from 'components/MoreLessText';
import { Text } from 'components/Text';

type ContentDescriptionProps = {
  description?: string;
  votes: {
    number: number;
    count: number;
  };
};

export function ContentDescription({
  description,
  votes
}: ContentDescriptionProps) {
  const voteNumber = votes?.number;
  const voteCount = votes?.count;

  return !!voteNumber || !!description ? (
    <Centered my="md">
      {!!description && (
        <>
          <MoreLessText maxWidth="90%">{description}</MoreLessText>
        </>
      )}
      {!!voteNumber && (
        <Box flexDirection="row" alignItems="center" mt={!!description && 'sm'}>
          <Icon size={15} icon={StarFillIcon} color="yellow" />
          <Text variant="h3" color="light900" ml="xxs">
            {voteNumber?.toString()?.substring(0, 3)}
          </Text>
          <Text variant="subtitle2" ml="xxs" color="light400">
            ({voteCount})
          </Text>
        </Box>
      )}
    </Centered>
  ) : null;
}
