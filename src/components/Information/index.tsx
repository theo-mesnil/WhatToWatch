import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Text } from 'components/Text';

type InformationProps = BoxProps & {
  children: React.ReactElement;
  title: React.ReactNode;
};

export function Information({ children, title, ...rest }: InformationProps) {
  return (
    <Box {...rest}>
      <Text weight="bold" variant="subtitle1">
        {title}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
}
