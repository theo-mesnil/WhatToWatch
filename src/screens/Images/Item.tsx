import * as React from 'react';
import { memo } from 'react';

import { Box } from 'components/Box';
import { Image } from 'components/Image';
import { screenWidth } from 'constants/screen';
import { getImageUrl } from 'utils/images';

type ItemProps = {
  item: {
    aspectRatio?: number;
    source: string;
  };
};

export const Item = memo(({ item }: ItemProps) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Image
        aspectRatio={item?.aspectRatio}
        maxWidth={700}
        width={screenWidth}
        source={{ uri: getImageUrl(item?.source, 500) }}
      />
    </Box>
  );
});
