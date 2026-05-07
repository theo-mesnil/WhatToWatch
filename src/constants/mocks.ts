export function buildPlaceholderData(count: number) {
  return Array.from({ length: Math.max(1, Math.ceil(count)) }, (_, index) => ({
    _placeholder: index,
  }))
}
