import styled, { css } from 'styled-components/native';

import { Box } from 'components/Box';

export const ScreenSection = styled(Box)(
  ({ theme }) => css`
    border-top-width: 1px;
    border-color: ${theme.colors.dark600};
    padding-vertical: ${theme.space.xl}px;
  `
);
