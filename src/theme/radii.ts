export type Radius = keyof typeof radii;
export type Radii = typeof radii;

const core = {
  xs: 2,
  sm: 4,
  md: 8,
  xxl: 20
};

export const radii = core;
