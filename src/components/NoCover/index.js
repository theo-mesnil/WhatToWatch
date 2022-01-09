import React from 'react';

import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import { Gradient } from 'components/Gradient';

export function NoCover({ icon, opacity = 0.3, size = '60%', withGradient }) {
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
        <Icon size={size} icon={icon} opacity={opacity} />
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
