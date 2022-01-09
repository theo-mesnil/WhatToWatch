import React from 'react';

import { Box } from 'components/Box';
import { Touchable } from 'components/Touchable';
import { Icon } from 'components/Icon';
import { getNetworkLogo } from 'utils/networks';

export const NetworkThumb = ({
  aspectRatio = 1 / 1,
  onPress,
  item,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      backgroundColor="thumbBackground"
      borderRadius={100}
      overflow="hidden"
    >
      <Touchable onPress={onPress}>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          style={{
            aspectRatio
          }}
        >
          <Icon size="70%" icon={getNetworkLogo(item?.id)} />
        </Box>
      </Touchable>
    </Box>
  );
};
