export type Space = keyof typeof space;
export type Spaces = typeof space;

const core = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

export const space = {
  ...core,
  marginList: core.lg
};
