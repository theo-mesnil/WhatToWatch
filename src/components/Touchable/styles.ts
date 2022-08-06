import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { border, color, flexbox, layout, position, space } from 'styled-system';

export const Touchable = styled(Pressable)(
  space,
  flexbox,
  layout,
  position,
  color,
  border
);
