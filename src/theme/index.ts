import type { Color, Colors } from './colors';
import { colors } from './colors';
import type { Radii, Radius } from './radii';
import { radii } from './radii';
import type { Space, Spaces } from './space';
import { space } from './space';
import type { Text, Texts } from './texts';
import { texts } from './texts';

type Theme = {
  colors: Colors;
  radii: Radii;
  space: Spaces;
  texts: Texts;
};

const theme: Theme = {
  colors,
  space,
  radii,
  texts
};

export {
  Color,
  Colors,
  Radii,
  Radius,
  Space,
  Spaces,
  Text,
  Texts,
  Theme,
  theme
};
