export function getImageUrl(path: string, width: number = 185): string {
  return `https://image.tmdb.org/t/p/w${width}${path}`;
}
