import { colors } from './colors';

export type Text = 'h0' | 'h1' | 'h2' | 'h3' | 'md' | 'lg';

export type Texts = {
  [K in Text]: {
    color: string;
    fontSize: number;
    fontWeight: 'bold' | 'normal';
  };
};

export const texts: Texts = {
  h0: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.white
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  },
  lg: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.text
  },
  md: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.text
  }
};
