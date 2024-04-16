import type { Color } from './colors';

type Text = 'h1' | 'text';

export type Texts = {
  fontColors: {
    [K in Text]: Color;
  };
  fontLineHeights: {
    [K in Text]: number;
  };
  fontSizes: {
    [K in Text]: number;
  };
  fontWeights: {
    [K in Text]: 'bold' | 'regular';
  };
};

export const texts: Texts = {
  fontSizes: {
    h1: 26,
    text: 13
  },
  fontLineHeights: {
    h1: 29,
    text: 19
  },
  fontWeights: {
    h1: 'bold',
    text: 'regular'
  },
  fontColors: {
    h1: 'white',
    text: 'text'
  }
};
