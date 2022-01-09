import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useTransformColors } from 'utils/colors';

export function Gradient({
  colors = ['transparent', 'dark900'],
  angle,
  ...style
}) {
  const transformColors = useTransformColors();
  const angleFormatted = angle
    ? {
        start: [0, 0],
        end: [1, angle]
      }
    : {
        start: [0, 0],
        end: [0, 1]
      };

  return (
    <LinearGradient
      colors={transformColors(colors)}
      {...angleFormatted}
      style={{ ...style }}
    />
  );
}
