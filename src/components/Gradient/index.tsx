import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { useTransformColors } from 'utils/colors';

export interface GradientProps extends BoxProps {
  colors?: [Color, Color];
  angle?: number;
}

export function Gradient({
  colors = ['transparent', 'dark900'],
  angle,
  ...rest
}: GradientProps) {
  const transformColors = useTransformColors();
  const end = angle ? [1, angle] : [0, 1];

  return (
    <Box {...rest}>
      <LinearGradient
        colors={transformColors(colors)}
        start={[0, 0]}
        end={end as LinearGradientProps['end']}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </Box>
  );
}
