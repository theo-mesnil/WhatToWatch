export type Space = keyof typeof space
export type Spaces = typeof space

const core = {
  lg: 16,
  md: 12,
  sm: 8,
  xl: 24,
  xs: 6,
  xxl: 32,
  xxs: 4,
}

export const space = {
  ...core,
  marginList: core.lg,
}
