import * as React from 'react';
import { Animated, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import {
  border,
  BordersProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps
} from 'styled-system';

export interface AnimatedBoxProps
  extends FlexboxProps,
    BordersProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    Animated.AnimatedProps<ViewProps> {
  children?: React.ReactNode;
}

const BoxStyled = styled(Animated.View)(
  border,
  color,
  flexbox,
  layout,
  position,
  space
);

export function AnimatedBox(props: AnimatedBoxProps) {
  return <BoxStyled {...props} />;
}
