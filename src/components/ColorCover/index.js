import React from 'react';

import { Box } from 'components/Box';
import { statusBarHeight } from 'constants/statusBar';

export function ColorCover(props) {
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
