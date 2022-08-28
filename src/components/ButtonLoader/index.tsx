import * as React from 'react';

import { Box } from 'components/Box';
import { Loader } from 'components/Loader';

export function ButtonLoader() {
  return (
    <Box height={34} borderRadius={34} width={100} overflow="hidden">
      <Loader />
    </Box>
  );
}
