import React from 'react';
import { Image } from 'react-native';
import { memo } from 'react';

import { Box } from 'components/Box';
import { getImageUrl } from 'utils/images';
import { screenWidth } from 'constants/screen';

export const Item = memo(({ item }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Box
        style={{
          aspectRatio: item?.aspectRatio,
          width: screenWidth
        }}
        maxWidth={700}
        as={Image}
        source={{ uri: getImageUrl(item?.source, 500) }}
      />
    </Box>
  );
});
