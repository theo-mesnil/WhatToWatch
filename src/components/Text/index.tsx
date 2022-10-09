import styled, { css, DefaultTheme } from 'styled-components/native';
import {
  ColorProps,
  color as colorSystem,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  TextAlignProps,
  typography,
  TypographyProps
} from 'styled-system';

import { getFontFamily } from 'utils/fonts';

export type TextProps = ColorProps &
  FlexboxProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  TypographyProps &
  Omit<ColorProps, 'color'> &
  TextAlignProps & {
    color?: keyof DefaultTheme['colors'];
    theme: DefaultTheme;
    variant?: keyof DefaultTheme['fontSizes'];
    weight?: 'regular' | 'bold' | undefined;
  };

export function getTextFont(variant: TextProps['variant'], theme) {
  return {
    fontFamily: getFontFamily(theme.fontWeights[variant]),
    lineHeight: theme.fontSizes[variant] + 6,
    fontSize: theme.fontSizes[variant]
  };
}

export const Text = styled.Text(
  ({ color = 'light800', theme, variant = 'text', weight }: TextProps) => css`
    font-family: ${getFontFamily(weight || theme.fontWeights[variant])};
    font-size: ${theme.fontSizes[variant]}px;
    color: ${theme.fontColors[variant] || theme.colors[color]};
    line-height: ${theme.fontLineHeights[variant]}px;
    ${flexbox};
    ${layout};
    ${position};
    ${space};
    ${typography};
    ${colorSystem};
  `
);
