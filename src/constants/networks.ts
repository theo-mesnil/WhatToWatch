import type { NetworkId } from '~/types/content'

// import { REGION_CODE } from './locales';

export const NETWORK_APPLE_TV_PLUS_ID = 2552
export const NETWORK_DISNEY_PLUS_ID = 2739
export const NETWORK_FOX_ID = 19
export const NETWORK_HBO_ID = 49
export const NETWORK_HULU_ID = 453
export const NETWORK_NETFLIX_ID = 213
// export const NETWORK_PARAMOUNT_PLUS = REGION_CODE === 'FR' ? 6445 : 4330;
export const NETWORK_PARAMOUNT_PLUS = 4330
export const NETWORK_PRIME_VIDEO = 1024
export const NETWORK_SHOWTIME_ID = 67

export type Network = {
  id: NetworkId
  slug: string
  title: string
}
export type NetworksList = Network[]

/**
 * /!| do not change the order /!\
 */
export const networksList: NetworksList = [
  { id: NETWORK_NETFLIX_ID, slug: 'netflix', title: 'Netflix' },
  { id: NETWORK_DISNEY_PLUS_ID, slug: 'disney-plus', title: 'Disney+' },
  { id: NETWORK_APPLE_TV_PLUS_ID, slug: 'apple-tv-plus', title: 'Apple TV+' },
  { id: NETWORK_PRIME_VIDEO, slug: 'prime-video', title: 'Prime Video' },
  { id: NETWORK_PARAMOUNT_PLUS, slug: 'paramount-plus', title: 'Paramount+' },
  { id: NETWORK_HBO_ID, slug: 'hbo', title: 'HBO' },
  { id: NETWORK_HULU_ID, slug: 'hulu', title: 'Hulu' },
  { id: NETWORK_SHOWTIME_ID, slug: 'showtime', title: 'Showtime' },
  { id: NETWORK_FOX_ID, slug: 'fox', title: 'FOX' },
]
