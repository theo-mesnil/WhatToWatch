import React, { useState } from 'react';
import { Animated } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { border, color, flexbox, layout, position, space } from 'styled-system';

import { AnimatedBox } from 'components/AnimatedBox';

const StyledTouchableNativeFeedback = styled(TouchableNativeFeedback)(
  space,
  flexbox,
  layout,
  position,
  color,
  border
);

export function TouchableAndroid({
  duration = 100,
  endScale = 0.98,
  onPress,
  startScale = 1,
  withoutScale,
  ...rest
}) {
  const theme = useTheme();
  const [scaleAnimation] = useState(new Animated.Value(startScale));
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
    <AnimatedBox
      style={[
        {
          transform: [{ scale: scaleAnimation }]
        }
      ]}
    >
      <StyledTouchableNativeFeedback
        background={{ type: 'Ripple', color: theme.colors.behind }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...rest}
      />
    </AnimatedBox>
  );
}
