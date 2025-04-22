import { colors } from './colors'

export type Text = 'h0' | 'h1' | 'h2' | 'h3' | 'lg' | 'md'

export type Texts = {
  [key in Text]: {
    color: string
    fontSize: number
    fontWeight: 'bold' | 'normal'
  }
}

export const texts: Texts = {
  h0: {
    color: colors.white,
    fontSize: 38,
    fontWeight: 'bold',
  },
  h1: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  h2: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  lg: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'normal',
  },
  md: {
    color: colors.text,
    fontSize: 13,
    fontWeight: 'normal',
  },
}
