import styled, { css } from 'styled-components/native';

import { AnimatedBox } from 'components/AnimatedBox';

type BlockProps = {
  headerHeight: number;
  statusBarHeight: number;
};

export const Block = styled(AnimatedBox)<BlockProps>(
  ({ headerHeight, statusBarHeight, theme }) => css`
    position: absolute;
    align-items: center;
    bottom: 0;
    flex-direction: row;
    height: ${headerHeight}px;
    left: 0;
    padding: ${statusBarHeight}px ${theme.space.lg}px 0 ${theme.space.lg}px;
    right: 0;
    top: 0;
  `
);
