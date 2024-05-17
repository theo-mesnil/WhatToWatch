import type {
  NETWORK_APPLE_TV_PLUS_ID,
  NETWORK_DISNEY_PLUS_ID,
  NETWORK_FOX_ID,
  NETWORK_HBO_ID,
  NETWORK_HULU_ID,
  NETWORK_NETFLIX_ID,
  NETWORK_PRIME_VIDEO,
  NETWORK_SHOWTIME_ID
} from 'constants/networks';

export type NetworkId =
  | typeof NETWORK_PRIME_VIDEO
  | typeof NETWORK_APPLE_TV_PLUS_ID
  | typeof NETWORK_DISNEY_PLUS_ID
  | typeof NETWORK_FOX_ID
  | typeof NETWORK_HBO_ID
  | typeof NETWORK_HULU_ID
  | typeof NETWORK_NETFLIX_ID
  | typeof NETWORK_SHOWTIME_ID;

export type ContentType = 'tv' | 'movie' | 'person';

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
