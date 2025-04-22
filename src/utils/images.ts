import type { ImageSize } from '~/types/content'

export function getImageUrl(path: string, width: ImageSize = 'w185'): string {
  return `https://image.tmdb.org/t/p/${width}${path}`
}
