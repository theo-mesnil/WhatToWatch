import { statusBarHeight } from 'constants/statusBar';

import React from 'react';
import { Box, BoxProps } from 'components/Box';

export function ColorCover(props: BoxProps) {
  return (
    <Box
      pt={statusBarHeight}
      height={150}
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
}
