import { Animated, ImageBackground, StyleSheet } from 'react-native';
import { globalStyles } from 'styles';


import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';
import { theme } from 'theme';

export type GradientHeaderProps = {
  colors?: GradientProps['colors'];
  scrollY: Animated.Value;
};

export function GradientHeader({
  colors = [theme.colors['default-900'], 'transparent'],
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
      <ImageBackground
        style={[globalStyles.absoluteFill, styles.imageBackground]}
        source={require('../../assets/thumb-gradient.png')}
      />
      <Gradient angle={0} colors={colors} style={globalStyles.absoluteFill} />
      <Gradient
        angle={0}
        colors={['transparent', theme.colors.behind]}
        style={[globalStyles.absoluteFill, styles.darkGradient]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 300
  },
  darkGradient: {
    height: 50,
    zIndex: 2,
    marginTop: 250
  },
  imageBackground: {
    zIndex: 1
  }
});
