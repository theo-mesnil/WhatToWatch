import styled, { css } from 'styled-components/native';

import { Box } from 'components/Box';

export const Separator = styled(Box)(
  ({ theme }) => css`
    width: ${theme.space.sm}px;
    height: 100%;
  `
);

export const BeforeAndAfter = styled(Box)(
  ({ theme }) => css`
    width: ${theme.space.lg}px;
    height: 100%;
  `
);
