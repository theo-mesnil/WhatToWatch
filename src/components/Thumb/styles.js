import styled, { css } from 'styled-components/native';

export const Image = styled.ImageBackground(
  ({ theme }) => css`
    overflow: hidden;
    border-radius: ${theme.radii.md}px;
    background-color: ${theme.colors.dark600};
  `
);
