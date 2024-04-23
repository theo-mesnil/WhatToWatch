export type Color = keyof typeof colors;
export type Colors = typeof colors;

const globalColors = {
  'brand-100': '#fefdfc',
  'brand-200': '#fdf9f8',
  'brand-300': '#f8edeb',
  'brand-400': '#f5e2dd',
  'brand-500': '#f0d6d0',
  'brand-600': '#e9c8c1',
  'brand-700': '#e0b6ad',
  'brand-800': '#d29e92',
  'brand-900': '#b2786c',
  'default-100': '#cccccc',
  'default-200': '#b3b3b3',
  'default-300': '#999999',
  'default-400': '#808080',
  'default-500': '#666666',
  'default-600': '#4d4d4d',
  'default-700': '#333333',
  'default-800': '#1a1a1a',
  'default-900': '#0d0d0d',
  black: '#000000',
  white: '#ffffff'
};

export const colors = {
  ...globalColors,
  ahead: globalColors['default-800'],
  behind: globalColors['default-900'],
  text: globalColors['default-300'],
  title: globalColors.white
};
