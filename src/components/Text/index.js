import styled, { css } from 'styled-components/native';
import {
  color as colorSystem,
  flexbox,
  layout,
  position,
  space,
  typography
} from 'styled-system';

import { getFontFamily } from 'utils/fonts';

export const Text = styled.Text(
  ({ color = 'light800', theme, variant = 'text', weight }) => css`
    font-family: ${getFontFamily(weight || theme.fontWeights[variant])};
    font-size: ${theme.fontSizes[variant]}px;
    color: ${theme.fontColors[variant] || theme.colors[color]};
    line-height: ${theme.fontSizes[variant] + 6}px;
    ${flexbox};
    ${layout};
    ${position};
    ${space};
    ${typography};
    ${colorSystem};
  `
);
