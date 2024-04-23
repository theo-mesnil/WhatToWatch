import * as React from 'react';
import type { PressableProps } from 'react-native';
import { Animated, Pressable } from 'react-native';

export type TouchableProps = PressableProps & {
  children?: React.ReactNode;
  duration?: number;
  endScale?: number;
  startScale?: number;
  withoutScale?: boolean;
};

export const Touchable = React.forwardRef<any, TouchableProps>(
  (
    {
      duration = 500,
      endScale = 0.98,
      onPress,
      startScale = 1,
      withoutScale,
      ...rest
    },
    ref
  ) => {
    const [scaleAnimation] = React.useState(new Animated.Value(startScale));
    const endScaleFormatted = withoutScale ? startScale : endScale;

    function onPressIn() {
      Animated.timing(scaleAnimation, {
        toValue: endScaleFormatted,
        duration,
        useNativeDriver: true
      }).start();
    }

    function onPressOut() {
      Animated.timing(scaleAnimation, {
        toValue: startScale,
        duration,
        useNativeDriver: true
      }).start();
    }

    return (
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnimation }]
          }
        ]}
      >
        <Pressable
          ref={ref}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          {...rest}
        />
      </Animated.View>
    );
  }
);
