import React from 'react';

import { Text } from 'components/Text';
import { Box } from 'components/Box';

export function Information({ children, title, ...rest }) {
  return (
    <Box {...rest}>
      <Text fontWeight="bold" variant="subtitle1">
        {title}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
}
