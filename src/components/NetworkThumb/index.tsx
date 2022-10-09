import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { Icon } from 'components/Icon';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getNetworkLogo } from 'utils/networks';

type NetworkThumbProps = BoxProps &
  Pick<TouchableProps, 'onPress'> & {
    aspectRatio?: number;
    item: {
      id: number;
    };
    isSquare?: boolean;
  };

export const NetworkThumb = ({
  aspectRatio = 1 / 1,
  onPress,
  item,
  isSquare,
  ...rest
}: NetworkThumbProps) => {
  return (
    <Touchable onPress={onPress}>
      <Box
        {...rest}
        borderColor="dark400"
        borderWidth="1px"
        borderRadius={isSquare ? undefined : 200}
        overflow="hidden"
      >
        <Gradient
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          opacity={0.6}
          colors={['dark400', 'dark900']}
          angle={-1}
        />
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
      </Box>
    </Touchable>
  );
};
