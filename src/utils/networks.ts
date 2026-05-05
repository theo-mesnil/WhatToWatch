import {
  NETWORK_APPLE_TV_PLUS_ID,
  NETWORK_DISNEY_PLUS_ID,
  NETWORK_FOX_ID,
  NETWORK_HBO_ID,
  NETWORK_HULU_ID,
  NETWORK_NETFLIX_ID,
  NETWORK_PARAMOUNT_PLUS,
  NETWORK_PRIME_VIDEO,
  NETWORK_SHOWTIME_ID,
} from '~/constants/networks'
import type { NetworkId } from '~/types/content'

export function getNetworkFromUrl(url: string) {
  let network

  if (url.includes('netflix.com')) {
    network = NETWORK_NETFLIX_ID
  }
  if (url.includes('amazon.com')) {
    network = NETWORK_PRIME_VIDEO
  }
  if (url.includes('hbomax.com') || url.includes('hbo.com')) {
    network = NETWORK_HBO_ID
  }
  if (url.includes('disney.com') || url.includes('disneyplus')) {
    network = NETWORK_DISNEY_PLUS_ID
  }
  if (url.includes('apple.com')) {
    network = NETWORK_APPLE_TV_PLUS_ID
  }
  if (url.includes('hulu.com')) {
    network = NETWORK_HULU_ID
  }
  if (url.includes('fox.com')) {
    network = NETWORK_FOX_ID
  }
  if (url.includes('sho.com')) {
    network = NETWORK_SHOWTIME_ID
  }
  if (url.includes('paramountplus.com')) {
    network = NETWORK_PARAMOUNT_PLUS
  }

  return network
}

export function getNetworkName(id: NetworkId) {
  switch (id) {
    case NETWORK_APPLE_TV_PLUS_ID:
      return 'Apple Tv +'
    case NETWORK_DISNEY_PLUS_ID:
      return 'Disney +'
    case NETWORK_FOX_ID:
      return 'Fox'
    case NETWORK_HBO_ID:
      return 'HBO'
    case NETWORK_HULU_ID:
      return 'Hulu'
    case NETWORK_NETFLIX_ID:
      return 'Netflix'
    case NETWORK_PRIME_VIDEO:
      return 'Prime Video'
    case NETWORK_SHOWTIME_ID:
      return 'Showtime'
    default:
      return null
  }
}

export const getNetworkBackgroundClassName = (networkId: NetworkId) => {
  switch (networkId) {
    case NETWORK_APPLE_TV_PLUS_ID:
      return 'bg-network-apple-tv-plus'
    case NETWORK_DISNEY_PLUS_ID:
      return 'bg-network-disney-plus'
    case NETWORK_FOX_ID:
      return 'bg-network-fox'
    case NETWORK_HBO_ID:
      return 'bg-network-hbo'
    case NETWORK_HULU_ID:
      return 'bg-network-hulu'
    case NETWORK_NETFLIX_ID:
      return 'bg-network-netflix'
    case NETWORK_PARAMOUNT_PLUS:
      return 'bg-network-paramount-plus'
    case NETWORK_PRIME_VIDEO:
      return 'bg-network-amazon-prime-video'
    case NETWORK_SHOWTIME_ID:
      return 'bg-network-showtime'
    default:
      return undefined
  }
}
