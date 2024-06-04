import { Animated, StyleSheet } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';

export type GradientHeaderProps = {
  angle?: number;
  colors?: GradientProps['colors'];
  scrollY: Animated.Value;
};

export function GradientHeader({
  angle = 0,
  colors = [theme.colors['default-700'], 'transparent'],
  scrollY
}: GradientHeaderProps) {
  return (
    <Animated.View
      style={[
        {
          opacity: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0]
          })
        },
        styles.background,
        globalStyles.absoluteFill
      ]}
    >
      <Gradient
        colors={colors}
        angle={angle}
        style={globalStyles.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 300
  }
});
