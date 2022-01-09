import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Text } from 'components/Text';
import { Link } from 'components/Link';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';

export function MoreLessText({ children, numberOfLines = 3 }) {
  const [showMore, setShowMore] = useState(true);
  const isLoading = children === 'loading';
  const numberOfLoadingLines = numberOfLines + 1;
  const arrayLines = new Array(numberOfLoadingLines).fill('');

  return (
    <>
      {isLoading && (
        <Box>
          {arrayLines.map((_, index) => (
            <Loader
              key={`moreLessText_${index}`}
              width={index === numberOfLoadingLines - 1 ? 0.8 : 0.9}
              height={8}
              mt={index > 0 && 'xs'}
            />
          ))}
          <Loader width={0.3} height={10} mt="xs" />
        </Box>
      )}
      {!isLoading && (
        <>
          <Text numberOfLines={showMore ? numberOfLines : 0}>{children}</Text>
          <Link onPress={() => setShowMore(!showMore)} mt="xxs">
            <FormattedMessage
              id={`moreLessText.${showMore ? 'readMore' : 'less'}`}
            />
          </Link>
        </>
      )}
    </>
  );
}
