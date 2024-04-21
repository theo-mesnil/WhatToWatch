export type NetworkId =
  | /* Netflix */ 213
  | /* AmazonPrime */ 1024
  | /* HBO */ 49
  | /* DisneyPlus */ 2739
  | /* AppleTvPlus */ 2552
  | /* Hulu */ 453
  | /* Fox */ 67
  | /* Showtime */ 19
  | number;

export type ContentType = 'tv' | 'movie' | 'person' | string;

export type ImageSize = ImageSizePoster | ImageSizeBackdrop;
export type ImageSizeBackdrop = 'original' | 'w300' | 'w780' | 'w1280';
export type ImageSizePoster =
  | 'original'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w92';
