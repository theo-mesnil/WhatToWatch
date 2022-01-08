import React from 'react';
import styled from 'styled-components/native';
import { border, color, flexbox, layout, position, space } from 'styled-system';

const BoxStyled = styled.View(flexbox, layout, position, space, color, border);

export function Box(props) {
  return <BoxStyled {...props} />;
}
