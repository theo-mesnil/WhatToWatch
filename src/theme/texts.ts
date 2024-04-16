import { colors } from './colors';

export type Text = 'h1' | 'text';

export type Texts = {
  [K in Text]: {
    color: string;
    fontSize: number;
    fontWeight: 'bold' | 'normal';
  };
};

export const texts: Texts = {
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
