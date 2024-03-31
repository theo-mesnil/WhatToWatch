import * as React from 'react';
import { useIntl } from 'react-intl';
import { LayoutProps } from 'styled-system';

import { Box } from 'components/Box';
import { Link } from 'components/Link';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';

type MoreLessTest = {
  children: string | JSX.Element;
  maxWidth?: LayoutProps['maxWidth'];
  numberOfLines?: number;
};

export function MoreLessText({
  children,
  maxWidth,
  numberOfLines = 3
}: MoreLessTest) {
  const { formatMessage } = useIntl();
  const [showMore, setShowMore] = React.useState(true);
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
          <Text
            maxWidth={maxWidth}
            numberOfLines={showMore ? numberOfLines : 0}
          >
            {children}
          </Text>
          <Link onPress={() => setShowMore(!showMore)} mt="xxs">
            {formatMessage({
              id: `moreLessText.${showMore ? 'readMore' : 'less'}`
            })}
          </Link>
        </>
      )}
    </>
  );
}
