import * as React from 'react';

import { Box, BoxProps } from 'components/Box';

export function Centered(props: BoxProps) {
  return <Box px="lg" {...props} />;
}
