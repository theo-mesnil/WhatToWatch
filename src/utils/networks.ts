import {
  NETWORK_APPLE_TV_PLUS_ID,
  NETWORK_DISNEY_PLUS_ID,
  NETWORK_FOX_ID,
  NETWORK_HBO_ID,
  NETWORK_HULU_ID,
  NETWORK_NETFLIX_ID,
  NETWORK_PRIME_VIDEO,
  NETWORK_SHOWTIME_ID
} from 'constants/networks';
import type { NetworkId } from 'types/content';

export function getNetworkName(id: NetworkId) {
  switch (id) {
    case NETWORK_APPLE_TV_PLUS_ID:
      return 'Apple Tv +';
    case NETWORK_DISNEY_PLUS_ID:
      return 'Disney +';
    case NETWORK_FOX_ID:
      return 'Fox';
    case NETWORK_HBO_ID:
      return 'HBO';
    case NETWORK_HULU_ID:
      return 'Hulu';
    case NETWORK_NETFLIX_ID:
      return 'Netflix';
    case NETWORK_PRIME_VIDEO:
      return 'Prime Video';
    case NETWORK_SHOWTIME_ID:
      return 'Showtime';
    default:
      return null;
  }
}

export function getNetworkColor(id?: NetworkId): [string, string] {
  switch (id) {
    case NETWORK_APPLE_TV_PLUS_ID:
      return ['#323232', '#181818'];
    case NETWORK_DISNEY_PLUS_ID:
      return ['#049FAA', '#013945'];
    case NETWORK_FOX_ID:
      return ['#0086BD', '#00435e'];
    case NETWORK_HBO_ID:
      return ['#7B2ABF', '#3d155f'];
    case NETWORK_HULU_ID:
      return ['#1EE783', '#0d7641'];
    case NETWORK_NETFLIX_ID:
      return ['#E50914', '#72050a'];
    case NETWORK_PRIME_VIDEO:
      return ['#1C97FE', '#014d8c'];
    case NETWORK_SHOWTIME_ID:
      return ['#FF1928', '#8c0009'];
    default:
      return ['#323232', '#181818'];
  }
}

export function getNetworkFromUrl(url: string) {
  let network;

  if (url.includes('netflix.com')) {
    network = NETWORK_NETFLIX_ID;
  }
  if (url.includes('amazon.com')) {
    network = NETWORK_PRIME_VIDEO;
  }
  if (url.includes('hbomax.com') || url.includes('hbo.com')) {
    network = NETWORK_HBO_ID;
  }
  if (url.includes('disney.com') || url.includes('disneyplus')) {
    network = NETWORK_DISNEY_PLUS_ID;
  }
  if (url.includes('apple.com')) {
    network = NETWORK_APPLE_TV_PLUS_ID;
  }
  if (url.includes('hulu.com')) {
    network = NETWORK_HULU_ID;
  }
  if (url.includes('fox.com')) {
    network = NETWORK_FOX_ID;
  }
  if (url.includes('sho.com')) {
    network = NETWORK_SHOWTIME_ID;
  }

  return network;
}
