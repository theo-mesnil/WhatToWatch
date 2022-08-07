import * as React from 'react';
import { Text } from 'components/Text';
import { Box } from 'components/Box';

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
