export type Color = keyof typeof colors;
export type Colors = typeof colors;

const core = {
  'brand-100': '#b98eed',
  'brand-200': '#af7dea',
  'brand-300': '#a56de8',
  'brand-400': '#a065e6',
  'brand-500': '#9B5DE5',
  'brand-600': '#924fe3',
  'brand-700': '#8a41e1',
  'brand-800': '#7925dc',
  'brand-900': '#7121d0',
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
  ...core,
  ahead: core['default-800'],
  behind: core['default-900'],
  text: core['default-300'],
  title: core.white
};
