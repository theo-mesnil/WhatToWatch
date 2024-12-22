import * as React from 'react';
import type { ViewProps } from 'react-native';
import { Animated, StyleSheet, View } from 'react-native';


import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';
import { theme } from 'theme';

export type LoaderProps = ViewProps & {
  colors?: GradientProps['colors'];
};

export function Loader({
  colors = [theme.colors['default-700'], theme.colors['default-900']],
  style,
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
    <View style={[style, styles.wrapper]} {...rest}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim
          },
          styles.content
        ]}
      >
        <Gradient angle={-0.4} colors={colors} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.ahead
  },
  content: {
    width: '100%',
    height: '100%'
  }
});
