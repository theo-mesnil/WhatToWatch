import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { border, color, flexbox, layout, position, space } from 'styled-system';

const BoxStyled = styled(Animated.View)(
  flexbox,
  layout,
  position,
  space,
  color,
  border
);

export function AnimatedBox(props) {
  return <BoxStyled {...props} />;
}
