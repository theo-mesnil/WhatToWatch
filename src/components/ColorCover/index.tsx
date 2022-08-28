import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { statusBarHeight } from 'constants/statusBar';

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
