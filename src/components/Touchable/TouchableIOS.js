import React, { useState } from 'react';
import styled from 'styled-components/native';
import { border, color, flexbox, layout, position, space } from 'styled-system';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

import { AnimatedBox } from 'components/AnimatedBox';

const StyledTouchableOpacity = styled(TouchableOpacity)(
  space,
  flexbox,
  layout,
  position,
  color,
  border
);

export function TouchableIOS({
  duration = 100,
  endScale = 0.98,
  onPress,
  startScale = 1,
  withoutScale,
  ...rest
}) {
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
      <StyledTouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...rest}
      />
    </AnimatedBox>
  );
}

TouchableIOS.Background = undefined;
