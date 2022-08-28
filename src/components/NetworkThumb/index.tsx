import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Icon } from 'components/Icon';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getNetworkLogo } from 'utils/networks';

type NetworkThumbProps = BoxProps &
  Pick<TouchableProps, 'onPress'> & {
    aspectRatio?: number;
    item: {
      id: number;
    };
  };

export const NetworkThumb = ({
  aspectRatio = 1 / 1,
  onPress,
  item,
  ...rest
}: NetworkThumbProps) => {
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
          <Icon size={0.7} icon={getNetworkLogo(item?.id)} />
        </Box>
      </Touchable>
    </Box>
  );
};
