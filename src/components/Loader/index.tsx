import * as React from 'react';
import { Animated } from 'react-native';

import { AnimatedBox } from 'components/AnimatedBox';
import { Box, BoxProps } from 'components/Box';
import { Gradient } from 'components/Gradient';

export interface LoaderProps extends BoxProps {
  colors?: [Color, Color];
}

export function Loader({
  colors = ['dark600', 'dark800'],
  ...rest
}: LoaderProps) {
  const startValue = 0.1;
  const [fadeAnim] = React.useState(new Animated.Value(startValue));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: startValue,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  });

  return (
    <Box backgroundColor="ahead" {...rest}>
      <AnimatedBox
        style={{
          opacity: fadeAnim
        }}
        width="100%"
        height="100%"
      >
        <Gradient angle={-0.4} colors={colors} width="100%" height="100%" />
      </AnimatedBox>
    </Box>
  );
}
