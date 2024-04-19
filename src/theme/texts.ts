import { colors } from './colors';

export type Text = 'h0' | 'h1' | 'text';

export type Texts = {
  [K in Text]: {
    color: string;
    fontSize: number;
    fontWeight: 'bold' | 'normal';
  };
};

export const texts: Texts = {
  h0: {
    fontSize: 33,
    fontWeight: 'bold',
    color: colors.white
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white
  },
  text: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.text
  }
};
