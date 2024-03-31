import * as React from 'react';
import { ViewProps } from 'react-native';
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

export interface BoxProps
  extends FlexboxProps,
    BordersProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    ViewProps {
  as?: React.ElementType;
  aspectRatio?: number;
  children?: React.ReactNode;
}

const BoxStyled = styled.View(flexbox, layout, position, space, color, border);

export function Box(props: BoxProps) {
  // @ts-ignore
  return <BoxStyled {...props} />;
}
