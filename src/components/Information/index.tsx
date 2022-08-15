import * as React from 'react';

import { Box } from 'components/Box';
import { Text } from 'components/Text';

type InformationProps = {
  children: React.ReactNode;
  title: string;
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
