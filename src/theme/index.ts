import type { Colors } from './colors';
import { colors } from './colors';
import type { Radii } from './radii';
import { radii } from './radii';
import type { Spaces } from './space';
import { space } from './space';
import type { Texts } from './texts';
import { texts } from './texts';

export type Theme = {
  colors: Colors;
  radii: Radii;
  space: Spaces;
  texts: Texts;
};

export const theme: Theme = {
  colors,
  space,
  radii,
  texts
};
