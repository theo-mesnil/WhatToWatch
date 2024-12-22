import type { NetworkId } from 'types/content';

// import { REGION_CODE } from './locales';

export const NETWORK_APPLE_TV_PLUS_ID = 2552;
export const NETWORK_DISNEY_PLUS_ID = 2739;
export const NETWORK_FOX_ID = 19;
export const NETWORK_HBO_ID = 49;
export const NETWORK_HULU_ID = 453;
export const NETWORK_NETFLIX_ID = 213;
// export const NETWORK_PARAMOUNT_PLUS = REGION_CODE === 'FR' ? 6445 : 4330;
export const NETWORK_PARAMOUNT_PLUS = 4330;
export const NETWORK_PRIME_VIDEO = 1024;
export const NETWORK_SHOWTIME_ID = 67;

export type Network = {
  id: NetworkId;
  slug: string;
  title: string;
};
export type NetworksList = Network[];

/**
 * /!| do not change the order /!\
 */
export const networksList: NetworksList = [
  { id: NETWORK_NETFLIX_ID, title: 'Netflix', slug: 'netflix' },
  { id: NETWORK_DISNEY_PLUS_ID, title: 'Disney+', slug: 'disney-plus' },
  { id: NETWORK_APPLE_TV_PLUS_ID, title: 'Apple TV+', slug: 'apple-tv-plus' },
  { id: NETWORK_PRIME_VIDEO, title: 'Prime Video', slug: 'prime-video' },
  { id: NETWORK_PARAMOUNT_PLUS, title: 'Paramount+', slug: 'paramount-plus' },
  { id: NETWORK_HBO_ID, title: 'HBO', slug: 'hbo' },
  { id: NETWORK_HULU_ID, title: 'Hulu', slug: 'hulu' },
  { id: NETWORK_SHOWTIME_ID, title: 'Showtime', slug: 'showtime' },
  { id: NETWORK_FOX_ID, title: 'FOX', slug: 'fox' }
];
