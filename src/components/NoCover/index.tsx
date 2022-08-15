import * as React from 'react';

import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { Icon, IconElement } from 'components/Icon';

type NoCoverProps = {
  icon: IconElement;
  opacity?: number;
  size?: number;
  withGradient?: boolean;
};

export function NoCover({
  icon,
  opacity = 0.3,
  size = 0.6,
  withGradient
}: NoCoverProps) {
  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
      >
        <Icon icon={icon} size={size} opacity={opacity} />
      </Box>
      {withGradient && (
        <Gradient
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          opacity={0.3}
        />
      )}
    </>
  );
}
