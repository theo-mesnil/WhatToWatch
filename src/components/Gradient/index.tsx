import type { LinearGradientProps } from 'expo-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { globalStyles } from 'styles';
import { colors as themeColors } from 'theme/colors';

export interface GradientProps extends ViewProps {
  angle?: number;
  colors?: string[];
}

export function Gradient({
  angle,
  colors = ['transparent', themeColors.behind],
  ...rest
}: GradientProps) {
  const end = angle ? [1, angle] : [0, 1];

  return (
    <View style={globalStyles.absoluteFill} {...rest}>
      <LinearGradient
        colors={colors}
        start={[0, 0]}
        end={end as LinearGradientProps['end']}
        style={globalStyles.absoluteFill}
      />
    </View>
  );
}
