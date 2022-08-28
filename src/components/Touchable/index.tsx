import * as React from 'react';
import { Animated, PressableProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  BordersProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps
} from 'styled-system';

import { AnimatedBox } from 'components/AnimatedBox';

import * as S from './styles';

export interface TouchableProps
  extends FlexboxProps,
    BordersProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    PressableProps {
  children?: React.ReactNode;
  duration?: number;
  endScale?: number;
  startScale?: number;
  withoutScale?: boolean;
}

export function Touchable({
  duration = 500,
  endScale = 0.98,
  onPress,
  startScale = 1,
  withoutScale,
  ...rest
}: TouchableProps) {
  const theme = useTheme();
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
    <AnimatedBox
      style={[
        {
          transform: [{ scale: scaleAnimation }]
        }
      ]}
    >
      <S.Touchable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={{ color: theme.colors.behind, foreground: true }}
        {...rest}
      />
    </AnimatedBox>
  );
}
