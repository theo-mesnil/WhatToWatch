import styled, { css } from 'styled-components/native';

import { Box } from 'components/Box';

export const Before = styled(Box)(
  ({ theme }) => css`
    width: ${theme.space.lg}px;
    height: 100%;
  `
);
